document.addEventListener("DOMContentLoaded", () => {
    // Verifica se há um formulário de cadastro
    const form = document.getElementById("empresaForm");
    if (form) {
        form.addEventListener("submit", cadastrarEmpresa);
    }
});

// Função para cadastrar a empresa
function cadastrarEmpresa(event) {
    event.preventDefault(); // Previne o comportamento padrão de envio do formulário

    // Obtém os valores dos campos do formulário
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const descricao = document.getElementById("descricao").value;

    // Recupera a lista de empresas do localStorage (se existir) ou cria uma nova lista
    const empresas = JSON.parse(localStorage.getItem("empresas")) || [];

    // Verifica se o e-mail já está cadastrado
    const emailJaCadastrado = empresas.some(empresa => empresa.email === email);

    if (emailJaCadastrado) {
        alert("Este e-mail já está cadastrado! Tente outro.");
        return; // Interrompe o cadastro se o e-mail já existir
    }

    // Cria um objeto com os dados da empresa
    const novaEmpresa = {
        nome: nome,
        email: email,
        senha: senha,
        descricao: descricao,
    };

    // Adiciona a nova empresa à lista
    empresas.push(novaEmpresa);

    // Salva a lista atualizada de empresas no localStorage
    localStorage.setItem("empresas", JSON.stringify(empresas));

    // Mensagem de sucesso e redirecionamento
    alert("Empresa cadastrada com sucesso!");
    window.location.href = "login.html";  // Redireciona para a página de login após o cadastro
}
