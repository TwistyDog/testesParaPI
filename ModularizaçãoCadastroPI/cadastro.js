import { Texto, Numero } from "./entrada.js";

export let cadastrosCompetidores = [];
export let cadastroDocente = [];

// Função auxiliar para verificar se o perfil é autorizado (Administrador ou Coordenador)
function validarPermissaoCadastro(perfil) {
    if (!perfil) return false;

    if (perfil === 1 || perfil === 2) return true;

    const perfilFormatado = String(perfil).trim().toLowerCase();
    return perfilFormatado === "administrador" ||
           perfilFormatado === "coordenador" ||
           perfilFormatado === "coordenação" ||
           perfilFormatado === "coordenacao";
}

function solicitarCampo(mensagem){
    let valor;
    do{
        valor = Texto(mensagem).trim();
        if (valor === ""){
            console.log("Este campo e obrigatorio!");
        }
    } while (valor === "");
    return valor;
}

function validarCPF(cpf){
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += Number(cpf[i]) * (10 - i);
    }
    let resto = soma % 11;
    let primeiroDigito = resto < 2 ? 0 : 11 - resto;
    if (primeiroDigito !== Number(cpf[9])) {
        return false;
    }
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += Number(cpf[i]) * (11 - i);
    }
    resto = soma % 11;
    let segundoDigito = resto < 2 ? 0 : 11 - resto;
    return segundoDigito === Number(cpf[10]);
}

function verificarCPF(cpf){
    const cpfCompetidor = cadastrosCompetidores.some(
        usuario => usuario.infoCPF === cpf
    );
    const cpfDocente = cadastroDocente.some(
        docente => docente.infoCPF === cpf
    );
    return cpfCompetidor || cpfDocente;
}

function soliCPF(){
    let cpf;
    do{
        cpf = solicitarCampo("Informe o CPF: ");
        cpf = cpf.replace(/\D/g, "");
        
        if (!validarCPF(cpf)){
            console.log("CPF invalido! Tente novamente.");
        } else if (verificarCPF(cpf)){
            console.log("Esse CPF ja possui cadastro");
        } else{
            return cpf;
        }
    } while(true);
}

function valiEmail(email){
    const formEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return formEmail.test(email);
}

function solicEmail(){
    let email;
    do{
        email = solicitarCampo("Informe seu email: ");
        if (!valiEmail(email)){
            console.log("Email invalido! Tente novamente");
        }
    } while (!valiEmail(email));
    return email;
}

function valiDataNasc(data){
    const formData = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const resultado = data.match(formData);
    if (!resultado){
        return false;
    }
    const dia = Number(resultado[1]);
    const mes = Number(resultado[2]);
    const ano = Number(resultado[3]);
    const dataInfo = new Date(ano, mes - 1, dia);
    const hoje = new Date();
    if (
        dataInfo.getFullYear() !== ano ||
        dataInfo.getMonth() !== mes - 1 ||
        dataInfo.getDate() !== dia 
    ){
        return false;
    }
    return dataInfo <= hoje;
}

function soliDataNas(){
    let data;
    do{
        data = solicitarCampo(
            "Informe a data de nascimento (DD/MM/AAAA): "
        );
        if (!valiDataNasc(data)){
            console.log("Data Invalida! Tente novamente");
        }
    } while (!valiDataNasc(data));
    return data;
}

function cadasPessoa(tipo, lista){
    let continuar;
    do{
        console.log(`\n=================== Cadastro de ${tipo.toUpperCase()} ========`);
        const nome = solicitarCampo("Informe seu nome completo: ");
        const nomUsua = solicitarCampo("Informe seu nome de usuario: ");
        const infoSenha = solicitarCampo("Crie sua senha: ");
        const infoCPF = soliCPF();
        const dataNas = soliDataNas();
        const infoEmail = solicEmail();
        const infoCel = solicitarCampo("Informe seu telefone para contato: ");
        const unidaOrigem = solicitarCampo("Informe a unidade de origem: ");
        const curso = solicitarCampo("Informe o curso vinculado: ");
        const ocup = solicitarCampo("Informe sua ocupacao: ");

        const cadastroObj = {
            nome,
            nomUsua,
            infoSenha,
            infoCPF,
            dataNasc: dataNas,
            infoEmail,
            infoCel,
            unidadeOrigem: unidaOrigem,
            curso,
            ocupacao: ocup,
            status: "Ativo",
            tipo
        };

        lista.push(cadastroObj);
        console.log(`\n${tipo} cadastrado com sucesso!`);

        continuar = Texto(
            "\n Deseja fazer outro cadastro? (s/n): "
        ).toLocaleLowerCase().trim();
    } while (continuar === "s");
}

