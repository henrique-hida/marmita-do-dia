import "../../css/paginas/publicar.css";
import {
  categorias,
  imagensPorCategoria,
  marmitas,
} from "../dadosMockados/dados.js";
import { marca } from "../navbar/marca.js";
import { usuarioAtual } from "../sessao/sessao.js";
function publicar(app) {
  const usuario = usuarioAtual();
  if (!usuario) {
    app.innerHTML = `
      <section class="page page-publicar">
        <div class="page-bar"><a href="#inicio" class="back-link"><i data-lucide="arrow-left"></i> início</a>${marca()}</div>
        <p class="eyebrow">SEU CARDÁPIO</p>
        <h1>Adicionar uma marmita</h1>
        <div class="publish-login-notice">
          <i data-lucide="lock-keyhole"></i>
          <div>
            <h2>Entre para publicar</h2>
            <p>Você precisa entrar na sua conta antes de adicionar um cardápio.</p>
          </div>
          <a class="button button-primary" href="#conta">Ir para o login</a>
        </div>
      </section>
    `;
    return;
  }
  app.innerHTML = `
    <section class="page page-publicar">
      <div class="page-bar"><a href="#conta" class="back-link"><i data-lucide="arrow-left"></i> perfil</a>${marca()}</div>
      <p class="eyebrow">SEU CARDÁPIO</p>
      <h1>Adicionar uma marmita</h1>
      <p class="page-lead">As pessoas vão encontrar essa opção na busca.</p>
      <form id="form-publicar" class="publish-form">
        <label for="nome">
          Nome da marmita
          <input id="nome" name="nome" minlength="5" required placeholder="Ex.: Frango com legumes">
        </label>
        <fieldset class="category-picker">
          <legend>Categoria</legend>
          <div>
            ${categorias
              .map(
                ({ nome }, index) =>
                  `<label><input type="radio" name="categoria" value="${nome}" ${index === 0 ? "checked" : ""}><span>${nome}</span></label>`,
              )
              .join("")}
          </div>
        </fieldset>
        <div class="form-row">
          <label for="preco">
            Preço (R$)
            <input id="preco" name="preco" type="number" min="0.01" step="0.01" required placeholder="20,00">
          </label>
          <label for="porcoes">
            Porções
            <input id="porcoes" name="porcoes" type="number" min="1" required placeholder="10">
          </label>
        </div>
        <label for="bairro">
          Bairro
          <input id="bairro" name="bairro" minlength="3" required placeholder="Onde será a entrega?">
        </label>
        <label for="entrega">
          Horário de entrega
          <input id="entrega" name="entrega" required placeholder="11h às 14h">
        </label>
        <label for="descricao">
          Descrição
          <input id="descricao" name="descricao" minlength="10" required placeholder="Conte o que acompanha a marmita">
        </label>
        <p class="form-message" id="form-message"></p>
        <button class="button button-primary" type="submit">Publicar cardápio</button>
      </form>
    </section>
  `;
  document
    .getElementById("form-publicar")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const form = new FormData(event.target);
      const nome = form.get("nome").trim();
      const message = document.getElementById("form-message");
      if (
        marmitas.find((item) => item.nome.toLowerCase() === nome.toLowerCase())
      ) {
        message.textContent =
          "Esse cardápio já foi publicado hoje. Tente outro nome.";
        message.className = "form-message error";
        return;
      }
      marmitas.push({
        id: marmitas.length + 1,
        publicadorId: usuario.id,
        nome,
        categoria: form.get("categoria"),
        imagem: imagensPorCategoria[form.get("categoria")],
        preco: Number(form.get("preco")),
        porcoes: Number(form.get("porcoes")),
        bairro: form.get("bairro"),
        entrega: form.get("entrega"),
        descricao: form.get("descricao"),
      });
      message.textContent =
        "Cardápio publicado! Ele já aparece nos resultados.";
      message.className = "form-message success";
      event.target.reset();
    });
}
export default {
  url: "#publicar",
  label: "Publicar",
  icon: "plus-circle",
  pagina: publicar,
};
