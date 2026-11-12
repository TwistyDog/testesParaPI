export const validarNome = (v) => v.trim().split(/\s+/).length >= 2;
 
// Nome de usuário: mínimo 3 caracteres e sem espaços. 
export const validarUsuario = (v) => /^\S{3,}$/.test(v);
 
// Senha: mínimo 6 caracteres. 
export const validarSenha = (v) => v.length >= 6;
 
// E-mail: formato básico texto@dominio.ext 
export const validarEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
 
// Telefone: DDD + número (10 ou 11 dígitos). Aceita parênteses, traços e espaços. 
export const validarTelefone = (v) => /^\d{10,11}$/.test(v.replace(/\D/g, ""));
 
// Data de nascimento no formato dd/mm/aaaa.
// Rejeita datas inexistentes (ex.: 31/02/2000) e datas no futuro.
export function validarData(v) {
    const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(v);
    if (!m) return false;
    const [, dia, mes, ano] = m.map(Number);
    const data = new Date(ano, mes - 1, dia);
    return (
        data.getFullYear() === ano &&
        data.getMonth() === mes - 1 &&
        data.getDate() === dia &&
        data <= new Date()
    );
}
 
/** CPF: confere os 11 dígitos e os dois dígitos verificadores. */
export function validarCPF(v) {
    const cpf = v.replace(/\D/g, "");
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    for (const tamanho of [9, 10]) {
        let soma = 0;
        for (let i = 0; i < tamanho; i++) {
            soma += Number(cpf[i]) * (tamanho + 1 - i);
        }
        const digito = ((soma * 10) % 11) % 10;
        if (digito !== Number(cpf[tamanho])) return false;
    }
    return true;
}
 