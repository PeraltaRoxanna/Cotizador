// Espera a que todo el HTML esté cargado
document.addEventListener("DOMContentLoaded", function() {

  // =======================================================
  // --- CÓDIGO QUE SOLO SE EJECUTA EN LA PÁGINA 1 (index.html) ---
  // =======================================================
  
  // (Solo si encuentra el botón de calcular)
  if (document.getElementById('btnCalcular')) {
    
    // Conecta los elementos de la Página 1
    const btn = document.getElementById('btnCalcular');
    const input = document.getElementById('valorInput');
    const resultadoSpan = document.getElementById('resultado');
    const botonLink = document.getElementById('botonLink');
    
    // --- Lógica del botón "COTIZAR" ---
    btn.addEventListener('click', () => {
      let valor = input.value.replace(",", "."); // Reemplaza coma por punto
      
      // Valida que sea un número válido
      if (!isNaN(valor) && valor.trim() !== "") {
        
        // 1. HACE EL CÁLCULO
        let calculo = Math.ceil((parseFloat(valor) + 2.2) * 1500);
        
        // 2. FORMATEA EL RESULTADO (ej: 15.678)
        let resultadoFormateado = calculo.toLocaleString('es-AR');
        
        // 3. ¡LA MAGIA! Guarda el resultado en la memoria del navegador
        sessionStorage.setItem('resultadoCotizacion', resultadoFormateado);
        
        // 4. AHORA SÍ, redirige a la página 2
        window.location.href = "resultado.html";

      } else {
        // Si el valor es inválido, muestra el error EN LA PÁGINA 1
        resultadoSpan.textContent = "⚠️ Ingresa un número válido.";
        botonLink.innerHTML = ""; 
      }
    });

    // --- Validación en vivo del input (esto ya lo tenías) ---
    input.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9,]/g, ''); // Solo números y coma
      if ((this.value.match(/,/g) || []).length > 1) {
        this.value = this.value.slice(0, -1); // Evita más de una coma
      }
    });
  }

  // =======================================================
  // --- CÓDIGO QUE SOLO SE EJECUTA EN LA PÁGINA 2 (resultado.html) ---
  // =======================================================
  
  // (Solo si encuentra el display de la calculadora)
  if (document.getElementById('displayResultado')) {
    
    // 1. Lee el resultado que guardamos en la memoria
    const resultadoGuardado = sessionStorage.getItem('resultadoCotizacion');
    
    // 2. Busca el <span> en la calculadora
    const display = document.getElementById('displayResultado');
    
    // 3. Si hay un resultado guardado, lo muestra
    if (resultadoGuardado) {
      display.textContent = `$${resultadoGuardado}`;
    } else {
      // Si no hay nada (ej. entró a la página directo), muestra $0
      display.textContent = "$0";
    }
  }

});