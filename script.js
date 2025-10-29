// Configurações dos tipos de frango
// Valores padrão (segunda a quarta)
const chickenConfigNormal = {
    peito: { pesoPorPorcao: 1.6, total: 9 },
    coxa: { pesoPorPorcao: 1.6, total: 11 },
    asa: { pesoPorPorcao: 1.6, total: 4 },
    file: { pesoPorPorcao: 1.7, total: 24 },
    chick: { pesoPorPorcao: 1.6, total: 3 }
};

// Valores para quinta-feira
const chickenConfigQuinta = {
    peito: { pesoPorPorcao: 1.6, total: 9 },
    coxa: { pesoPorPorcao: 1.6, total: 11 },
    asa: { pesoPorPorcao: 1.6, total: 4 },
    file: { pesoPorPorcao: 1.7, total: 26 },
    chick: { pesoPorPorcao: 1.6, total: 3 }
};

// Valores para dias especiais (sexta, sábado, feriado, véspera de feriado)
const chickenConfigEspecial = {
    peito: { pesoPorPorcao: 1.6, total: 12 },
    coxa: { pesoPorPorcao: 1.6, total: 14 },
    asa: { pesoPorPorcao: 1.6, total: 5 },
    file: { pesoPorPorcao: 1.7, total: 46 },
    chick: { pesoPorPorcao: 1.6, total: 3 }
};

// Valores especiais para domingos
const chickenConfigDomingo = {
    peito: { pesoPorPorcao: 1.6, total: 10 },
    coxa: { pesoPorPorcao: 1.6, total: 12 },
    asa: { pesoPorPorcao: 1.6, total: 4 },
    file: { pesoPorPorcao: 1.7, total: 32 },
    chick: { pesoPorPorcao: 1.6, total: 3 }
};

// Configuração ativa (será atualizada baseado na data)
let chickenConfig = { ...chickenConfigNormal };

// Feriados fixos do Brasil (formato: MM-DD)
const feriadosFixos = [
    '01-01', // Ano Novo
    '04-21', // Tiradentes
    '05-01', // Dia do Trabalho
    '09-07', // Independência do Brasil
    '10-12', // Nossa Senhora Aparecida
    '11-02', // Finados
    '11-15', // Proclamação da República
    '11-20', // Consciência Negra
    '12-25'  // Natal
];

// Feriados móveis (precisa ser atualizado anualmente)
// Formato: YYYY-MM-DD
const feriadosMoveis = [
    '2024-02-13', // Carnaval 2024
    '2024-03-29', // Sexta-feira Santa 2024
    '2024-05-30', // Corpus Christi 2024
    '2025-03-04', // Carnaval 2025
    '2025-04-18', // Sexta-feira Santa 2025
    '2025-06-19', // Corpus Christi 2025
    '2026-02-17', // Carnaval 2026
    '2026-04-03', // Sexta-feira Santa 2026
    '2026-06-04'  // Corpus Christi 2026
];

// Feriados personalizados (salvos no localStorage)
let feriadosPersonalizados = [];

// Histórico de vendas (salvos no localStorage)
let historicoVendas = [];

// Função auxiliar para criar data local (sem problemas de timezone)
function criarDataLocal(dataString) {
    const [ano, mes, dia] = dataString.split('-').map(Number);
    return new Date(ano, mes - 1, dia);
}


// Função para verificar se é feriado
function ehFeriado(data) {
    const dataObj = criarDataLocal(data);
    const mesdia = String(dataObj.getMonth() + 1).padStart(2, '0') + '-' + String(dataObj.getDate()).padStart(2, '0');
    const dataCompleta = data;
    
    // Verificar feriados fixos
    if (feriadosFixos.includes(mesdia)) {
        return true;
    }
    
    // Verificar feriados móveis
    if (feriadosMoveis.includes(dataCompleta)) {
        return true;
    }
    
    // Verificar feriados personalizados
    if (feriadosPersonalizados.some(f => f.data === dataCompleta)) {
        return true;
    }
    
    return false;
}

// Função para verificar se é véspera de feriado
function ehVesperaFeriado(data) {
    const dataObj = criarDataLocal(data);
    const amanha = new Date(dataObj);
    amanha.setDate(amanha.getDate() + 1);
    const ano = amanha.getFullYear();
    const mes = String(amanha.getMonth() + 1).padStart(2, '0');
    const dia = String(amanha.getDate()).padStart(2, '0');
    const amanhaStr = `${ano}-${mes}-${dia}`;
    
    return ehFeriado(amanhaStr);
}

// Função para verificar se é dia especial (sexta, sábado, feriado ou véspera)
function ehDiaEspecial(data) {
    const dataObj = criarDataLocal(data);
    const diaSemana = dataObj.getDay(); // 0 = Domingo, 5 = Sexta, 6 = Sábado
    
    // Sexta (5) ou Sábado (6)
    if (diaSemana === 5 || diaSemana === 6) {
        return true;
    }
    
    // Feriado
    if (ehFeriado(data)) {
        return true;
    }
    
    // Véspera de feriado
    if (ehVesperaFeriado(data)) {
        return true;
    }
    
    return false;
}

