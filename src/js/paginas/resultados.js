import "../../css/paginas/resultados.css";
import { marmitas } from "../dadosMockados/dados.js";
import { marca } from "../navbar/marca.js";
const moeda = (valor) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function resultados(app) {
  const params = new URLSearchParams(location.hash.split("?")[1] || "");
  const busca = params.get("busca") || "";
  const categoria = params.get("categoria") || "";
  const ordem = params.get("ordem") || "menor-preco";
  const termo = busca.toLowerCase();
  const encontrados = marmitas
    .filter(
      (item) =>
        (!termo ||
          `${item.nome} ${item.bairro} ${item.categoria}`
            .toLowerCase()
            .includes(termo)) &&
        (!categoria || item.categoria === categoria),
    )
    .sort((a, b) =>
      ordem === "mais-porcoes" ? b.porcoes - a.porcoes : a.preco - b.preco,
    );

  app.innerHTML = `
    <section class="page page-resultados">
      <div class="results-top">
        <a href="#inicio" class="back-link"><i data-lucide="arrow-left"></i></a>
        ${marca()}
        <a href="#conta" class="avatar-link" aria-label="Perfil"><i data-lucide="user-round"></i></a>
      </div>
      <h1 class="results-title">${busca || categoria || "Todas as marmitas"}</h1>
      <div class="filter-row">
        <span>${encontrados.length} ${encontrados.length === 1 ? "opção perto de você" : "opções perto de você"}</span>
      </div>
      <div class="sort-control" aria-label="Ordenar resultados">
        <span>Ordenar por</span>
        <div>
          <button class="sort-option ${ordem === "menor-preco" ? "sort-option-active" : ""}" data-ordem="menor-preco" type="button">Menor preço</button>
          <button class="sort-option ${ordem === "mais-porcoes" ? "sort-option-active" : ""}" data-ordem="mais-porcoes" type="button">Mais porções</button>
        </div>
      </div>
      <div class="results-list">
        ${
          encontrados.length === 0
            ? `
              <div class="empty-state">
                <span><i data-lucide="utensils"></i></span>
                <h2>Nenhuma marmita por aqui</h2>
                <p>Tente buscar por outro prato ou confira todos os cardápios do dia.</p>
                <a class="button button-primary" href="#inicio">Nova busca</a>
              </div>
            `
            : encontrados
                .map(
                  (item) => `
                    <a class="meal-card" href="#detalhe?id=${item.id}">
                      <div class="meal-image-wrap">
                        <img class="meal-image" src="${item.imagem}" alt="${item.nome}" loading="lazy">
                        <span class="meal-availability">Disponível hoje</span>
                      </div>
                      <div class="meal-card-copy">
                        <div class="meal-info">
                          <span class="tag">${item.categoria}</span>
                          <h2>${item.nome}</h2>
                          <p><i data-lucide="map-pin"></i>${item.bairro} · até ${item.entrega}</p>
                        </div>
                        <div class="meal-meta">
                          <strong>${moeda(item.preco)}</strong>
                        </div>
                      </div>
                    </a>
                  `,
                )
                .join("")
        }
      </div>
    </section>
  `;

  document.querySelectorAll(".sort-option").forEach((button) => {
    button.addEventListener("click", () => {
      params.set("ordem", button.dataset.ordem);
      location.hash = `#resultados?${params.toString()}`;
    });
  });
}

export default {
  url: "#resultados",
  label: "Buscar",
  icon: "search",
  pagina: resultados,
};
