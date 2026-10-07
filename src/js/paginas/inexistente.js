import "../../css/paginas/inexistente.css";
import { marca } from "../navbar/marca.js";
function inexistente(app) {
  app.innerHTML = `
    <section class="page page-inexistente">
      <div class="page-bar">${marca()}</div>
      <span class="not-found-icon"><i data-lucide="utensils"></i></span>
      <p class="eyebrow">ERRO 404</p>
      <h1>Essa marmita não está no cardápio</h1>
      <p>O endereço que você acessou não existe ou já saiu do ar.</p>
      <a href="#inicio" class="button button-primary">Voltar para o início</a>
    </section>
  `;
}
export default {
  url: "#inexistente",
  label: "",
  icon: "circle-help",
  pagina: inexistente,
};