// Função para verificar se é domingo
function ehDomingo(data) {
    const dataObj = criarDataLocal(data);
    return dataObj.getDay() === 0; // 0 = Domingo
}

// Função para atualizar configuração baseado na data
function atualizarConfigPorData(data) {
    const dataObj = criarDataLocal(data);
    const diaSemana = dataObj.getDay(); // 0 = Domingo, 4 = Quinta
    
    if (ehDomingo(data)) {
        chickenConfig = { ...chickenConfigDomingo };
        return 'domingo';
    } else if (ehDiaEspecial(data)) {
        chickenConfig = { ...chickenConfigEspecial };
        return 'especial';
    } else if (diaSemana === 4) {
        // Quinta-feira
        chickenConfig = { ...chickenConfigQuinta };
        return 'quinta';
    } else {
        // Segunda a Quarta
        chickenConfig = { ...chickenConfigNormal };
        return 'normal';
    }
}

// Função para atualizar valores da tabela
function atualizarValoresTabela() {
    const tipos = ['peito', 'coxa', 'asa', 'file', 'chick'];
    
    tipos.forEach(tipo => {
        // Atualizar célula "Trabalhar"
        const trabalharCell = document.querySelector(`.trabalhar[data-type="${tipo}"]`);
        if (trabalharCell) {
            trabalharCell.textContent = chickenConfig[tipo].total;
        }
        
        // Atualizar célula "Total"
        const totalCell = document.querySelector(`.total[data-type="${tipo}"]`);
        if (totalCell) {
            totalCell.textContent = chickenConfig[tipo].total;
        }
        
        // Atualizar max do input
        const input = document.querySelector(`.final-input[data-type="${tipo}"]`);
        if (input) {
            input.setAttribute('max', chickenConfig[tipo].total);
            
            // Se o valor atual for maior que o novo máximo, ajustar
            if (parseFloat(input.value) > chickenConfig[tipo].total) {
                input.value = 0;
            }
        }
        
        // Recalcular porções e peso
        calcularPorcoesETipo(tipo);
    });
}

// Função para exibir tipo do dia
function atualizarTipoDia(data) {
    const tipoDia = atualizarConfigPorData(data);
    const dataObj = criarDataLocal(data);
    const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const diaSemana = diasSemana[dataObj.getDay()];
    
    let mensagem = `${diaSemana}`;
    let classe = '';
    
    if (tipoDia === 'domingo') {
        mensagem += ' (Quantidade especial para domingo)';
        classe = 'dia-domingo';
    } else if (tipoDia === 'especial') {
        if (dataObj.getDay() === 5) {
            mensagem += ' - Sexta-feira';
            classe = 'dia-especial';
        } else if (dataObj.getDay() === 6) {
            mensagem += ' - Sábado';
            classe = 'dia-especial';
        } else if (ehFeriado(data)) {
            mensagem += ' - Feriado';
            classe = 'dia-feriado';
        } else if (ehVesperaFeriado(data)) {
            mensagem += ' - Véspera de Feriado';
            classe = 'dia-vespera';
        }
        mensagem += ' (Quantidade especial)';
    } else if (tipoDia === 'quinta') {
        mensagem += ' (Filé: 26 porções)';
        classe = 'dia-quinta';
    } else {
        mensagem += ' (Quantidade normal)';
        classe = 'dia-normal';
    }
    
    // Atualizar ou criar elemento de informação
    let infoElement = document.getElementById('tipoDiaInfo');
    if (!infoElement) {
        infoElement = document.createElement('div');
        infoElement.id = 'tipoDiaInfo';
        document.querySelector('.date-section').appendChild(infoElement);
    }
    
    infoElement.textContent = mensagem;
    infoElement.className = `tipo-dia ${classe}`;
}

// Função para calcular porções e peso
function calcularPorcoesETipo(tipo) {
    const input = document.querySelector(`input[data-type="${tipo}"]`);
    const porcoesCell = document.querySelector(`.porcoes[data-type="${tipo}"]`);
    const pesoCell = document.querySelector(`.peso[data-type="${tipo}"]`);
    
    const final = parseFloat(input.value) || 0;
    const total = chickenConfig[tipo].total;
    const pesoPorPorcao = chickenConfig[tipo].pesoPorPorcao;
    
    // Calcular porções: Total - Final
    const porcoes = Math.max(0, total - final);
    
    // Calcular peso: Porções × Peso por porção
    const peso = porcoes * pesoPorPorcao;
    
    // Atualizar células
    porcoesCell.textContent = porcoes;
    pesoCell.textContent = peso.toFixed(1);
    
    // Atualizar totais
    atualizarTotais();
}

