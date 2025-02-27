document.addEventListener("DOMContentLoaded", () => {
    // Recuperar a lista de empresas do LocalStorage
    let empresas = JSON.parse(localStorage.getItem("empresas")) || [];

    //função para exibir empresas
    function exibirEmpresas(empresasFiltradas) {
        const empresasList = document.getElementById("empresasList");
        empresasList.innerHTML = ''; // Limpa a lista antes de adicionar os dados

        empresasFiltradas.forEach(empresa => {
            const empresaItem = document.createElement('div');
            empresaItem.className = 'empresa-card'; // Adiciona a classe
            empresaItem.innerHTML = `
                <h3>${empresa.nome}</h3>
                <p>${empresa.descricao}</p>
            `;
            empresasList.appendChild(empresaItem);
        });
    }

    //exibir todas as empresas ao carregar a página
    exibirEmpresas(empresas);

    //verificar se há uma empresa logada
    const empresaLogada = JSON.parse(localStorage.getItem("empresaLogada"));
    if (empresaLogada) {
        //mostrar o link para editar a empresa
        document.getElementById("editarEmpresaLink").style.display = "inline";

        //mostrar o botão de logout
        document.querySelector("button").style.display = "inline";
    } else {
        //caso não haja empresa logada, esconder o botão de logout
        document.querySelector("button").style.display = "none";
    }

    //adicionar evento para a barra de pesquisa
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", function() {
        const termoDePesquisa = searchInput.value.toLowerCase();
        const empresasFiltradas = empresas.filter(empresa =>
            empresa.nome.toLowerCase().includes(termoDePesquisa)
        );
        exibirEmpresas(empresasFiltradas);
    });
});

//função de logout
function logout() {
    //remover a empresa logada do localStorage
    localStorage.removeItem("empresaLogada");

    //redirecionar para a página inicial
    window.location.href = "index.html";
}
