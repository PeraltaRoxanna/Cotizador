// Espera a que todo el HTML esté cargado
document.addEventListener("DOMContentLoaded", function() {

  // =======================================================
  // --- CÓDIGO QUE SOLO SE EJECUTA EN LA PÁGINA 1 (index.html) ---
  // =======================================================

  // (Solo si encuentra el botón de calcular Y el input)
  const btn = document.getElementById('btnCalcular');
  const input = document.getElementById('valorInput');

  if (btn && input) { // Asegura que ambos existan antes de continuar

    // (resultadoSpan y botonLink son opcionales si ya no los usas para mostrar errores)
    // const resultadoSpan = document.getElementById('resultado');
    // const botonLink = document.getElementById('botonLink');

    // --- Lógica del botón "COTIZAR" ---
    btn.addEventListener('click', () => {
      let valor = input.value.replace(",", "."); // Reemplaza coma por punto

      // Valida que sea un número válido
      if (!isNaN(valor) && valor.trim() !== "") {

        // 1. HACE EL CÁLCULO
        let calculo = Math.ceil((parseFloat(valor) + 2.2) * 1630);

        // 2. FORMATEA EL RESULTADO (ej: 15.678)
        let resultadoFormateado = calculo.toLocaleString('es-AR');

        // 3. ¡LA MAGIA! Guarda el resultado en la memoria del navegador
        sessionStorage.setItem('resultadoCotizacion', resultadoFormateado);

        // 4. AHORA SÍ, redirige a la página 2
        window.location.href = "resultado.html";

      } else {
        // Si el valor es inválido, podrías mostrar un alert o nada
        // (Si resultadoSpan no existe, esta línea dará error)
        // resultadoSpan.textContent = "⚠️ Ingresa un número válido.";
        // (Si botonLink no existe, esta línea dará error)
        // botonLink.innerHTML = "";
        alert("⚠️ Ingresa un número válido."); // Opción simple
      }
    }); // Fin addEventListener 'click'

    // --- Validación en vivo del input (TU CÓDIGO ORIGINAL CON ARREGLO MÍNIMO) ---
    input.addEventListener("input", function () {
        const maxIntegerDigits = 4;
        const maxDecimalDigits = 2;

        // Quitamos la línea de maxlength, puede interferir
        // const maxLen = maxIntegerDigits + (maxDecimalDigits > 0 ? 1 + maxDecimalDigits : 0);
        // input.setAttribute('maxlength', String(maxLen));

        // permitir sólo dígitos y una coma
        let v = this.value.replace(/[^0-9,]/g, '');

        // evitar más de una coma
        const firstCommaIndex = v.indexOf(',');
        if (firstCommaIndex !== -1) {
            v = v.slice(0, firstCommaIndex + 1) + v.slice(firstCommaIndex + 1).replace(/,/g, '');
        }
         // No permitir coma al principio
         if (v.startsWith(',')) {
             v = '0' + v; // Antepone un 0
         }

        const parts = v.split(',');
        let intPart = parts[0] || '';
        let decPart = parts[1]; // Puede ser undefined o ""

        // recortar longitudes
        if (intPart.length > maxIntegerDigits) {
            intPart = intPart.slice(0, maxIntegerDigits);
        }
        // Solo recorta si decPart está definido (hay algo después de la coma)
        if (decPart !== undefined && decPart.length > maxDecimalDigits) {
            decPart = decPart.slice(0, maxDecimalDigits);
        }

        // reconstruir valor (ARREGLO MÍNIMO)
        if (v.includes(',')) { // Si el valor limpio 'v' contenía una coma...
          // Asegúrate de que decPart sea un string vacío si es undefined
          this.value = `${intPart},${decPart !== undefined ? decPart : ''}`; // ...la mantenemos.
        } else { // Si no había coma...
          this.value = intPart; // ...solo ponemos la parte entera.
        }
    }); // Fin addEventListener 'input'

  } // Fin del if (btn && input)

  // =======================================================
  // --- CÓDIGO QUE SOLO SE EJECUTA EN LA PÁGINA 2 (resultado.html) ---
  // =======================================================

  // (Solo si encuentra el display de la calculadora)
  const display = document.getElementById('displayResultado');
  if (display) {

    // 1. Lee el resultado que guardamos en la memoria
    const resultadoGuardado = sessionStorage.getItem('resultadoCotizacion');

    // 2. Si hay un resultado guardado, lo muestra
    if (resultadoGuardado) {
      display.textContent = `$${resultadoGuardado}`;
    } else {
      // Si no hay nada, muestra $0
      display.textContent = "$0";
    }
  } // Fin del if (display)

}); // Fin del DOMContentLoaded (¡ASEGÚRATE DE QUE ESTA LLAVE ESTÉ!)