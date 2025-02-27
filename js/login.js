document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    if (form) {
        form.addEventListener("submit", fazerLogin);
    }
});

// Função para realizar o login da empresa
function fazerLogin(event) {
    event.preventDefault(); // Previne o comportamento padrão de envio do formulário

    // Obtém os valores dos campos de email e senha
    const email = document.getElementById("loginEmail").value;
    const senha = document.getElementById("loginPass").value;

    // Recupera a lista de empresas cadastradas do localStorage
    const empresas = JSON.parse(localStorage.getItem("empresas")) || [];

    // Procura pela empresa com o email fornecido
    const empresaLogada = empresas.find(empresa => empresa.email === email);

    if (!empresaLogada) {
        alert("Conta não encontrada. Verifique o email digitado.");
        return;
    }

    if (empresaLogada.senha !== senha) {
        alert("Senha incorreta. Tente novamente.");
        return;
    }

    // Salva a empresa logada no localStorage
    localStorage.setItem("empresaLogada", JSON.stringify(empresaLogada));

    // Redireciona para a página inicial
    window.location.href = "index.html";
}