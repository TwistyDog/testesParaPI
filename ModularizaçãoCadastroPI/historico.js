import { question } from "readline-sync";
import { CadastrarDocente, cadastroDocente } from "./cadastro.js";

export function validarAcesso(competidor) {

    if (!competidor || !competidor.nome) {
        console.log("\nAcesso negado: usuário não autenticado.");
        return false;
    }

    if (competidor.perfil !== "ex-competidor") {
        console.log("\nAcesso negado: esta consulta é exclusiva para ex-competidores.");
        return false;
    }

    return true;
}

export function filtrarRegistros(registros, competidorId) {

    if (!Array.isArray(registros)) {
        return [];
    }

    return registros.filter(registro =>
        String(registro.competidorId) === String(competidorId)
    );
}


export function exibirParticipacoes(participacoes) {

    console.log("\n========== HISTÓRICO DE PARTICIPAÇÕES ==========");

    if (participacoes.length === 0) {
        console.log("Nenhuma participação encontrada.");
        return;
    }

    participacoes.forEach((item, indice) => {

        console.log(`\n${indice + 1}. ${item.competicao || "Nao informada"}`);
        console.log(`Ocupação: ${item.ocupacao || "Nao informada"}`);
        console.log(`Período: ${item.periodo || "Nao informado"}`);
        console.log(`Resultado: ${item.resultado || "Nao informado"}`);
        console.log(`Status: ${item.status || "Nao informado"}`);

    });
}

export function exibirTreinamentos(treinamentos) {

    console.log("\n========== HISTÓRICO DE TREINAMENTOS ==========");

    if (treinamentos.length === 0) {
        console.log("Nenhum treinamento encontrado.");
        return;
    }

    treinamentos.forEach((item, indice) => {

        console.log(`\n${indice + 1}. ${item.nome || "Não informado"}`);
        console.log(`Data: ${item.data || "Não informada"}`);
        console.log(`Carga horária: ${item.cargaHoraria ?? "Não informada"} horas`);
        console.log(`Responsável: ${item.responsavel || "Não informado"}`);
        console.log(`Frequência: ${item.frequencia || "Não informada"}`);

    });
}


export function exibirAvaliacoes(avaliacoes) {

    console.log("\n========== HISTÓRICO DE AVALIAÇÕES ==========");

    if (avaliacoes.length === 0) {
        console.log("Nenhuma avaliação encontrada.");
        return;
    }

    avaliacoes.forEach((item, indice) => {

        console.log(`\n${indice + 1}. ${item.atividade || "Não informada"}`);
        console.log(`Critério: ${item.criterio || "Não informado"}`);
        console.log(`Nota: ${item.nota ?? "Não informada"}`);
        console.log(`Data: ${item.data || "Não informada"}`);
        console.log(`Avaliador: ${item.avaliador || "Não informado"}`);
        console.log(`Observação: ${item.observacao || "Nenhuma observação"}`);

    });
}

export function consultarHistorico(competidor, dadosHistorico) {

    if (!validarAcesso(competidor)) {
        return null;
    }

    const dados = dadosHistorico || {};

    return {

        participacoes: filtrarRegistros(
            dados.participacoes,
            competidor.id
        ),

        treinamentos: filtrarRegistros(
            dados.treinamentos,
            competidor.id
        ),

        avaliacoes: filtrarRegistros(
            dados.avaliacoes,
            competidor.id
        )

    };
}

export function exibirHistorico(competidor, dadosHistorico) {

    const historico = consultarHistorico(
        competidor,
        dadosHistorico
    );

    if (historico === null) {
        return;
    }

    console.log("\n============================================");
    console.log("             MEU HISTÓRICO          ");

    console.log(`Competidor: ${competidor.nome || "Nao informado"}`);

    console.log("\nModo de acesso: SOMENTE CONSULTA");

    console.log("Voce nao possui permissao para cadastrar, editar ou excluir registros.");

    let opcao;

    while(true) {
        console.log("\n--------------- MENU DO HISTÓRICO ---------------");

        console.log("1 - Consultar participações");
        console.log("2 - Consultar treinamentos");
        console.log("3 - Consultar avaliações");
        console.log("4 - Consultar histórico completo");
        console.log("0 - Voltar");

        opcao = question("\nEscolha uma opçao: ").trim();

        switch (opcao) {

            case "1":
                exibirParticipacoes(historico.participacoes);
                break;

            case "2":
                exibirTreinamentos(historico.treinamentos);
                break;

            case "3":
                exibirAvaliacoes(historico.avaliacoes);
                break;

            case "4":
                exibirParticipacoes(historico.participacoes);
                exibirTreinamentos(historico.treinamentos);
                exibirAvaliacoes(historico.avaliacoes);
                break;

            case "0":
                console.log("\nRetornando ao menu anterior...");
                return;
        }
    }
}