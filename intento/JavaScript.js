/**/

  const btn = document.getElementById('btnCalcular');
  const input = document.getElementById('valorInput');
  const resultado = document.getElementById('resultado');

btn.addEventListener('click', () => {
  let valor = input.value.replace(",", "."); 
  if (!isNaN(valor) && valor.trim() !== "") {
    let calculo = Math.ceil((parseFloat(valor)+2.2) * 1500); 
    resultado.innerHTML = `<span class="pacifico-regular">$${calculo.toLocaleString('es-AR')} ARS</span>`;
    document.getElementById('botonLink').innerHTML = `
      <a href="https://docs.google.com/forms/d/e/1FAIpQLSc4fS38SeDDiaoYoIpn4BVGaVFF8RSRGYO4XmsRYt_u36xBBA/viewform?usp=header" 
         target="_blank" 
         class="boton-pacifico pacifico-regular">
         Comprar
      </a>
    `;

    // 👇 También cambia la imagen del carrusel
    const carousel = document.querySelector("#carouselExample");
    const activeItem = carousel.querySelector(".carousel-item.active");
    const nextItem = activeItem.nextElementSibling || carousel.querySelector(".carousel-item:first-child");
    activeItem.classList.remove("active");
    nextItem.classList.add("active");

  } else {
    resultado.textContent = "⚠️ Ingresa un número válido.";
    document.getElementById('botonLink').innerHTML = ""; 
  }
});

// 1. Busca el botón en el documento por su ID
  const miBoton = document.getElementById("btnCalcular");

  // 2. Le dice al botón que "escuche" un clic
  miBoton.addEventListener("click", function() {
    // 3. Cuando ocurra el clic, redirige a la página 2
    window.location.href = "resultado.html";
  });




  input.addEventListener("input", function () {
    // Solo números y coma
    this.value = this.value.replace(/[^0-9,]/g, '');

    // Evitar más de una coma
    if ((this.value.match(/,/g) || []).length > 1) {
      this.value = this.value.slice(0, -1);
    }
  });

