import { Texto, Numero } from "./entrada";

export let cadastrosCompetidores = [];

export function cadastroUsuario(){
    let continuar;

    do {
        const nome = Texto("Informe seu nome completo: ");
        const infoEmail = Texto("Informe seu email: ");
        const infoCPF = Numero("Informe o numero do CPF: ");
        const dataNasc = Numero("Informe a data de nascimento: ");
        const infoCel = Numero("Informe seu numero para contato: ");


        const cadastroObj = {
            nome,
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

export function listarUsariosCadastrados(listaUsuarios = cadastrosCompetidores){
    
}