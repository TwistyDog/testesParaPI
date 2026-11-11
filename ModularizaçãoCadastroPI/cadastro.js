import { Texto, Numero } from "./entrada.js";

export let cadastrosCompetidores = [];

export function CadastroUsuario(){
    let continuar;

    do {
        const nome = Texto("Informe seu nome completo: ");
        const nomUsua = Texto("Informe seu nome de usuario: ");
        const infoSenha = Numero("Informe sua senha: ");
        const infoEmail = Texto("Informe seu email: ");
        const infoCPF = Numero("Informe o numero do CPF: ");
        const dataNasc = Numero("Informe a data de nascimento: ");
        const infoCel = Numero("Informe seu numero para contato: ");


        const cadastroObj = {
            nome,
            nomUsua,
            infoSenha,
            infoEmail,
            infoCPF,
            dataNasc,
            infoCel
        }

         cadastrosCompetidores.push(cadastroObj);

         console.log("Cadastro concluido com sucesso!!");

         continuar = Texto(
            "Deseja fazer outro cadastro?? (s/n): "
        ).toLowerCase();
    } while (continuar === "s");
}

export function ListarUsariosCadastrados(listaUsuarios = cadastrosCompetidores){
    if (listaUsuarios.length === 0){
        console.log("Nenhum cadastro feito");
        return;
    }

    console.log("\n================ Lista de Cadastros ==============");

    listaUsuarios.forEach((usuarios) =>{
        console.log(`Usuario: ${usuarios.nomUsua}`);
        console.log(`Nome: ${usuarios.nome}`);
        console.log(`CPF: ${usuarios.infoCPF}`);
        console.log(`Data de Nascimento: ${usuarios.dataNasc}`);
        console.log("---------------------------------");

    })
}


export function BuscarUsuarioPorNome(nome, dataNasc){
    const usuarioEncontrado = cadastrosCompetidores.find((usuario) =>{
        return usuario.nome === nome && usuario.dataNasc === dataNasc;
    });

    return usuarioEncontrado || null;
}

export function ConsultarUsuario(){
    const nome = Texto("Informe o nome completo: ");
    const dataNasc = Texto("Informe sua data de nascimento: ");

    const usuario = BuscarUsuarioPorNome(nome, dataNasc);

    if (usuario !== null){
        console.log("\nUsuario encontrado");
        console.log(`Nome: ${usuario.nome}` );
        console.log(`Usuario: ${usuario.nomUsua}`);
        console.log(`Data de Nascimento: ${usuario.dataNasc}`);
        console.log(`Email: ${usuario.infoEmail}`);
    } else {
        console.log("\nUsuario nao encontrado");
    }
}