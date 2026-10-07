import { usuarios } from "../dadosMockados/dados.js";
let atual = null;
export function entrar(email, senha) {
  atual =
    usuarios.find((item) => item.email === email && item.senha === senha) ||
    null;
  return atual;
}
export function sair() {
  atual = null;
}
export function usuarioAtual() {
  return atual;
}
