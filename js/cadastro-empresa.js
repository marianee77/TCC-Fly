document.addEventListener("DOMContentLoaded", () => {
    //verifica se há um formulário de cadastro
    const form = document.getElementById("empresaForm");
    if (form) {
        form.addEventListener("submit", cadastrarEmpresa);
    }
});

//função para cadastrar a empresa
function cadastrarEmpresa(event) {
    event.preventDefault(); // Previne o comportamento padrão de envio do formulário

    //obtém os valores dos campos do formulário
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const descricao = document.getElementById("descricao").value;

    //cria um objeto com os dados da empresa
    const novaEmpresa = {
        nome: nome,
        email: email,
        senha: senha,
        descricao: descricao,
    };

    //recupera a lista de empresas do localStorage (se existir) ou cria uma nova lista
    const empresas = JSON.parse(localStorage.getItem("empresas")) || [];

    //adiciona a nova empresa à lista
    empresas.push(novaEmpresa);

    //salva a lista atualizada de empresas no localStorage
    localStorage.setItem("empresas", JSON.stringify(empresas));

    //mensagem de sucesso ou redirecionamento
    alert("Empresa cadastrada com sucesso!");
    window.location.href = "login.html";  // Redireciona para a página de login após o cadastro
}