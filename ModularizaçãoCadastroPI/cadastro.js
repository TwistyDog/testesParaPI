import { Texto } from "./entrada.js";

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

// Garante apenas que o campo não seja vazio
function solicitarCampo(mensagem){
    let valor;
    do{
        valor = Texto(mensagem).trim();
        if (valor === ""){
            console.log("Este campo é obrigatório!");
        }
    } while (valor === "");
    return valor;
}

function cadasPessoa(tipo, lista){
    let continuar;
    do{
        console.log(`\n=================== Cadastro de ${tipo.toUpperCase()} ===================`);
        const nome = solicitarCampo("Informe seu nome completo: ");
        const nomUsua = solicitarCampo("Informe seu nome de usuário: ");
        const infoSenha = solicitarCampo("Crie sua senha: ");
        const infoCPF = solicitarCampo("Informe o CPF: ");
        const dataNas = solicitarCampo("Informe a data de nascimento: ");
        const infoEmail = solicitarCampo("Informe seu e-mail: ");
        const infoCel = solicitarCampo("Informe seu telefone para contato: ");
        const unidaOrigem = solicitarCampo("Informe a unidade de origem: ");
        const curso = solicitarCampo("Informe o curso vinculado: ");
        const ocup = solicitarCampo("Informe sua ocupação: ");

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
            "\nDeseja fazer outro cadastro? (s/n): "
        ).toLocaleLowerCase().trim();
    } while (continuar === "s");
}

export function CadastroCompetidor(perfilUsuario){
    if (!validarPermissaoCadastro(perfilUsuario)) {
        console.log("\nAcesso Negado: Apenas perfis de Coordenação ou Administrador podem cadastrar!");
        return;
    }
    cadasPessoa("Competidor", cadastrosCompetidores);
}

export function CadastrarDocente(perfilUsuario){
    if (!validarPermissaoCadastro(perfilUsuario)) {
        console.log("\nAcesso Negado: Apenas perfis de Coordenação ou Administrador podem cadastrar!");
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
    const dataNasc = Texto("Informe a data de nascimento: ");
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