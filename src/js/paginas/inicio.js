import "../../css/paginas/inicio.css";
import { categorias, marmitas } from "../dadosMockados/dados.js";
import { marca } from "../navbar/marca.js";

function inicio(app) {
  const destaque = marmitas[0];

  app.innerHTML = `
    <section class="page page-inicio">
      <header class="home-header">
        ${marca()}
        <a class="location-chip" href="#resultados">
          <i data-lucide="map-pin"></i>
          <span>Centro</span>
          <i data-lucide="chevron-down"></i>
        </a>
      </header>
      <div class="home-intro">
        <h1>O que você quer comer hoje?</h1>
      </div>
      <form class="search-box" id="form-busca">
        <i data-lucide="search"></i>
        <input id="busca" aria-label="Buscar marmitas" placeholder="Busque por prato ou cozinha">
        <button aria-label="Buscar" type="submit"><span>Buscar</span><i data-lucide="arrow-right"></i></button>
      </form>
      <a class="featured-meal" href="#detalhe?id=${destaque.id}">
        <img src="${destaque.imagem}" alt="${destaque.nome}">
        <div class="featured-overlay">
          <span class="featured-label">mais pedido perto de você</span>
          <div class="featured-copy">
            <div>
              <h2>${destaque.nome}</h2>
              <p><i data-lucide="map-pin"></i>${destaque.bairro} · até ${destaque.entrega}</p>
            </div>
            <strong>R$ ${destaque.preco.toFixed(2).replace(".", ",")}</strong>
          </div>
        </div>
      </a>
      <div class="category-block">
        <div class="section-heading">
          <h2>Categorias</h2>
          <a href="#resultados">ver tudo</a>
        </div>
        <div class="category-list">
          ${categorias
            .map(
              ({ nome, icone }) => `
                <a href="#resultados?categoria=${encodeURIComponent(nome)}">
                  <span class="category-icon"><i data-lucide="${icone}"></i></span>
                  <strong>${nome}</strong>
                  <small>cardápios</small>
                </a>
              `,
            )
            .join("")}
        </div>
      </div>
      <section class="home-guide" aria-labelledby="guia-almoco">
        <p class="eyebrow">ALMOÇO DE HOJE</p>
        <h2 id="guia-almoco">Escolha sem precisar ligar</h2>
        <div class="guide-list">
          <div class="guide-item">
            <span><i data-lucide="map-pin"></i></span>
            <div>
              <strong>Veja quem entrega no seu bairro</strong>
              <small>Compare as cozinhas disponíveis perto de você.</small>
            </div>
          </div>
          <div class="guide-item">
            <span><i data-lucide="clock-3"></i></span>
            <div>
              <strong>Confira o horário antes de pedir</strong>
              <small>Saiba quando a marmita chega para o seu almoço.</small>
            </div>
          </div>
          <div class="guide-item">
            <span><i data-lucide="wallet-cards"></i></span>
            <div>
              <strong>Encontre uma opção no seu orçamento</strong>
              <small>Ordene os cardápios pelo menor preço.</small>
            </div>
          </div>
        </div>
        <a class="guide-link" href="#resultados">Ver todos os cardápios <i data-lucide="arrow-right"></i></a>
      </section>
    </section>
  `;

  document.getElementById("form-busca").addEventListener("submit", (event) => {
    event.preventDefault();
    location.hash = `#resultados?busca=${encodeURIComponent(document.getElementById("busca").value.trim())}`;
  });
}

export default {
  url: "#inicio",
  label: "Início",
  icon: "house",
  pagina: inicio,
};
