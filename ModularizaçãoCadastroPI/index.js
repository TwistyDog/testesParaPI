import { Texto, Numero } from "./entrada.js";

import{
    CadastroUsuario,
    ListarUsariosCadastrados,
    BuscarUsuarioPorNome,
    ConsultarUsuario,
    cadastrosCompetidores

} from "./cadastro.js";


let opcao;

do {
    console.log("\n============== SISTEMA DE CADASTRO DE COMPETIDORES =================");
    console.log("=======================================================================");
    console.log("1 - Cadastrar competidor");
    console.log("2 - Usuarios cadastrados");
    console.log("3 - Consultar usuario");

    opcao = Numero("Escolha uma opcao: ");
} while(opcao !== 0);