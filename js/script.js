window.addEventListener("load", () => {
  document.getElementById("opcao").addEventListener("change", function () {
    var opcaoSelecionada = document.getElementById("opcao").value;
    var resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = ""; // Limpa o conteúdo anterior

    fetch("https://wilton-filho.github.io/PFJS-GitHub/bases/alunos.json")
      .then((response) => response.json())
      .then((estudantes) => {
        switch (opcaoSelecionada) {
          case "todos":
            mostrarTodos(estudantes);
            break;
          case "homens":
            mostrarPorSexo(estudantes, "M");
            break;
          case "mulheres":
            mostrarPorSexo(estudantes, "F");
            break;
          case "aprovados":
            mostrarAprovados(estudantes);
            break;
          case "reprovados":
            mostrarReprovados(estudantes);
            break;
          case "todosAprovados":
            mostrarTodosAprovados(estudantes);
            break;
          case "media":
            mostrarMediaTurma(estudantes);
            break;
          default:
            resultadoDiv.innerText = "Selecione uma opção válida.";
            break;
        }
      });
  });

  function mostrarTodos(estudantes) {
    var resultadoDiv = document.getElementById("resultado");
    estudantes.forEach((estudante) => {
      var p = document.createElement("p");
      p.innerText = `${estudante.nome}: ${estudante.notaBim1} (bimestre 1) e ${
        estudante.notaBim2
      } (bimestre 2) = ${estudante.notaBim1 + estudante.notaBim2};`;
      resultadoDiv.appendChild(p);
    });
  }

  function mostrarPorSexo(estudantes, sexo) {
    var resultadoDiv = document.getElementById("resultado");
    var filtrados = estudantes.filter((estudante) => estudante.sexo === sexo);
    filtrados.forEach((estudante) => {
      var p = document.createElement("p");
      p.innerText = `${estudante.nome}: ${estudante.notaBim1} (bimestre 1) e ${
        estudante.notaBim2
      } (bimestre 2) = ${estudante.notaBim1 + estudante.notaBim2};`;
      resultadoDiv.appendChild(p);
    });
  }

  function mostrarAprovados(estudantes) {
    var resultadoDiv = document.getElementById("resultado");
    var aprovados = estudantes.filter(
      (estudante) => estudante.notaBim1 + estudante.notaBim2 >= 60
    );
    aprovados.forEach((estudante) => {
      var p = document.createElement("p");
      p.innerText = `${estudante.nome}: ${estudante.notaBim1} (bimestre 1) e ${
        estudante.notaBim2
      } (bimestre 2) = ${estudante.notaBim1 + estudante.notaBim2};`;
      resultadoDiv.appendChild(p);
    });
  }

  function mostrarReprovados(estudantes) {
    var resultadoDiv = document.getElementById("resultado");
    var reprovados = estudantes.filter(
      (estudante) => estudante.notaBim1 + estudante.notaBim2 < 60
    );
    reprovados.forEach((estudante) => {
      var p = document.createElement("p");
      p.innerText = `${estudante.nome}: ${estudante.notaBim1} (bimestre 1) e ${
        estudante.notaBim2
      } (bimestre 2) = ${estudante.notaBim1 + estudante.notaBim2};`;
      resultadoDiv.appendChild(p);
    });
  }

  function mostrarTodosAprovados(estudantes) {
    var resultadoDiv = document.getElementById("resultado");
    var todosAprovados = estudantes.every(
      (estudante) => estudante.notaBim1 + estudante.notaBim2 >= 60
    );
    var p = document.createElement("p");
    p.innerText =
      "Todos os estudantes aprovados? " + (todosAprovados ? "Sim" : "Não");
    resultadoDiv.appendChild(p);
  }

  function mostrarMediaTurma(estudantes) {
    var resultadoDiv = document.getElementById("resultado");
    var somaNotasFinais = estudantes.reduce(
      (total, estudante) => total + estudante.notaBim1 + estudante.notaBim2,
      0
    );
    var totalEstudantes = estudantes.length;
    var media = somaNotasFinais / totalEstudantes;
    var p = document.createElement("p");
    p.innerText = "Nota média = " + media.toFixed(2);
    resultadoDiv.appendChild(p);
  }
});
