// ==================== GERENCIAMENTO DE INDEXEDDB ====================

const DB_NAME = 'FrangoAppDB';
const DB_VERSION = 1;
let db = null;

// Inicializar banco de dados
function inicializarDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        
        // Criar/Atualizar estrutura do banco
        request.onupgradeneeded = function(event) {
            db = event.target.result;
            
            // Store para histórico de vendas
            if (!db.objectStoreNames.contains('historicoVendas')) {
                const historicoStore = db.createObjectStore('historicoVendas', { 
                    keyPath: 'id', 
                    autoIncrement: true 
                });
                
                // Índices para consultas rápidas
                historicoStore.createIndex('data', 'data', { unique: false });
                historicoStore.createIndex('tipoDia', 'tipoDia', { unique: false });
                historicoStore.createIndex('diaSemana', 'diaSemana', { unique: false });
                historicoStore.createIndex('ano', 'ano', { unique: false });
                historicoStore.createIndex('mes', 'mes', { unique: false });
                
                console.log('✅ Store "historicoVendas" criado com índices');
            }
            
            // Store para configurações
            if (!db.objectStoreNames.contains('configuracoes')) {
                const configStore = db.createObjectStore('configuracoes', { 
                    keyPath: 'chave' 
                });
                console.log('✅ Store "configuracoes" criado');
            }
            
            // Store para feriados personalizados
            if (!db.objectStoreNames.contains('feriados')) {
                const feriadosStore = db.createObjectStore('feriados', { 
                    keyPath: 'data' 
                });
                console.log('✅ Store "feriados" criado');
            }
        };
        
        request.onsuccess = function(event) {
            db = event.target.result;
            console.log('🗄️ IndexedDB inicializado com sucesso!');
            resolve(db);
        };
        
        request.onerror = function(event) {
            console.error('❌ Erro ao abrir IndexedDB:', event.target.error);
            reject(event.target.error);
        };
    });
}

// ==================== HISTÓRICO DE VENDAS ====================

// Salvar registro de venda
async function salvarRegistroVenda(registro) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['historicoVendas'], 'readwrite');
        const store = transaction.objectStore('historicoVendas');
        
        // Adicionar campos para índices
        const dataObj = new Date(registro.data);
        registro.ano = dataObj.getFullYear();
        registro.mes = dataObj.getMonth() + 1; // 1-12
        
        const request = store.add(registro);
        
        request.onsuccess = function() {
            console.log('✅ Registro salvo no IndexedDB:', registro.data);
            resolve(request.result);
        };
        
        request.onerror = function() {
            console.error('❌ Erro ao salvar registro:', request.error);
            reject(request.error);
        };
    });
}

// Buscar todos os registros
async function buscarTodosRegistros() {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['historicoVendas'], 'readonly');
        const store = transaction.objectStore('historicoVendas');
        const request = store.getAll();
        
        request.onsuccess = function() {
            resolve(request.result || []);
        };
        
        request.onerror = function() {
            reject(request.error);
        };
    });
}

// Buscar registros por período
async function buscarRegistrosPorPeriodo(dataInicio, dataFim) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['historicoVendas'], 'readonly');
        const store = transaction.objectStore('historicoVendas');
        const index = store.index('data');
        
        const range = IDBKeyRange.bound(dataInicio, dataFim);
        const request = index.getAll(range);
        
        request.onsuccess = function() {
            resolve(request.result || []);
        };
        
        request.onerror = function() {
            reject(request.error);
        };
    });
}

// Buscar registros por tipo de dia
async function buscarRegistrosPorTipoDia(tipoDia) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['historicoVendas'], 'readonly');
        const store = transaction.objectStore('historicoVendas');
        const index = store.index('tipoDia');
        
        const request = index.getAll(tipoDia);
        
        request.onsuccess = function() {
            resolve(request.result || []);
        };
        
        request.onerror = function() {
            reject(request.error);
        };
    });
}

// Buscar registros por mês/ano
async function buscarRegistrosPorMesAno(mes, ano) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['historicoVendas'], 'readonly');
        const store = transaction.objectStore('historicoVendas');
        
        const request = store.getAll();
        
        request.onsuccess = function() {
            const todos = request.result || [];
            const filtrados = todos.filter(r => r.mes === mes && r.ano === ano);
            resolve(filtrados);
        };
        
        request.onerror = function() {
            reject(request.error);
        };
    });
}

// Excluir registro
async function excluirRegistro(id) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['historicoVendas'], 'readwrite');
        const store = transaction.objectStore('historicoVendas');
        const request = store.delete(id);
        
        request.onsuccess = function() {
            console.log('🗑️ Registro excluído:', id);
            resolve();
        };
        
        request.onerror = function() {
            reject(request.error);
        };
    });
}

// Limpar todo o histórico
async function limparHistorico() {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['historicoVendas'], 'readwrite');
        const store = transaction.objectStore('historicoVendas');
        const request = store.clear();
        
        request.onsuccess = function() {
            console.log('🗑️ Histórico limpo completamente');
            resolve();
        };
        
        request.onerror = function() {
            reject(request.error);
        };
    });
}

