import { Texto, Numero } from "./entrada.js";

import{
    CadastroCompetidor,
    CadastrarDocente,
    ListarUsuariosCadastrados,
    ConsultarCompetidor,
    ConsultarDocente,
    cadastrosCompetidores,
    cadastroDocente

} from "./cadastro.js";


let opcao;

do {
    console.log("\n============== SISTEMA DE CADASTRO DE COMPETIDORES =================");
    console.log("=======================================================================");
    console.log("1 - Cadastrar competidor");
    console.log("2 - Cadastrar docente");
    console.log("3 - Listar competidor");
    console.log("4 - Listar docente ");
    console.log("5 - Consultar competidor");
    console.log("6 - Consultar docente");
    console.log("0 - Sair");

    opcao = Numero("Escolha uma opcao: ");

    switch (opcao) {

        case 1:
            CadastroCompetidor();
            break;

        case 2:
            CadastrarDocente();
            break;

        case 3:
            ListarUsuariosCadastrados(cadastrosCompetidores);
            break;

        case 4:
            ListarUsuariosCadastrados(cadastroDocente);
            break;

        case 5:
            ConsultarCompetidor();
            break;

        case 6:
            ConsultarDocente();
            break;

        case 0:
            console.log("Encerrando o sistema...");
            break;

        default:
            console.log("Opção inválida!");
            break;


    }
} while(opcao !== 0);