// Função para atualizar totais
function atualizarTotais() {
    const porcoesCells = document.querySelectorAll('.porcoes');
    const pesoCells = document.querySelectorAll('.peso');
    const finalInputs = document.querySelectorAll('.final-input');
    
    let totalPorcoes = 0;
    let totalPeso = 0;
    let totalFinal = 0;
    
    porcoesCells.forEach(cell => {
        totalPorcoes += parseFloat(cell.textContent) || 0;
    });
    
    pesoCells.forEach(cell => {
        totalPeso += parseFloat(cell.textContent) || 0;
    });
    
    finalInputs.forEach(input => {
        totalFinal += parseFloat(input.value) || 0;
    });
    
    // Atualizar elementos de total
    document.getElementById('totalPorcoes').textContent = totalPorcoes;
    document.getElementById('totalPeso').textContent = totalPeso.toFixed(1);
    document.getElementById('totalFinal').textContent = totalFinal;
}

// Função para validar entrada
function validarEntrada(input) {
    const tipo = input.dataset.type;
    const valor = parseFloat(input.value);
    const maximo = chickenConfig[tipo].total;
    
    if (valor < 0) {
        input.value = 0;
    } else if (valor > maximo) {
        input.value = maximo;
        alert(`O valor máximo para ${tipo} é ${maximo}`);
    }
}

// Função para limpar todos os campos
function limparTudo() {
    const inputs = document.querySelectorAll('.final-input');
    inputs.forEach(input => {
        input.value = 0;
        calcularPorcoesETipo(input.dataset.type);
    });
}

// Função para imprimir
function imprimir() {
    window.print();
}

// Função para definir data atual
function definirDataAtual() {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    const dataFormatada = `${ano}-${mes}-${dia}`;
    document.getElementById('date').value = dataFormatada;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Definir data atual
    definirDataAtual();
    
    // Atualizar valores baseado na data atual
    const dataInput = document.getElementById('date');
    atualizarTipoDia(dataInput.value);
    atualizarValoresTabela();
    
    // Adicionar event listener para mudança de data
    dataInput.addEventListener('change', function() {
        atualizarTipoDia(this.value);
        atualizarValoresTabela();
        salvarDados();
    });
    
    // Adicionar event listeners para inputs
    const inputs = document.querySelectorAll('.final-input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validarEntrada(this);
            calcularPorcoesETipo(this.dataset.type);
        });
        
        input.addEventListener('blur', function() {
            validarEntrada(this);
            calcularPorcoesETipo(this.dataset.type);
        });
    });
    
    // Event listeners para botões
    document.getElementById('resetBtn').addEventListener('click', limparTudo);
    document.getElementById('printBtn').addEventListener('click', imprimir);
    
    // Calcular valores iniciais
    inputs.forEach(input => {
        calcularPorcoesETipo(input.dataset.type);
    });
});

// Função para salvar dados no localStorage
function salvarDados() {
    const dados = {
        data: document.getElementById('date').value,
        valores: {}
    };
    
    const inputs = document.querySelectorAll('.final-input');
    inputs.forEach(input => {
        dados.valores[input.dataset.type] = input.value;
    });
    
    localStorage.setItem('chickenCalculator', JSON.stringify(dados));
}

// Função para carregar dados do localStorage
function carregarDados() {
    const dadosSalvos = localStorage.getItem('chickenCalculator');
    if (dadosSalvos) {
        const dados = JSON.parse(dadosSalvos);
        
        if (dados.data) {
            document.getElementById('date').value = dados.data;
        }
        
        if (dados.valores) {
            Object.keys(dados.valores).forEach(tipo => {
                const input = document.querySelector(`input[data-type="${tipo}"]`);
                if (input) {
                    input.value = dados.valores[tipo];
                    calcularPorcoesETipo(tipo);
                }
            });
        }
    }
}

// Salvar dados automaticamente quando houver mudanças
document.addEventListener('DOMContentLoaded', function() {
    carregarDados();
    carregarFeriadosPersonalizados();
    carregarHistorico();
    
    // Salvar quando houver mudanças
    const inputs = document.querySelectorAll('.final-input');
    inputs.forEach(input => {
        input.addEventListener('change', salvarDados);
    });
    
    document.getElementById('date').addEventListener('change', salvarDados);
});

// Funções para gerenciar feriados personalizados
function carregarFeriadosPersonalizados() {
    const salvos = localStorage.getItem('feriadosPersonalizados');
    if (salvos) {
        feriadosPersonalizados = JSON.parse(salvos);
    }
    atualizarListaFeriados();
}

function salvarFeriadosPersonalizados() {
    localStorage.setItem('feriadosPersonalizados', JSON.stringify(feriadosPersonalizados));
}

function adicionarFeriado() {
    const dataInput = document.getElementById('novoFeriado');
    const nomeInput = document.getElementById('nomeFeriado');
    
    const data = dataInput.value;
    const nome = nomeInput.value.trim();
    
    if (!data) {
        alert('Por favor, selecione uma data para o feriado.');
        return;
    }
    
    if (!nome) {
        alert('Por favor, digite o nome do feriado.');
        return;
    }
    
    // Verificar se já existe
    if (feriadosPersonalizados.some(f => f.data === data)) {
        alert('Este feriado já está cadastrado.');
        return;
    }
    
    // Adicionar feriado
    feriadosPersonalizados.push({ data, nome });
    salvarFeriadosPersonalizados();
    atualizarListaFeriados();
    
    // Limpar campos
    dataInput.value = '';
    nomeInput.value = '';
    
    // Atualizar tabela se a data atual for afetada
    const dataAtual = document.getElementById('date').value;
    atualizarTipoDia(dataAtual);
    atualizarValoresTabela();
}

