import { Texto, Numero } from "./entrada.js";
import {
    CadastroCompetidor,
    CadastrarDocente,
    ListarUsuariosCadastrados,
    ConsultarCompetidor,
    ConsultarDocente,
    editarStatus,
    cadastrosCompetidores,
    cadastroDocente
} from "./cadastro.js";

// Identifica o perfil de quem está acessando o sistema (aceita número ou texto)
console.log("\n=== AUTENTICAÇÃO DO SISTEMA ===");
console.log("1 - Administrador");
console.log("2 - Coordenador");
console.log("3 - Competidor");
const entradaPerfil = Numero("Escolha o seu perfil (1, 2 ou 3): ");

// Mapeia a entrada para a validação funcionar perfeitamente com números ou textos
let perfilLogado = entradaPerfil;
if (entradaPerfil === 1) perfilLogado = "administrador";
if (entradaPerfil === 2) perfilLogado = "coordenador";
if (entradaPerfil === 3) perfilLogado = "competidor";

const ehAdministradorOuCoordenador = 
    perfilLogado === "administrador" || 
    perfilLogado === "coordenador" || 
    perfilLogado === "coordenação" ||
    perfilLogado === "coordenacao";

let opcao;

do {
    console.log("\n============== SISTEMA DE CADASTRO DE COMPETIDORES =================");
    
    // Se for Administrador ou Coordenador, exibe as opções restritas. Senão, elas ficam ocultas!
    if (ehAdministradorOuCoordenador) {
        console.log("1 - Cadastrar competidor");
        console.log("2 - Cadastrar docente");
        console.log("3 - Atualizar status do competidor");
    }
    
    console.log("4 - Listar competidor");
    console.log("5 - Listar docente");
    console.log("6 - Consultar competidor");
    console.log("7 - Consultar docente");
    console.log("0 - Sair");

    opcao = Numero("Escolha uma opcao: ");

    switch (opcao) {
        case 1:
            if (!ehAdministradorOuCoordenador) {
                console.log("Opção inválida!");
                break;
            }
            CadastroCompetidor(perfilLogado);
            break;

        case 2:
            if (!ehAdministradorOuCoordenador) {
                console.log("Opção inválida!");
                break;
            }
            CadastrarDocente(perfilLogado);
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

        case 7:
            if (!ehAdministradorOuCoordenador) {
                console.log("Opção inválida!");
                break;
            }
            editarStatus(perfilLogado);
            break;

        case 0:
            console.log("Encerrando o sistema...");
            break;

        default:
            console.log("Opção inválida!");
            break;
    }
} while(opcao !== 0);