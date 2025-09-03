document.getElementById("pranchas").addEventListener("input", function () {
  const container = document.getElementById("temposContainer");
  container.innerHTML = "";
  const pranchas = parseInt(this.value);

  for (let i = 1; i <= pranchas; i++) {
    const label = document.createElement("label");
    label.textContent = `Tempo da Prancha ${i} (horas):`;
    const input = document.createElement("input");
    input.type = "number";
    input.min = "0";
    input.step = "0.1";
    input.required = true;
    input.id = `tempo${i}`;
    container.appendChild(label);
    container.appendChild(input);
  }
});

function calcular() {
  const precoKg = parseFloat(document.getElementById("precoKg").value);
  const filamentos = parseInt(document.getElementById("filamentos").value);
  const gramas = parseFloat(document.getElementById("gramas").value);
  const pranchas = parseInt(document.getElementById("pranchas").value);

  let tempoTotal = 0;
  for (let i = 1; i <= pranchas; i++) {
    tempoTotal += parseFloat(document.getElementById(`tempo${i}`).value);
  }

  // Mostrar barra de progresso
  document.getElementById("progress").classList.remove("hidden");
  document.getElementById("resultado").classList.add("hidden");

  setTimeout(() => {
    // Cálculo do custo de filamento
    const custoFilamento = (gramas / 1000) * precoKg * filamentos;

    // Custo de energia
    const consumoKwh = 0.15; // kWh por hora
    const precoKwh = 1.0; // R$ por kWh
    const custoEnergia = tempoTotal * consumoKwh * precoKwh;

    const custoTotal = custoFilamento + custoEnergia;
    const valorSugerido = custoTotal * 1.4; // margem 40%

    const resultado = document.getElementById("resultado");
    resultado.innerHTML = `
      <h3>Resultado do Cálculo</h3>
      <p><strong>Custo com Filamento:</strong> R$ ${custoFilamento.toFixed(2)}</p>
      <p><strong>Custo com Energia:</strong> R$ ${custoEnergia.toFixed(2)}</p>
      <p><strong>Custo Total:</strong> R$ ${custoTotal.toFixed(2)}</p>
      <p><strong>Valor Sugerido de Venda:</strong> R$ ${valorSugerido.toFixed(2)}</p>
    `;
    document.getElementById("progress").classList.add("hidden");
    resultado.classList.remove("hidden");
  }, 1000); // simulação tempo de cálculo
}