function removerFeriado(data) {
    if (confirm('Deseja realmente remover este feriado?')) {
        feriadosPersonalizados = feriadosPersonalizados.filter(f => f.data !== data);
        salvarFeriadosPersonalizados();
        atualizarListaFeriados();
        
        // Atualizar tabela se a data atual for afetada
        const dataAtual = document.getElementById('date').value;
        atualizarTipoDia(dataAtual);
        atualizarValoresTabela();
    }
}

function atualizarListaFeriados() {
    const lista = document.getElementById('listaFeriadosPersonalizados');
    
    if (feriadosPersonalizados.length === 0) {
        lista.innerHTML = '<li style="background: #f8f9fa; color: #6c757d;">Nenhum feriado personalizado cadastrado</li>';
        return;
    }
    
    // Ordenar por data
    const ordenados = [...feriadosPersonalizados].sort((a, b) => criarDataLocal(a.data) - criarDataLocal(b.data));
    
    lista.innerHTML = ordenados.map(feriado => {
        const dataObj = criarDataLocal(feriado.data);
        const dataFormatada = dataObj.toLocaleDateString('pt-BR');
        return `
            <li>
                <span><strong>${dataFormatada}</strong> - ${feriado.nome}</span>
                <button class="btn btn-danger" onclick="removerFeriado('${feriado.data}')">🗑️ Remover</button>
            </li>
        `;
    }).join('');
}

// Gerenciar modal
function abrirModal() {
    document.getElementById('feriadosModal').style.display = 'block';
}

function fecharModal() {
    document.getElementById('feriadosModal').style.display = 'none';
}

// Event listeners para modal
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('feriadosModal');
    const btnConfig = document.getElementById('configBtn');
    const btnClose = document.querySelector('.close');
    const btnAdd = document.getElementById('addFeriadoBtn');
    
    btnConfig.addEventListener('click', abrirModal);
    btnClose.addEventListener('click', fecharModal);
    btnAdd.addEventListener('click', adicionarFeriado);
    
    // Fechar ao clicar fora do modal
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            fecharModal();
        }
    });
    
    // Adicionar feriado com Enter
    document.getElementById('nomeFeriado').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            adicionarFeriado();
        }
    });
});

// ==================== SISTEMA DE HISTÓRICO ====================

// Carregar histórico do localStorage
function carregarHistorico() {
    const salvos = localStorage.getItem('historicoVendas');
    if (salvos) {
        historicoVendas = JSON.parse(salvos);
        console.log('📊 Histórico carregado:', historicoVendas.length, 'registros');
    } else {
        console.log('📊 Nenhum histórico encontrado no localStorage');
    }
}

// Função para criar dados de teste (debug)
function criarDadosTeste() {
    const hoje = new Date();
    
    // Criar registros para os últimos 5 dias
    for (let i = 1; i <= 5; i++) {
        const data = new Date(hoje);
        data.setDate(hoje.getDate() - i);
        
        const registroTeste = {
            data: data.toISOString().split('T')[0], // YYYY-MM-DD
            diaSemana: data.toLocaleDateString('pt-BR', { weekday: 'long' }),
            tipoDia: data.getDay() === 0 ? 'domingo' : 
                     data.getDay() === 5 || data.getDay() === 6 ? 'especial' : 
                     data.getDay() === 4 ? 'quinta' : 'normal',
            dados: {
                peito: { 
                    trabalhar: data.getDay() === 0 ? 10 : data.getDay() === 5 || data.getDay() === 6 ? 12 : 9, 
                    final: Math.floor(Math.random() * 3), 
                    fazerPorcoes: 0, 
                    tirarKg: 0 
                },
                coxa: { 
                    trabalhar: data.getDay() === 0 ? 12 : data.getDay() === 5 || data.getDay() === 6 ? 14 : 11, 
                    final: Math.floor(Math.random() * 2), 
                    fazerPorcoes: 0, 
                    tirarKg: 0 
                },
                asa: { 
                    trabalhar: data.getDay() === 0 ? 4 : data.getDay() === 5 || data.getDay() === 6 ? 5 : 4, 
                    final: Math.floor(Math.random() * 2), 
                    fazerPorcoes: 0, 
                    tirarKg: 0 
                },
                file: { 
                    trabalhar: data.getDay() === 0 ? 32 : 
                              data.getDay() === 5 || data.getDay() === 6 ? 46 : 
                              data.getDay() === 4 ? 26 : 24, 
                    final: Math.floor(Math.random() * 4), 
                    fazerPorcoes: 0, 
                    tirarKg: 0 
                },
                chick: { 
                    trabalhar: 3, 
                    final: Math.floor(Math.random() * 2), 
                    fazerPorcoes: 0, 
                    tirarKg: 0 
                }
            },
            totais: {
                trabalhar: 0,
                final: 0,
                fazerPorcoes: 0,
                tirarKg: 0
            }
        };
        
        // Calcular valores calculados
        Object.keys(registroTeste.dados).forEach(tipo => {
            const dados = registroTeste.dados[tipo];
            dados.fazerPorcoes = dados.trabalhar - dados.final;
            dados.tirarKg = dados.fazerPorcoes * (tipo === 'file' ? 1.7 : 1.6);
        });
        
        // Calcular totais
        registroTeste.totais.trabalhar = Object.values(registroTeste.dados).reduce((sum, item) => sum + item.trabalhar, 0);
        registroTeste.totais.final = Object.values(registroTeste.dados).reduce((sum, item) => sum + item.final, 0);
        registroTeste.totais.fazerPorcoes = Object.values(registroTeste.dados).reduce((sum, item) => sum + item.fazerPorcoes, 0);
        registroTeste.totais.tirarKg = Object.values(registroTeste.dados).reduce((sum, item) => sum + item.tirarKg, 0);
        
        historicoVendas.push(registroTeste);
    }
    
    salvarHistorico();
    console.log('🧪 Dados de teste criados:', historicoVendas.length, 'registros');
}

