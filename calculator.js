"use strict";
const simulacoes = new Map();
let grafico = null;
function calcularProjecao(clientesDia, ticketMedio, diasUteis, crescimentoMensal, impulsoAgencia = 0.3, meses = 12) {
    const atual = [];
    const projetado = [];
    let faturamentoAtual = clientesDia * ticketMedio * diasUteis;
    let faturamentoProjetado = faturamentoAtual;
    for (let i = 1; i <= meses; i++) {
        faturamentoAtual *= 1 + crescimentoMensal / 100;
        faturamentoProjetado *= 1 + (crescimentoMensal * (1 + impulsoAgencia)) / 100;
        atual.push(parseFloat(faturamentoAtual.toFixed(2)));
        projetado.push(parseFloat(faturamentoProjetado.toFixed(2)));
    }
    return { atual, projetado };
}
function atualizarDropdown() {
    const select = document.getElementById("select-simulacao");
    select.innerHTML = "<option value=''>Selecione</option>";
    simulacoes.forEach((_, nome) => {
        const opt = document.createElement("option");
        opt.value = nome;
        opt.textContent = nome;
        select.appendChild(opt);
    });
}
function gerarGrafico(simulacao) {
    if (grafico)
        grafico.destroy();
    grafico = new Chart(document.getElementById("graficoProjecao"), {
        type: "line",
        data: {
            labels: Array.from({ length: 12 }, (_, i) => `Mês ${i + 1}`),
            datasets: [
                {
                    label: "Cenário Atual",
                    data: simulacao.atual,
                    borderColor: "blue",
                    fill: false,
                },
                {
                    label: "Com Agência (+30%)",
                    data: simulacao.projetado,
                    borderColor: "green",
                    fill: false,
                },
            ],
        },
    });
}
// Evento de cálculo
document.getElementById("calc-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const empresa = document.getElementById("empresa").value.trim();
    const clientesDia = parseFloat(document.getElementById("clientes-dia").value);
    const ticketMedio = parseFloat(document.getElementById("ticket-medio").value);
    const diasUteis = parseInt(document.getElementById("dias-uteis").value);
    const crescimentoMensal = parseFloat(document.getElementById("crescimento-mensal").value);
    const crescimentoAnual = parseFloat(document.getElementById("crescimento-anual").value);
    const resultado = calcularProjecao(clientesDia, ticketMedio, diasUteis, crescimentoMensal);
    const simulacao = {
        empresa,
        clientesDia,
        ticketMedio,
        diasUteis,
        crescimentoMensal,
        crescimentoAnual,
        ...resultado,
    };
    simulacoes.set(empresa, simulacao);
    atualizarDropdown();
    gerarGrafico(simulacao);
});
// Botão de salvar
document.getElementById("salvar-simulacao").addEventListener("click", () => {
    alert("Simulação salva com sucesso!");
});
// Botão de exportar
document.getElementById("exportar-simulacao").addEventListener("click", () => {
    const empresa = document.getElementById("empresa").value.trim();
    const dados = simulacoes.get(empresa);
    if (!dados) {
        alert("Nenhuma simulação encontrada.");
        return;
    }
    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${empresa}-simulacao.json`;
    link.click();
});
// Botão de seleção de simulação salva
document.getElementById("select-simulacao").addEventListener("change", (e) => {
    const empresa = e.target.value;
    const dados = simulacoes.get(empresa);
    if (dados)
        gerarGrafico(dados);
});
// Sidebar retrátil (mobile)
document.getElementById("toggle-sidebar").addEventListener("click", () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("open");
});
