import Swal from 'sweetalert2';

const texto = document.getElementById('texto');
const palabra = document.getElementById('palabra');
const nueva = document.getElementById('nueva');
const resultado = document.getElementById('resultado');
const total = document.getElementById('total');

document.getElementById('buscar').addEventListener('click', () => {
  const buscada = palabra.value.trim();

  if (texto.value.trim() === '' || buscada === '') {
    Swal.fire('Atención', 'Escribe un texto y la palabra a buscar', 'warning');
    return;
  }
  const segura = buscada.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const partes = texto.value.split(new RegExp('(' + segura + ')', 'i'));

  resultado.innerHTML = '';
  partes.forEach((parte, i) => {
    if (i % 2 === 1) {
      const marca = document.createElement('mark');
      marca.textContent = parte;
      resultado.append(marca);
    } else {
      resultado.append(parte);
    }
  });

  const cantidad = (partes.length - 1) / 2;
  total.textContent = cantidad;

  if (cantidad === 0) {
    Swal.fire('Sin resultados', 'No se encontró "' + buscada + '"', 'info');
  } else {
    Swal.fire('Listo', 'Se encontró ' + cantidad + ' vez(veces)', 'success');
  }
});

document.getElementById('reemplazar').addEventListener('click', () => {
  const buscada = palabra.value.trim();
  const reemplazo = nueva.value.trim();

  if (texto.value.trim() === '' || buscada === '' || reemplazo === '') {
    Swal.fire('Atención', 'Escribe el texto, la palabra a buscar y la palabra nueva', 'warning');
    return;
  }

  const segura = buscada.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const partes = texto.value.split(new RegExp(segura, 'i'));
  const cantidad = partes.length - 1;

  if (cantidad === 0) {
    Swal.fire('Sin resultados', 'No se encontró "' + buscada + '"', 'info');
    return;
  }

  texto.value = partes.join(reemplazo);
  resultado.textContent = texto.value;
  total.textContent = cantidad;

  Swal.fire('Listo', 'Se reemplazaron ' + cantidad + ' palabra(s)', 'success');
});

document.getElementById('limpiar').addEventListener('click', () => {
  texto.value = '';
  palabra.value = '';
  nueva.value = '';
  resultado.textContent = '';
  total.textContent = '0';
});