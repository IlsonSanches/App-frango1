// ==================== CONFIGURAÇÃO DE EMAIL ====================
// EmailJS Configuration - https://www.emailjs.com/

// INSTRUÇÕES DE CONFIGURAÇÃO:
// 1. Crie conta em: https://www.emailjs.com/
// 2. Vá em "Email Services" e conecte sua conta Gmail
// 3. Vá em "Email Templates" e crie um template
// 4. Copie os IDs abaixo e cole aqui

const EMAIL_CONFIG = {
    // Carrega de localStorage para evitar chaves hardcoded no código
    SERVICE_ID: localStorage.getItem('EMAILJS_SERVICE_ID') || '',
    TEMPLATE_ID: localStorage.getItem('EMAILJS_TEMPLATE_ID') || '',
    PUBLIC_KEY: localStorage.getItem('EMAILJS_PUBLIC_KEY') || '',
    
    // Destinatários (já configurados)
    DESTINATARIOS: [
        'bilim.sanches@gmail.com',
        'sanches.ilson@gmail.com'
    ]
};

// Utilitário para salvar chaves com segurança no navegador (localStorage)
function configurarEmailJS({ serviceId, templateId, publicKey }) {
    if (typeof serviceId === 'string') localStorage.setItem('EMAILJS_SERVICE_ID', serviceId.trim());
    if (typeof templateId === 'string') localStorage.setItem('EMAILJS_TEMPLATE_ID', templateId.trim());
    if (typeof publicKey === 'string') localStorage.setItem('EMAILJS_PUBLIC_KEY', publicKey.trim());
    
    EMAIL_CONFIG.SERVICE_ID = localStorage.getItem('EMAILJS_SERVICE_ID') || '';
    EMAIL_CONFIG.TEMPLATE_ID = localStorage.getItem('EMAILJS_TEMPLATE_ID') || '';
    EMAIL_CONFIG.PUBLIC_KEY = localStorage.getItem('EMAILJS_PUBLIC_KEY') || '';
    
    if (typeof emailjs !== 'undefined' && EMAIL_CONFIG.PUBLIC_KEY) {
        emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);
        console.log('✅ EmailJS reconfigurado com sucesso!');
    }
}

// Inicializar EmailJS quando a página carregar
(function() {
    if (typeof emailjs !== 'undefined' && EMAIL_CONFIG.PUBLIC_KEY) {
        emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);
        console.log('✅ EmailJS inicializado com sucesso!');
    } else {
        console.log('ℹ️ EmailJS aguardando configuração de chave pública.');
    }
})();

// Função para enviar email com os dados do histórico
async function enviarEmailHistorico(dadosDia) {
    // Verificar se EmailJS está carregado
    if (typeof emailjs === 'undefined') {
        console.error('❌ EmailJS não carregado! Verifique sua conexão.');
        alert('⚠️ Serviço de email não disponível. Verifique sua internet.');
        return false;
    }
    
    // Verificar se EmailJS está configurado
    if (!EMAIL_CONFIG.SERVICE_ID || !EMAIL_CONFIG.TEMPLATE_ID || !EMAIL_CONFIG.PUBLIC_KEY) {
        console.error('❌ EmailJS não configurado! Defina SERVICE_ID, TEMPLATE_ID e PUBLIC_KEY.');
        alert('⚠️ Email não configurado. Defina SERVICE_ID, TEMPLATE_ID e PUBLIC_KEY nas configurações.');
        return false;
    }

    try {
        // Formatar dados para o email
        const emailData = {
            to_email: EMAIL_CONFIG.DESTINATARIOS.join(', '),
            data: criarDataLocal(dadosDia.data).toLocaleDateString('pt-BR'),
            dia_semana: dadosDia.diaSemana,
            tipo_dia: dadosDia.tipoDia,
            
            // Dados individuais
            peito_trabalhar: dadosDia.dados.peito.trabalhar,
            peito_final: dadosDia.dados.peito.final,
            peito_fazer: dadosDia.dados.peito.fazerPorcoes,
            peito_kg: dadosDia.dados.peito.tirarKg.toFixed(1),
            
            coxa_trabalhar: dadosDia.dados.coxa.trabalhar,
            coxa_final: dadosDia.dados.coxa.final,
            coxa_fazer: dadosDia.dados.coxa.fazerPorcoes,
            coxa_kg: dadosDia.dados.coxa.tirarKg.toFixed(1),
            
            asa_trabalhar: dadosDia.dados.asa.trabalhar,
            asa_final: dadosDia.dados.asa.final,
            asa_fazer: dadosDia.dados.asa.fazerPorcoes,
            asa_kg: dadosDia.dados.asa.tirarKg.toFixed(1),
            
            file_trabalhar: dadosDia.dados.file.trabalhar,
            file_final: dadosDia.dados.file.final,
            file_fazer: dadosDia.dados.file.fazerPorcoes,
            file_kg: dadosDia.dados.file.tirarKg.toFixed(1),
            
            chick_trabalhar: dadosDia.dados.chick.trabalhar,
            chick_final: dadosDia.dados.chick.final,
            chick_fazer: dadosDia.dados.chick.fazerPorcoes,
            chick_kg: dadosDia.dados.chick.tirarKg.toFixed(1),
            
            // Totais
            total_trabalhar: dadosDia.totais.trabalhar,
            total_final: dadosDia.totais.final,
            total_fazer: dadosDia.totais.fazerPorcoes,
            total_kg: dadosDia.totais.tirarKg.toFixed(1),
            
            // Mensagem personalizada
            subject: `📊 Relatório Diário de Frango - ${criarDataLocal(dadosDia.data).toLocaleDateString('pt-BR')}`,
            message: `Dados salvos automaticamente pelo sistema em ${new Date().toLocaleString('pt-BR')}`
        };

        // Enviar email usando EmailJS
        const response = await emailjs.send(
            EMAIL_CONFIG.SERVICE_ID,
            EMAIL_CONFIG.TEMPLATE_ID,
            emailData,
            EMAIL_CONFIG.PUBLIC_KEY
        );

        console.log('✅ Email enviado com sucesso!', response);
        return true;

    } catch (error) {
        console.error('❌ Erro ao enviar email:', error);
        
        // Mostrar erro amigável para o usuário
        if (error.text) {
            alert(`⚠️ Erro ao enviar email: ${error.text}`);
        } else {
            alert('⚠️ Erro ao enviar email. Verifique sua conexão com a internet.');
        }
        
        return false;
    }
}