// Funções atualizadas com verificação de segurança (RF-02)
export function CadastroCompetidor(perfilUsuario){
    if (!validarPermissaoCadastro(perfilUsuario)) {
        console.log("\n Acesso Negado: Apenas perfis de Coordenação ou Administrador podem cadastrar!");
        return;
    }
    cadasPessoa("Competidor", cadastrosCompetidores);
}


export function CadastrarDocente(perfilUsuario){
    if (!validarPermissaoCadastro(perfilUsuario)) {
        console.log("\n Acesso Negado: Apenas perfis de Coordenação ou Administrador podem cadastrar!");
        return;
    }
    cadasPessoa("Docente", cadastroDocente);
}

export function ListarUsuariosCadastrados(listaUsuarios = cadastrosCompetidores){
    if (listaUsuarios.length === 0) {
        console.log("\nNenhum cadastro encontrado!");
        return;
    }
    console.log("\n========== LISTA DE CADASTROS ==========");
    listaUsuarios.forEach((usuario, indice) => {
        console.log(`\nCadastro ${indice + 1}`);
        console.log(`Tipo: ${usuario.tipo}`);
        console.log(`Nome: ${usuario.nome}`);
        console.log(`Usuário: ${usuario.nomUsua}`);
        console.log(`CPF: ${usuario.infoCPF}`);
        console.log(`Data de Nascimento: ${usuario.dataNasc}`);
        console.log(`E-mail: ${usuario.infoEmail}`);
        console.log(`Telefone: ${usuario.infoCel}`);
        console.log(`Unidade de Origem: ${usuario.unidadeOrigem}`);
        console.log(`Curso: ${usuario.curso}`);
        console.log(`Ocupação: ${usuario.ocupacao}`);
        console.log(`Status: ${usuario.status}`);
        console.log("---------------------------------");
    });
}

export function BuscarUsuarioPorNome(nome, dataNas, listaUsuarios = cadastrosCompetidores){
    const usuaEncon = listaUsuarios.find((usuario) =>{
        return usuario.nome.toLocaleLowerCase() === nome.toLocaleLowerCase()
              && usuario.dataNasc === dataNas
    });
    return usuaEncon || null;
}

function consultarPessoa(tipo, lista) {
    const nome = Texto("Informe o nome completo: ");
    const dataNasc = Texto("Informe a data de nascimento (DD/MM/AAAA): ");
    const usuario = BuscarUsuarioPorNome(nome, dataNasc, lista);

    if (usuario !== null) {
        console.log(`\n${tipo} encontrado!`);
        console.log(`Nome: ${usuario.nome}`);
        console.log(`Usuário: ${usuario.nomUsua}`);
        console.log(`CPF: ${usuario.infoCPF}`);
        console.log(`Data de Nascimento: ${usuario.dataNasc}`);
        console.log(`E-mail: ${usuario.infoEmail}`);
        console.log(`Telefone: ${usuario.infoCel}`);
        console.log(`Unidade: ${usuario.unidadeOrigem}`);
        console.log(`Curso: ${usuario.curso}`);
        console.log(`Ocupação: ${usuario.ocupacao}`);
        console.log(`Status: ${usuario.status}`);
    } else {
        console.log(`\n${tipo} não encontrado!`);
    }
}

export function ConsultarCompetidor() {
    consultarPessoa("Competidor", cadastrosCompetidores);
}

export function ConsultarDocente() {
    consultarPessoa("Docente", cadastroDocente);
}