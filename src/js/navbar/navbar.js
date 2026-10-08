export function navbar(rotas) {
  const rotaAtual = (location.hash || "#inicio").split("?")[0];
  document.getElementById("navbar").innerHTML = `<nav class="navbar">${rotas
    .filter((rota) => rota.label)
    .map(
      (rota) =>
        `<a class="navbar-item ${rota.url === rotaAtual ? "navbar-item-active" : ""}" href="${rota.url}"><i data-lucide="${rota.icon}"></i><span>${rota.label}</span></a>`,
    )
    .join("")}</nav>`;
}