// Salvar histórico no localStorage
function salvarHistorico() {
    localStorage.setItem('historicoVendas', JSON.stringify(historicoVendas));
}

// Salvar dados do dia atual no histórico
function salvarDiaNoHistorico() {
    const data = document.getElementById('date').value;
    
    if (!data) {
        alert('Selecione uma data primeiro!');
        return;
    }
    
    // Coletar dados atuais
    const registro = {
        data: data,
        diaSemana: criarDataLocal(data).toLocaleDateString('pt-BR', { weekday: 'long' }),
        tipoDia: atualizarConfigPorData(data),
        dados: {}
    };
    
    const tipos = ['peito', 'coxa', 'asa', 'file', 'chick'];
    tipos.forEach(tipo => {
        const input = document.querySelector(`.final-input[data-type="${tipo}"]`);
        const porcoesCell = document.querySelector(`.porcoes[data-type="${tipo}"]`);
        const pesoCell = document.querySelector(`.peso[data-type="${tipo}"]`);
        const trabalharCell = document.querySelector(`.trabalhar[data-type="${tipo}"]`);
        
        registro.dados[tipo] = {
            trabalhar: parseInt(trabalharCell.textContent),
            final: parseInt(input.value) || 0,
            fazerPorcoes: parseInt(porcoesCell.textContent),
            tirarKg: parseFloat(pesoCell.textContent)
        };
    });
    
    // Calcular totais
    registro.totais = {
        trabalhar: Object.values(registro.dados).reduce((sum, item) => sum + item.trabalhar, 0),
        final: Object.values(registro.dados).reduce((sum, item) => sum + item.final, 0),
        fazerPorcoes: Object.values(registro.dados).reduce((sum, item) => sum + item.fazerPorcoes, 0),
        tirarKg: Object.values(registro.dados).reduce((sum, item) => sum + item.tirarKg, 0)
    };
    
    // Verificar se já existe registro para esta data
    const indiceExistente = historicoVendas.findIndex(r => r.data === data);
    
    if (indiceExistente >= 0) {
        // Atualizar registro existente
        if (confirm(`Já existe um registro para ${criarDataLocal(data).toLocaleDateString('pt-BR')}. Deseja substituir?`)) {
            historicoVendas[indiceExistente] = registro;
            alert('Registro atualizado com sucesso!');
        } else {
            return;
        }
    } else {
        // Adicionar novo registro
        historicoVendas.push(registro);
        alert('Dados salvos no histórico com sucesso!');
    }
    
    // Salvar no localStorage
    salvarHistorico();
    
    // Enviar email com os dados salvos (se configurado)
    (async () => {
        try {
            const enviado = await enviarEmailHistorico(registro);
            if (enviado) {
                console.log('📧 Email de relatório enviado com sucesso.');
            }
        } catch (e) {
            console.warn('⚠️ Falha ao enviar email de relatório.', e);
        }
    })();
    
    console.log('✅ Dados salvos no histórico local!');
    
    // Atualizar lista se o modal estiver aberto
    if (document.getElementById('historicoModal').style.display === 'block') {
        // Não há lista para atualizar no modal de histórico
        // A consulta é feita através do botão "Consultar"
    }
}

