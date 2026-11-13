export const REGEX = {
  nomeCompleto: /^[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+)+$/,
  usuario: /^[\w.]{3,20}$/,
  senha: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
  cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  data: /^(\d{2})\/(\d{2})\/(\d{4})$/,
  email: /^[\w.+-]+@[\w-]+(\.[\w-]+)+$/,
  telefone: /^\d{2}9?\d{8}$/,
};

export const validarNome = (v) => REGEX.nomeCompleto.test(v)
export const validarUsuario = (v) => REGEX.usuario.test(v)
export const validarSenha = (v) => REGEX.senha.test(v)
export const validarEmail = (v) => REGEX.email.test(v)

//remover tudo o que não for número
export const validarTelefone = (v) => REGEX.telefone.test(v.replace(/\D/g, ""))

export function validarData(valor) {
    const m = REGEX.data.exec(valor)
    if (!m) return false
     const [, dia, mes, ano] = m.map(Number)
    const d = new Date(ano, mes - 1, dia);
    // se o dia/mês não existir (ex: 31/02), o DATE corrigi sozinho e a comparação falha
    return ano >= 1900
    && d.getFullYear() === ano
    && d.getMonth() === mes - 1
    && d.getDate() === dia
    && d <= new Date()
}   

export function validarCPF(valor) {
    if (!REGEX.cpf.test(valor)) return false
    const cpf = valor.replace(/\D/g, "")
    return !/^(\d)1{10}$/.test(cpf)
}