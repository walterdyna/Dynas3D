document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("calcForm");
  const pranchasInput = document.getElementById("pranchas");
  const temposDiv = document.getElementById("tempos");
  const resultadoDiv = document.getElementById("resultado");
  const progressBar = document.getElementById("progress-bar");

  // Criar campos de tempo conforme nº de pranchas
  pranchasInput.addEventListener("input", () => {
    temposDiv.innerHTML = "";
    const qtd = parseInt(pranchasInput.value) || 0;
    for (let i = 1; i <= qtd; i++) {
      const input = document.createElement("input");
      input.type = "number";
      input.placeholder = `Tempo da prancha ${i} (minutos)`;
      input.min = 1;
      input.required = true;
      temposDiv.appendChild(input);
    }
  });

  // Cálculo
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Reset progresso
    progressBar.style.width = "0%";
    setTimeout(() => (progressBar.style.width = "100%"), 100);

    const cores = parseInt(document.getElementById("filamento").value);
    const gramas = parseFloat(document.getElementById("gramas").value);
    const pranchas = parseInt(pranchasInput.value);

    const tempos = [...temposDiv.querySelectorAll("input")].map(inp => parseFloat(inp.value));
    const totalMin = tempos.reduce((a, b) => a + b, 0);

    // Supondo custo: R$0,20 por grama + R$0,50 por cor + R$0,30 por minuto de energia
    const custo = (gramas * 0.20) + (cores * 0.5) + (totalMin * 0.30);
    const sugerido = custo * 1.7;

    resultadoDiv.innerHTML = `
      <h3>Resultados</h3>
      <p><strong>Custo:</strong> R$ ${custo.toFixed(2)}</p>
      <p><strong>Valor Sugerido:</strong> R$ ${sugerido.toFixed(2)}</p>
    `;
  });
});
