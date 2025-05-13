const pesos = [1,2,1,2,1,2,1,2,1,2,1];

function validaCedulaDR(cedula) {
  if (!/^[0-9]{11}$/.test(cedula)) return false;
  const digitos = cedula.split('').map(n => parseInt(n, 10));
  let suma = 0;
  for (let i = 0; i < 11; i++) {
    let prod = digitos[i] * pesos[i];
    if (prod > 9) prod = Math.floor(prod / 10) + (prod % 10);
    suma += prod;
  }
  return suma % 10 === 0;
}

function mostrarResultado(valida, display) {
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = valida
    ? `✅ La cédula <strong>${display}</strong> es <span class="valida">VÁLIDA</span>.`
    : `❌ La cédula <strong>${display}</strong> es <span class="invalida">INVÁLIDA</span>.`;
}

function guardarCedula(display) {
  const lista = JSON.parse(localStorage.getItem('cedulasValidas') || '[]');
  if (!lista.includes(display)) {
    lista.unshift(display);
    if (lista.length > 10) lista.pop();
    localStorage.setItem('cedulasValidas', JSON.stringify(lista));
  }
}

function cargarCedulas() {
  const lista = JSON.parse(localStorage.getItem('cedulasValidas') || '[]');
  const ul = document.getElementById('listaCedulas');
  ul.innerHTML = '';
  lista.forEach(c => {
    const li = document.createElement('li');
    li.textContent = c;
    ul.appendChild(li);
  });
}

function handleValidar() {
  const raw = document.getElementById('cedula').value.trim();
  let normalized = raw.replace(/-/g, '');
  if (normalized.length === 10) {
    normalized = '0' + normalized;
  }
  const valida = validaCedulaDR(normalized);
  let display = normalized;
  if (display.length === 11) {
    display = `${display.slice(0,3)}-${display.slice(3,10)}-${display.slice(10)}`;
  }
  mostrarResultado(valida, display);
  if (valida) guardarCedula(display);
  cargarCedulas();
}

cargarCedulas();
