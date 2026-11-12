// Lista oficial de status (freeze = congelada)
export const STATUS = Object.freeze({
    PRE_CANDIDATO: "Pré-candidato",
    EM_TREINAMENTO: "Selecionado para treinamento",
    COMPETIDOR: "Competidor",
    EX_COMPETIDOR: "Ex-competidor"
});

// Mapa: status atual -> lista de status para os quais pode ser alterado.
const TRANSICOES = Object.freeze({
    [STATUS.PRE_CANDIDATO]: [STATUS.EM_TREINAMENTO, STATUS.EX_COMPETIDOR],
    [STATUS.EM_TREINAMENTO]: [STATUS.COMPETIDOR, STATUS.EX_COMPETIDOR],
    [STATUS.COMPETIDOR]: [STATUS.EX_COMPETIDOR],
    [STATUS.EX_COMPETIDOR]: []
});

// Devolve os status para os quais é possível avançar a partir do atual. 
export function proximoStatus(atual) {
    return TRANSICOES[atual] ?? [];
}

// Informa se a mudança de um status para outro é permitida. 
export function podeTransitar(de, para) {
    return proximoStatus(de).includes(para);
}