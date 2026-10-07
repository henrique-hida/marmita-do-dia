import "../../css/paginas/conta.css";
import { marmitas } from "../dadosMockados/dados.js";
import { marca } from "../navbar/marca.js";
import { entrar, sair, usuarioAtual } from "../sessao/sessao.js";
function conta(app) {
  const usuario = usuarioAtual();
  if (!usuario) {
    login(app);
    return;
  }
  const minhas = marmitas.filter((item) => item.publicadorId === usuario.id);
  app.innerHTML = `
    <section class="page page-conta">
      <div class="page-bar">${marca()}</div>
      <header class="profile-header">
        <div>
          <h1>Seu perfil</h1>
          <p>${usuario.nome} · ${usuario.bairro}</p>
        </div>
      </header>
      <div class="account-stat">
        <strong>${minhas.length}</strong>
        <span>cardápios ativos</span>
      </div>
      <div class="section-heading">
        <h2>Seu cardápio</h2>
        <a href="#publicar">Publicar</a>
      </div>
      <div class="my-meals">
        ${minhas
          .map(
            (item) => `
              <a href="#detalhe?id=${item.id}">
                <img class="account-meal-image" src="${item.imagem}" alt="${item.nome}" loading="lazy">
                <div>
                  <strong>${item.nome}</strong>
                  <small>Até ${item.porcoes} pedidos · R$ ${item.preco.toFixed(2).replace(".", ",")}</small>
                </div>
                <i data-lucide="chevron-right"></i>
              </a>
            `,
          )
          .join("")}
      </div>
      <button class="button button-outline" id="sair">Sair da conta</button>
    </section>
  `;
  document.getElementById("sair").addEventListener("click", () => {
    sair();
    login(app);
  });
}
function login(app) {
  app.innerHTML = `
    <section class="page page-login">
      <div class="page-bar">${marca()}</div>
      <h1>Entre para publicar</h1>
      <p class="page-lead">Acesse seus cardápios e compartilhe o almoço de hoje.</p>
      <form id="form-login" class="login-form">
        <label for="email">
          E-mail
          <input id="email" type="email" required placeholder="user@gmail.com">
        </label>
        <label for="senha">
          Senha
          <input id="senha" type="password" required minlength="6" placeholder="123456">
        </label>
        <p class="login-error" id="login-error"></p>
        <button class="button button-primary" type="submit">Entrar</button>
      </form>
      <p class="demo-hint">Para testar: user@gmail.com · 123456</p>
    </section>
  `;
  document.getElementById("form-login").addEventListener("submit", (event) => {
    event.preventDefault();
    if (
      !entrar(
        document.getElementById("email").value,
        document.getElementById("senha").value,
      )
    ) {
      document.getElementById("login-error").textContent =
        "E-mail ou senha incorretos. Tente novamente.";
      return;
    }
    conta(app);
  });
}
export default {
  url: "#conta",
  label: "Perfil",
  icon: "user-round",
  pagina: conta,
};
