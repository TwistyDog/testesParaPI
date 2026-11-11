import readline from "readline-sync";

export function Texto(mensagen){
    return readline.question(mensagen);
}

export function Numero(numero){
    return readline.questionInt(numero);
}