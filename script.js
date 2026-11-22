document.addEventListener("DOMContentLoaded", () => {
    fetch("doencas.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao carregar o arquivo doencas.json");
            }
            return response.json();
        })
        .then(dados => {
            montarPagina(dados.categorias);
        })
        .catch(erro => {
            console.error(erro);
            document.getElementById("container-categorias").innerHTML = 
                "<p style='text-align:center; color:red;'>Erro ao carregar os dados. Lembre-se de abrir o site usando o Live Server do VS Code.</p>";
        });
});

function montarPagina(categorias) {
    const container = document.getElementById("container-categorias");

    categorias.forEach(categoria => {
        const section = document.createElement("section");
        section.classList.add("categoria");

        const h2 = document.createElement("h2");
        h2.textContent = categoria.titulo;
        section.appendChild(h2);

        const ul = document.createElement("ul");
        ul.classList.add("lista-doencas");

        categoria.doencas.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item.nome;
            li.addEventListener("click", () => abrirModal(item, categoria.tipo));
            ul.appendChild(li);
        });

        section.appendChild(ul);
        container.appendChild(section);
    });
}

function abrirModal(item, tipoCategoria) {
    document.getElementById("modal-titulo").innerText = item.nome;
    document.getElementById("modal-tipo").innerText = tipoCategoria;
    document.getElementById("modal-agente").innerText = item.agente || "-";
    document.getElementById("modal-transmissao").innerText = item.transmissao || "-";
    document.getElementById("modal-sintomas").innerText = item.sintomas || "-";
    document.getElementById("modal-profilaxia").innerText = item.profilaxia || "-";
    document.getElementById("modal-tratamento").innerText = item.tratamento || "-";

    document.getElementById("modal-doenca").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modal-doenca").style.display = "none";
}

function fecharModalFora(event) {
    const modal = document.getElementById("modal-doenca");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}