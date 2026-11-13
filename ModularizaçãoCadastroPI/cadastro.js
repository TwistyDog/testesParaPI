import { Texto } from "./entrada.js";
import { STATUS, proximoStatus, podeTransitar } from "./status.js";
import { validarCPF, validarData, validarEmail, validarNome, validarSenha, validarTelefone, validarUsuario } from "./validacao.js";

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
function solicitarCampo(mensagem, validar = null, erro = "Valor invalido!"){
    let valor;
    let ok
    do{
        valor = Texto(mensagem).trim();
        ok = valor != ""
        if(!ok){
            console.log("Este campo é obrigado!");
            
        } else if (validar && !validar(valor)) {
            ok = false
            console.log(erro); 
        }
    } while (!ok);
    return valor;
}

// Mostra uma lista numerada e devolve a opção escolhida
function escolherStatus(mensagem, opcoes) {
    opcoes.forEach((status, i) => console.log(`${i + 1} - ${status}`));
    let indice;
    do {
        indice = parseInt(Texto(mensagem).trim(), 10) - 1;
        if (Number.isNaN(indice) || indice < 0 || indice >= opcoes.length) {
            console.log("Opção inválida!");
        }
    } while (Number.isNaN(indice) || indice < 0 || indice >= opcoes.length);
    return opcoes[indice];
}

function cadasPessoa(tipo, lista){
    let continuar;
    do{
        console.log(`\n=================== Cadastro de ${tipo.toUpperCase()} ===================`);
        const nome = solicitarCampo("Informe seu nome completo: ", validarNome,
            "Digite seu nome completo, apenas letras."
        ) ;
        const nomUsua = solicitarCampo("Informe seu nome de usuario: ", validarUsuario,
            "Use de 3 a 20 caracteres: letras, numeros, _ ou pontos."
        );
        const infoSenha = solicitarCampo("Crie sua senha: ", validarSenha,
            "A senha precisa ter no minimo 8 caracteres, com letras e numeros."
        );
        const infoCPF = solicitarCampo("Informe o CPF: ", validarCPF,
            "CPF invalido!"
        );
        const dataNas = solicitarCampo("Informe a data de nascimento: ", validarData,
            "Data invalida! Use o formato DD/MM/AAAA."
        );
        const infoEmail = solicitarCampo("Informe seu e-mail: ", validarEmail,
            "E-mail invalido!"
        );
        const infoCel = solicitarCampo("Informe seu telefone para contato: ", validarTelefone,
            "Telefone invalido! Exemplo: (91) 98888-7777"
        );
        const unidaOrigem = solicitarCampo("Informe a unidade de origem: ");
        const curso = solicitarCampo("Informe o curso vinculado: ");
        const ocup = solicitarCampo("Informe sua ocupacao: ");

        // Competidor: a coordenação escolhe o status inicial. Docente continua "Ativo".
        const status = tipo === "Competidor"
            ? escolherStatus("Escolha o status inicial: ", Object.values(STATUS))
            : "Ativo";

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
            status,
            tipo,
            perfil: "ex-competidor"
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

// Atualiza o status de um competidor respeitando as transições permitidas
export const editarStatus = (perfilUsuario) => {
    if (!validarPermissaoCadastro(perfilUsuario)) {
        console.log("\nAcesso Negado: Apenas perfis de Coordenação ou Administrador podem alterar o status!");
        return;
    }

    const nome = Texto("Informe o nome completo do competidor: ");
    const dataNasc = Texto("Informe a data de nascimento: ");
    const competidor = BuscarUsuarioPorNome(nome, dataNasc, cadastrosCompetidores);

    if (competidor === null) {
        console.log("\nCompetidor não encontrado!");
        return;
    }

    const opcoes = proximoStatus(competidor.status);
    console.log(`\nStatus atual de ${competidor.nome}: ${competidor.status}`);

    if (opcoes.length === 0) {
        console.log("Este status é final, não há transições disponíveis.");
        return;
    }

    const novoStatus = escolherStatus("Escolha o novo status: ", opcoes);

    if (!podeTransitar(competidor.status, novoStatus)) {
        console.log("Transição não permitida!");
        return;
    }

    competidor.status = novoStatus;
    console.log(`\nStatus atualizado para: ${novoStatus}`);
};