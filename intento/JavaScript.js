// Espera a que todo el HTML esté cargado
document.addEventListener("DOMContentLoaded", function() {

  // =================================================
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
     // --- Validación en vivo del input (limita dígitos enteros y decimales) ---
    input.addEventListener("input", function () {
      const maxIntegerDigits = 4;   // cambiar a 3 o 4 según prefieras
      const maxDecimalDigits = 2;   // 0 si no querés decimales

      // fuerza maxlength para respaldo (1 extra si permitimos coma)
      const maxLen = maxIntegerDigits + (maxDecimalDigits > 0 ? 1 + maxDecimalDigits : 0);
      input.setAttribute('maxlength', String(maxLen));

      // permitir sólo dígitos y una coma
      let v = this.value.replace(/[^0-9,]/g, '');

      // evitar más de una coma
      const firstCommaIndex = v.indexOf(',');
      if (firstCommaIndex !== -1) {
        // toma solo la primera coma y descarta las siguientes
        v = v.slice(0, firstCommaIndex + 1) + v.slice(firstCommaIndex + 1).replace(/,/g, '');
      }

      const parts = v.split(',');
      let intPart = parts[0] || '';
      let decPart = parts[1] || '';

      // recortar longitudes
      if (intPart.length > maxIntegerDigits) {
        intPart = intPart.slice(0, maxIntegerDigits);
      }
      if (decPart.length > maxDecimalDigits) {
        decPart = decPart.slice(0, maxDecimalDigits);
      }

      // reconstruir valor
      this.value = decPart ? `${intPart},${decPart}` : intPart;
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