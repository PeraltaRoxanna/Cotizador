/**/

  const btn = document.getElementById('btnCalcular');
  const input = document.getElementById('valorInput');
  const resultado = document.getElementById('resultado');

btn.addEventListener('click', () => {
  let valor = input.value.replace(",", "."); 
  if (!isNaN(valor) && valor.trim() !== "") {
    let calculo = Math.ceil((parseFloat(valor)+2.2) * 1500); 
    
    // Resultado
    resultado.innerHTML = `<span class="pacifico-regular">Resultado: $${calculo.toLocaleString('es-AR')} ARS</span>`;
    
    // Botón "Comprar"
    document.getElementById('botonLink').innerHTML = `
      <a href="https://docs.google.com/forms/d/e/1FAIpQLSc4fS38SeDDiaoYoIpn4BVGaVFF8RSRGYO4XmsRYt_u36xBBA/viewform?usp=header" 
         target="_blank" 
         class="boton-pacifico pacifico-regular">
         Comprar
      </a>
    `;
  } else {
    resultado.textContent = "⚠️ Ingresa un número válido.";
    document.getElementById('botonLink').innerHTML = ""; 
  }
});





  input.addEventListener("input", function () {
    // Solo números y coma
    this.value = this.value.replace(/[^0-9,]/g, '');

    // Evitar más de una coma
    if ((this.value.match(/,/g) || []).length > 1) {
      this.value = this.value.slice(0, -1);
    }
  });

