import { createIcons, icons } from "lucide";
import { rotas } from "./rotas/rotas.js";
import { navbar } from "./navbar/navbar.js";
const app = document.getElementById("app");
function renderizar() {
  const url = (location.hash || "#inicio").split("?")[0];
  const rota =
    rotas.find((item) => item.url === url) ||
    rotas.find((item) => item.url === "#inexistente");
  navbar(rotas);
  rota.pagina(app);
  createIcons({ icons });
}
addEventListener("hashchange", renderizar);
renderizar();