// ==================== CONFIGURAÇÕES ====================

// Salvar configuração
async function salvarConfiguracao(chave, valor) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['configuracoes'], 'readwrite');
        const store = transaction.objectStore('configuracoes');
        const request = store.put({ chave: chave, valor: valor });
        
        request.onsuccess = function() {
            resolve();
        };
        
        request.onerror = function() {
            reject(request.error);
        };
    });
}

// Buscar configuração
async function buscarConfiguracao(chave) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['configuracoes'], 'readonly');
        const store = transaction.objectStore('configuracoes');
        const request = store.get(chave);
        
        request.onsuccess = function() {
            resolve(request.result ? request.result.valor : null);
        };
        
        request.onerror = function() {
            reject(request.error);
        };
    });
}

// ==================== FERIADOS ====================

// Salvar feriado personalizado
async function salvarFeriado(data, descricao) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['feriados'], 'readwrite');
        const store = transaction.objectStore('feriados');
        const request = store.put({ data: data, descricao: descricao });
        
        request.onsuccess = function() {
            resolve();
        };
        
        request.onerror = function() {
            reject(request.error);
        };
    });
}

// Buscar todos os feriados
async function buscarTodosFeriados() {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['feriados'], 'readonly');
        const store = transaction.objectStore('feriados');
        const request = store.getAll();
        
        request.onsuccess = function() {
            resolve(request.result || []);
        };
        
        request.onerror = function() {
            reject(request.error);
        };
    });
}

// Excluir feriado
async function excluirFeriado(data) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['feriados'], 'readwrite');
        const store = transaction.objectStore('feriados');
        const request = store.delete(data);
        
        request.onsuccess = function() {
            resolve();
        };
        
        request.onerror = function() {
            reject(request.error);
        };
    });
}

// ==================== MIGRAÇÃO DE DADOS ====================

// Migrar dados do localStorage para IndexedDB
async function migrarLocalStorageParaIndexedDB() {
    console.log('🔄 Iniciando migração de localStorage para IndexedDB...');
    
    try {
        // Migrar histórico de vendas
        const historicoLocal = localStorage.getItem('historicoVendas');
        if (historicoLocal) {
            const registros = JSON.parse(historicoLocal);
            console.log(`📦 Encontrados ${registros.length} registros no localStorage`);
            
            for (const registro of registros) {
                try {
                    await salvarRegistroVenda(registro);
                } catch (error) {
                    console.warn('⚠️ Erro ao migrar registro:', registro.data, error);
                }
            }
            
            console.log('✅ Histórico migrado com sucesso!');
        }
        
        // Migrar configurações de quantidades
        const configQuantidades = localStorage.getItem('configQuantidades');
        if (configQuantidades) {
            await salvarConfiguracao('quantidades', JSON.parse(configQuantidades));
            console.log('✅ Configurações de quantidades migradas!');
        }
        
        // Migrar feriados personalizados
        const feriadosLocal = localStorage.getItem('feriadosPersonalizados');
        if (feriadosLocal) {
            const feriados = JSON.parse(feriadosLocal);
            for (const feriado of feriados) {
                await salvarFeriado(feriado.data, feriado.descricao);
            }
            console.log('✅ Feriados personalizados migrados!');
        }
        
        console.log('🎉 Migração concluída com sucesso!');
        
        // Criar backup do localStorage antes de limpar
        const backup = {
            historicoVendas: historicoLocal,
            configQuantidades: configQuantidades,
            feriadosPersonalizados: feriadosLocal,
            dataMigracao: new Date().toISOString()
        };
        localStorage.setItem('backup_pre_indexeddb', JSON.stringify(backup));
        
        return true;
    } catch (error) {
        console.error('❌ Erro na migração:', error);
        return false;
    }
}

// ==================== EXPORTAÇÃO DE DADOS ====================

// Exportar todo o banco para JSON
async function exportarBancoDeDados() {
    const dados = {
        historicoVendas: await buscarTodosRegistros(),
        configuracoes: {
            quantidades: await buscarConfiguracao('quantidades')
        },
        feriados: await buscarTodosFeriados(),
        dataExportacao: new Date().toISOString()
    };
    
    return dados;
}

// Importar dados de JSON
async function importarBancoDeDados(dados) {
    try {
        // Importar histórico
        if (dados.historicoVendas) {
            for (const registro of dados.historicoVendas) {
                await salvarRegistroVenda(registro);
            }
        }
        
        // Importar configurações
        if (dados.configuracoes && dados.configuracoes.quantidades) {
            await salvarConfiguracao('quantidades', dados.configuracoes.quantidades);
        }
        
        // Importar feriados
        if (dados.feriados) {
            for (const feriado of dados.feriados) {
                await salvarFeriado(feriado.data, feriado.descricao);
            }
        }
        
        console.log('✅ Dados importados com sucesso!');
        return true;
    } catch (error) {
        console.error('❌ Erro ao importar dados:', error);
        return false;
    }
}