// Consultar histórico por período
function consultarHistorico() {
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFim = document.getElementById('dataFim').value;
    
    if (!dataInicio || !dataFim) {
        alert('Selecione as datas de início e fim!');
        return;
    }
    
    const inicio = criarDataLocal(dataInicio);
    const fim = criarDataLocal(dataFim);
    
    if (inicio > fim) {
        alert('A data de início deve ser anterior à data de fim!');
        return;
    }
    
    // Filtrar registros no período
    const registrosPeriodo = historicoVendas.filter(r => {
        const dataReg = criarDataLocal(r.data);
        return dataReg >= inicio && dataReg <= fim;
    });
    
    // Ordenar por data
    registrosPeriodo.sort((a, b) => criarDataLocal(a.data) - criarDataLocal(b.data));
    
    // Exibir resultados
    exibirResultadosHistorico(registrosPeriodo, dataInicio, dataFim);
}

// Exibir resultados do histórico
function exibirResultadosHistorico(registros, dataInicio, dataFim) {
    const container = document.getElementById('resultadosHistorico');
    
    if (registros.length === 0) {
        container.innerHTML = '<p class="sem-dados">Nenhum registro encontrado para este período.</p>';
        return;
    }
    
    // Criar tabela de resultados
    let html = `
        <div class="periodo-info">
            <h3>Período: ${criarDataLocal(dataInicio).toLocaleDateString('pt-BR')} a ${criarDataLocal(dataFim).toLocaleDateString('pt-BR')}</h3>
            <p>${registros.length} dia(s) encontrado(s)</p>
        </div>
        <div class="tabela-historico-container">
            <table class="tabela-historico">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Dia da Semana</th>
                        <th>Tipo</th>
                        <th>Fazer Porções</th>
                        <th>Tirar - KG</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    registros.forEach(reg => {
        const dataFormatada = criarDataLocal(reg.data).toLocaleDateString('pt-BR');
        const classTipo = reg.tipoDia === 'domingo' ? 'tipo-domingo' : 
                          reg.tipoDia === 'especial' ? 'tipo-especial' : 'tipo-normal';
        
        html += `
            <tr>
                <td><strong>${dataFormatada}</strong></td>
                <td>${reg.diaSemana}</td>
                <td class="${classTipo}">${reg.tipoDia}</td>
                <td class="destaque-porcoes">${reg.totais.fazerPorcoes}</td>
                <td class="destaque-kg">${reg.totais.tirarKg.toFixed(1)} kg</td>
                <td>
                    <button class="btn-mini btn-info" onclick="verDetalhes('${reg.data}')">Ver Detalhes</button>
                    <button class="btn-mini btn-danger" onclick="excluirRegistro('${reg.data}')">Excluir</button>
                </td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
                <tfoot>
                    <tr class="totais-periodo">
                        <td colspan="3"><strong>TOTAIS DO PERÍODO</strong></td>
                        <td><strong>${registros.reduce((sum, r) => sum + r.totais.fazerPorcoes, 0)}</strong></td>
                        <td><strong>${registros.reduce((sum, r) => sum + r.totais.tirarKg, 0).toFixed(1)} kg</strong></td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>
        <div class="acoes-historico">
            <button class="btn btn-success" onclick="exportarCSV('${dataInicio}', '${dataFim}')">📥 Exportar CSV</button>
            <button class="btn btn-primary" onclick="verEstatisticas('${dataInicio}', '${dataFim}')">📊 Ver Estatísticas</button>
        </div>
    `;
    
    container.innerHTML = html;
}

// Ver detalhes de um registro
function verDetalhes(data) {
    const registro = historicoVendas.find(r => r.data === data);
    
    if (!registro) {
        alert('Registro não encontrado!');
        return;
    }
    
    const dataFormatada = criarDataLocal(data).toLocaleDateString('pt-BR');
    
    let html = `
        <div class="detalhes-registro">
            <h3>Detalhes de ${dataFormatada}</h3>
            <p><strong>Dia:</strong> ${registro.diaSemana} (${registro.tipoDia})</p>
            <table class="tabela-detalhes">
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Trabalhar</th>
                        <th>Final (Sobrou)</th>
                        <th>Fazer Porções</th>
                        <th>Tirar - KG</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    const tipos = {
        'peito': 'Peito',
        'coxa': 'Coxa',
        'asa': 'Asa',
        'file': 'Filé',
        'chick': 'Chick'
    };
    
    Object.entries(tipos).forEach(([key, nome]) => {
        const dados = registro.dados[key];
        html += `
            <tr>
                <td>${nome}</td>
                <td>${dados.trabalhar}</td>
                <td>${dados.final}</td>
                <td>${dados.fazerPorcoes}</td>
                <td>${dados.tirarKg.toFixed(1)}</td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
                <tfoot>
                    <tr class="totais-detalhes">
                        <td><strong>Total</strong></td>
                        <td><strong>${registro.totais.trabalhar}</strong></td>
                        <td><strong>${registro.totais.final}</strong></td>
                        <td><strong>${registro.totais.fazerPorcoes}</strong></td>
                        <td><strong>${registro.totais.tirarKg.toFixed(1)}</strong></td>
                    </tr>
                </tfoot>
            </table>
            <button class="btn btn-secondary" onclick="fecharDetalhes()">Fechar</button>
        </div>
    `;
    
    // Criar modal de detalhes
    const modal = document.createElement('div');
    modal.id = 'modalDetalhes';
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content">
            ${html}
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Fechar modal de detalhes
function fecharDetalhes() {
    const modal = document.getElementById('modalDetalhes');
    if (modal) {
        modal.remove();
    }
}

// Excluir registro
function excluirRegistro(data) {
    const dataFormatada = criarDataLocal(data).toLocaleDateString('pt-BR');
    
    if (confirm(`Deseja realmente excluir o registro de ${dataFormatada}?`)) {
        historicoVendas = historicoVendas.filter(r => r.data !== data);
        salvarHistorico();
        alert('Registro excluído com sucesso!');
        
        // Recarregar consulta se estiver no modal
        const dataInicio = document.getElementById('dataInicio').value;
        const dataFim = document.getElementById('dataFim').value;
        if (dataInicio && dataFim) {
            consultarHistorico();
        }
    }
}

// Exportar para CSV
function exportarCSV(dataInicio, dataFim) {
    const inicio = criarDataLocal(dataInicio);
    const fim = criarDataLocal(dataFim);
    
    const registrosPeriodo = historicoVendas.filter(r => {
        const dataReg = criarDataLocal(r.data);
        return dataReg >= inicio && dataReg <= fim;
    }).sort((a, b) => criarDataLocal(a.data) - criarDataLocal(b.data));
    
    if (registrosPeriodo.length === 0) {
        alert('Nenhum dado para exportar!');
        return;
    }
    
    // Criar CSV
    let csv = 'Data,Dia da Semana,Tipo,Peito Trabalhar,Peito Final,Peito Fazer,Peito KG,Coxa Trabalhar,Coxa Final,Coxa Fazer,Coxa KG,Asa Trabalhar,Asa Final,Asa Fazer,Asa KG,File Trabalhar,File Final,File Fazer,File KG,Chick Trabalhar,Chick Final,Chick Fazer,Chick KG,Total Fazer Porcoes,Total Tirar KG\n';
    
    registrosPeriodo.forEach(reg => {
        const dataFormatada = criarDataLocal(reg.data).toLocaleDateString('pt-BR');
        csv += `${dataFormatada},${reg.diaSemana},${reg.tipoDia},`;
        csv += `${reg.dados.peito.trabalhar},${reg.dados.peito.final},${reg.dados.peito.fazerPorcoes},${reg.dados.peito.tirarKg},`;
        csv += `${reg.dados.coxa.trabalhar},${reg.dados.coxa.final},${reg.dados.coxa.fazerPorcoes},${reg.dados.coxa.tirarKg},`;
        csv += `${reg.dados.asa.trabalhar},${reg.dados.asa.final},${reg.dados.asa.fazerPorcoes},${reg.dados.asa.tirarKg},`;
        csv += `${reg.dados.file.trabalhar},${reg.dados.file.final},${reg.dados.file.fazerPorcoes},${reg.dados.file.tirarKg},`;
        csv += `${reg.dados.chick.trabalhar},${reg.dados.chick.final},${reg.dados.chick.fazerPorcoes},${reg.dados.chick.tirarKg},`;
        csv += `${reg.totais.fazerPorcoes},${reg.totais.tirarKg.toFixed(1)}\n`;
    });
    
    // Download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `historico_frango_${dataInicio}_a_${dataFim}.csv`;
    link.click();
}

// Ver estatísticas
function verEstatisticas(dataInicio, dataFim) {
    const inicio = criarDataLocal(dataInicio);
    const fim = criarDataLocal(dataFim);
    
    const registrosPeriodo = historicoVendas.filter(r => {
        const dataReg = criarDataLocal(r.data);
        return dataReg >= inicio && dataReg <= fim;
    });
    
    if (registrosPeriodo.length === 0) {
        alert('Nenhum dado para exibir estatísticas!');
        return;
    }
    
    // Calcular estatísticas
    const stats = {
        totalDias: registrosPeriodo.length,
        totalPorcoes: registrosPeriodo.reduce((sum, r) => sum + r.totais.fazerPorcoes, 0),
        totalKg: registrosPeriodo.reduce((sum, r) => sum + r.totais.tirarKg, 0),
        mediaPorcoesDia: 0,
        mediaKgDia: 0,
        porTipo: {}
    };
    
    stats.mediaPorcoesDia = (stats.totalPorcoes / stats.totalDias).toFixed(1);
    stats.mediaKgDia = (stats.totalKg / stats.totalDias).toFixed(1);
    
    // Estatísticas por tipo
    const tipos = ['peito', 'coxa', 'asa', 'file', 'chick'];
    tipos.forEach(tipo => {
        stats.porTipo[tipo] = {
            totalPorcoes: registrosPeriodo.reduce((sum, r) => sum + r.dados[tipo].fazerPorcoes, 0),
            totalKg: registrosPeriodo.reduce((sum, r) => sum + r.dados[tipo].tirarKg, 0),
            media: (registrosPeriodo.reduce((sum, r) => sum + r.dados[tipo].fazerPorcoes, 0) / stats.totalDias).toFixed(1)
        };
    });
    
    // Exibir estatísticas
    const html = `
        <div class="estatisticas">
            <h3>📊 Estatísticas do Período</h3>
            <p class="periodo-stats">${criarDataLocal(dataInicio).toLocaleDateString('pt-BR')} a ${criarDataLocal(dataFim).toLocaleDateString('pt-BR')}</p>
            
            <div class="cards-stats">
                <div class="card-stat">
                    <h4>Total de Dias</h4>
                    <p class="valor-stat">${stats.totalDias}</p>
                </div>
                <div class="card-stat">
                    <h4>Total de Porções</h4>
                    <p class="valor-stat">${stats.totalPorcoes}</p>
                </div>
                <div class="card-stat">
                    <h4>Total de KG</h4>
                    <p class="valor-stat">${stats.totalKg.toFixed(1)}</p>
                </div>
                <div class="card-stat">
                    <h4>Média Porções/Dia</h4>
                    <p class="valor-stat">${stats.mediaPorcoesDia}</p>
                </div>
                <div class="card-stat">
                    <h4>Média KG/Dia</h4>
                    <p class="valor-stat">${stats.mediaKgDia}</p>
                </div>
            </div>
            
            <h4>Por Tipo de Frango:</h4>
            <table class="tabela-stats">
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Total Porções</th>
                        <th>Total KG</th>
                        <th>Média/Dia</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Peito</td>
                        <td>${stats.porTipo.peito.totalPorcoes}</td>
                        <td>${stats.porTipo.peito.totalKg.toFixed(1)}</td>
                        <td>${stats.porTipo.peito.media}</td>
                    </tr>
                    <tr>
                        <td>Coxa</td>
                        <td>${stats.porTipo.coxa.totalPorcoes}</td>
                        <td>${stats.porTipo.coxa.totalKg.toFixed(1)}</td>
                        <td>${stats.porTipo.coxa.media}</td>
                    </tr>
                    <tr>
                        <td>Asa</td>
                        <td>${stats.porTipo.asa.totalPorcoes}</td>
                        <td>${stats.porTipo.asa.totalKg.toFixed(1)}</td>
                        <td>${stats.porTipo.asa.media}</td>
                    </tr>
                    <tr>
                        <td>Filé</td>
                        <td>${stats.porTipo.file.totalPorcoes}</td>
                        <td>${stats.porTipo.file.totalKg.toFixed(1)}</td>
                        <td>${stats.porTipo.file.media}</td>
                    </tr>
                    <tr>
                        <td>Chick</td>
                        <td>${stats.porTipo.chick.totalPorcoes}</td>
                        <td>${stats.porTipo.chick.totalKg.toFixed(1)}</td>
                        <td>${stats.porTipo.chick.media}</td>
                    </tr>
                </tbody>
            </table>
            
            <button class="btn btn-secondary" onclick="fecharEstatisticas()">Fechar</button>
        </div>
    `;
    
    // Criar modal de estatísticas
    const modal = document.createElement('div');
    modal.id = 'modalEstatisticas';
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content modal-large">
            ${html}
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Fechar modal de estatísticas
function fecharEstatisticas() {
    const modal = document.getElementById('modalEstatisticas');
    if (modal) {
        modal.remove();
    }
}

// Gerenciar modal de histórico
function abrirHistorico() {
    document.getElementById('historicoModal').style.display = 'block';
    
    // Definir datas padrão (últimos 30 dias)
    const hoje = new Date();
    const trintaDiasAtras = new Date();
    trintaDiasAtras.setDate(hoje.getDate() - 30);
    
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    document.getElementById('dataFim').value = `${ano}-${mes}-${dia}`;
    
    const anoI = trintaDiasAtras.getFullYear();
    const mesI = String(trintaDiasAtras.getMonth() + 1).padStart(2, '0');
    const diaI = String(trintaDiasAtras.getDate()).padStart(2, '0');
    document.getElementById('dataInicio').value = `${anoI}-${mesI}-${diaI}`;
    
    // Se não há dados no histórico, criar dados de teste
    if (historicoVendas.length === 0) {
        criarDadosTeste();
        alert('📊 Dados de teste criados! Agora você pode testar a consulta do histórico.');
    }
}

function fecharHistorico() {
    document.getElementById('historicoModal').style.display = 'none';
}

// Event listeners para histórico
document.addEventListener('DOMContentLoaded', function() {
    const btnHistorico = document.getElementById('historicoBtn');
    const btnSalvarDia = document.getElementById('salvarDiaBtn');
    const btnConsultar = document.getElementById('consultarBtn');
    const btnFecharHistorico = document.getElementById('closeHistorico');
    
    if (btnHistorico) btnHistorico.addEventListener('click', abrirHistorico);
    if (btnSalvarDia) btnSalvarDia.addEventListener('click', salvarDiaNoHistorico);
    if (btnConsultar) btnConsultar.addEventListener('click', consultarHistorico);
    if (btnFecharHistorico) btnFecharHistorico.addEventListener('click', fecharHistorico);
});
