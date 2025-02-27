document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("empresaForm");
    const excluirBtn = document.getElementById("excluirEmpresaBtn");

    // Carregar as informações da empresa logada
    carregarDadosEmpresa();

    // Adicionar evento de submit para salvar as alterações
    if (form) {
        form.addEventListener("submit", salvarAlteracoes);
    }

    // Adicionar evento para excluir a empresa
    if (excluirBtn) {
        excluirBtn.addEventListener("click", excluirEmpresa);
    }
});

// Carregar os dados da empresa logada
function carregarDadosEmpresa() {
    const empresaLogada = JSON.parse(localStorage.getItem("empresaLogada"));
    if (empresaLogada) {
        document.getElementById("nome").value = empresaLogada.nome;
        document.getElementById("email").value = empresaLogada.email;
        document.getElementById("senha").value = empresaLogada.senha;
        document.getElementById("descricao").value = empresaLogada.descricao;
    } else {
        alert("Nenhuma empresa logada.");
        window.location.href = "login.html"; // Redireciona para login caso não haja empresa logada
    }
}

// Salvar as alterações feitas pela empresa
function salvarAlteracoes(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const descricao = document.getElementById("descricao").value;

    const empresaLogada = {
        nome: nome,
        email: email,
        senha: senha,
        descricao: descricao
    };

    // Atualiza a empresa logada no LocalStorage
    localStorage.setItem("empresaLogada", JSON.stringify(empresaLogada));

    // Adiciona ou atualiza a empresa na lista de empresas no LocalStorage
    let empresas = JSON.parse(localStorage.getItem("empresas")) || [];
    const index = empresas.findIndex(e => e.email === empresaLogada.email);

    if (index !== -1) {
        empresas[index] = empresaLogada; // Atualiza empresa existente
    } else {
        empresas.push(empresaLogada); // Adiciona nova empresa
    }

    localStorage.setItem("empresas", JSON.stringify(empresas));

    alert("Informações atualizadas com sucesso!");
    window.location.href = "index.html"; // Redireciona para a página inicial após salvar as alterações
}

// Excluir a conta da empresa
function excluirEmpresa() {
    const confirmacao = confirm("Tem certeza que deseja excluir sua conta?");
    if (confirmacao) {
        const empresaLogada = JSON.parse(localStorage.getItem("empresaLogada"));
        if (empresaLogada) {
            // Remove a empresa da lista de empresas
            let empresas = JSON.parse(localStorage.getItem("empresas")) || [];
            empresas = empresas.filter(e => e.email !== empresaLogada.email);
            localStorage.setItem("empresas", JSON.stringify(empresas));

            // Remove a empresa logada do localStorage
            localStorage.removeItem("empresaLogada");

            alert("Conta excluída com sucesso!");
            window.location.href = "index.html"; // Redireciona para a página inicial
        } else {
            alert("Nenhuma empresa logada para excluir.");
        }
    }
}