// Função auxiliar para criar HTML da tabela (para emails mais bonitos)
function criarHTMLTabelaEmail(dadosDia) {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #667eea;">📊 Relatório Diário de Frango</h2>
            
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <p><strong>Data:</strong> ${criarDataLocal(dadosDia.data).toLocaleDateString('pt-BR')}</p>
                <p><strong>Dia:</strong> ${dadosDia.diaSemana}</p>
                <p><strong>Tipo:</strong> ${dadosDia.tipoDia}</p>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <thead style="background: #667eea; color: white;">
                    <tr>
                        <th style="padding: 10px; border: 1px solid #ddd;">Tipo</th>
                        <th style="padding: 10px; border: 1px solid #ddd;">Trabalhar</th>
                        <th style="padding: 10px; border: 1px solid #ddd;">Final</th>
                        <th style="padding: 10px; border: 1px solid #ddd;">Fazer</th>
                        <th style="padding: 10px; border: 1px solid #ddd;">KG</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Peito</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${dadosDia.dados.peito.trabalhar}</td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${dadosDia.dados.peito.final}</td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${dadosDia.dados.peito.fazerPorcoes}</td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${dadosDia.dados.peito.tirarKg.toFixed(1)}</td>
                    </tr>
                    <tr style="background: #f8f9fa;">
                        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Coxa</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${dadosDia.dados.coxa.trabalhar}</td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${dadosDia.dados.coxa.final}</td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${dadosDia.dados.coxa.fazerPorcoes}</td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${dadosDia.dados.coxa.tirarKg.toFixed(1)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Asa</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${dadosDia.dados.asa.trabalhar}</td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${dadosDia.dados.asa.final}</td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${dadosDia.dados.asa.fazerPorcoes}</td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${dadosDia.dados.asa.tirarKg.toFixed(1)}</td>
                    </tr>
                    <tr style="background: #f8f9fa;">
                        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Filé</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${dadosDia.dados.file.trabalhar}</td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${dadosDia.dados.file.final}</td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${dadosDia.dados.file.fazerPorcoes}</td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${dadosDia.dados.file.tirarKg.toFixed(1)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Chick</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${dadosDia.dados.chick.trabalhar}</td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${dadosDia.dados.chick.final}</td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${dadosDia.dados.chick.fazerPorcoes}</td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${dadosDia.dados.chick.tirarKg.toFixed(1)}</td>
                    </tr>
                </tbody>
                <tfoot style="background: #667eea; color: white; font-weight: bold;">
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;">TOTAL</td>
                        <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${dadosDia.totais.trabalhar}</td>
                        <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${dadosDia.totais.final}</td>
                        <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${dadosDia.totais.fazerPorcoes}</td>
                        <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${dadosDia.totais.tirarKg.toFixed(1)}</td>
                    </tr>
                </tfoot>
            </table>
            
            <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin-top: 20px;">
                <p style="margin: 0; color: #1976d2;">
                    <strong>📧 Enviado automaticamente pelo Sistema de Controle de Frango</strong>
                </p>
                <p style="margin: 5px 0 0 0; color: #666; font-size: 12px;">
                    ${new Date().toLocaleString('pt-BR')}
                </p>
            </div>
        </div>
    `;
}

