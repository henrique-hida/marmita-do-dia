import "../../css/paginas/detalhe.css";
import { marmitas, usuarios } from "../dadosMockados/dados.js";
import { marca } from "../navbar/marca.js";
function detalhe(app) {
  const id = Number(
    new URLSearchParams(location.hash.split("?")[1] || "").get("id"),
  );
  const item = marmitas.find((marmita) => marmita.id === id);
  if (!item) {
    location.hash = "#inexistente";
    return;
  }
  const publicador = usuarios.find((user) => user.id === item.publicadorId);
  app.innerHTML = `
    <section class="page page-detalhe">
      <div class="detail-top">
        <a href="#resultados" class="back-link"><i data-lucide="arrow-left"></i> cardápios</a>
        ${marca()}
        <a href="#conta" class="detail-account" aria-label="Perfil"><i data-lucide="user-round"></i></a>
      </div>
      <div class="meal-cover">
        <img src="${item.imagem}" alt="${item.nome}" loading="eager">
      </div>
      <div class="detail-heading">
        <div>
          <span class="tag">${item.categoria}</span>
          <h1>${item.nome}</h1>
        </div>
        <div class="detail-price">
          <span>porção</span>
          <strong>R$ ${item.preco.toFixed(2).replace(".", ",")}</strong>
        </div>
      </div>
      <p class="detail-description">${item.descricao}</p>
      <div class="detail-facts">
        <div>
          <i data-lucide="clock-3"></i>
          <span>Entrega<br><strong>${item.entrega}</strong></span>
        </div>
        <div>
          <i data-lucide="map-pin"></i>
          <span>Região<br><strong>${item.bairro}</strong></span>
        </div>
        <div>
          <i data-lucide="package"></i>
          <span>Produção<br><strong>Até ${item.porcoes} pedidos</strong></span>
        </div>
      </div>
      <div class="publisher">
        <i data-lucide="store"></i>
        <div>
          <small>publicado por</small>
          <strong>${publicador.nome}</strong>
          <span>${publicador.bairro} · cozinha local</span>
        </div>
      </div>
      <button class="button button-primary" id="interesse">Quero reservar uma porção</button>
      <p class="action-feedback" id="feedback"></p>
    </section>
  `;
  document.getElementById("interesse").addEventListener("click", () => {
    document.getElementById("feedback").textContent =
      "Pronto! O contato do publicador foi reservado para você.";
  });
}
export default {
  url: "#detalhe",
  label: "",
  icon: "utensils",
  pagina: detalhe,
};
