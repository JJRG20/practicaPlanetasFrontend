const API_URL = 'http://localhost:3000';
const resultado = document.getElementById('resultado');

function getHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
}

// Ver todo
async function verTodo() {
  const res = await fetch(`${API_URL}/api/planeta`, {
    headers: getHeaders()
  });
  mostrarResultado(res);
}

// Buscar según selector
async function buscar() {
  const tipo = document.getElementById('tipoBusqueda').value;
  const valor = document.getElementById('valorBusqueda').value;

  if (!valor) return;

  let url = '';

  if (tipo === 'planeta') {
    url = `/api/planeta/${valor}`;
  } else if (tipo === 'luna') {
    url = `/api/luna/${valor}`;
  }

  const res = await fetch(`${API_URL}${url}`, {
    headers: getHeaders()
  });

  mostrarResultado(res);
}

async function mostrarResultado(res) {
  if (!res.ok) {
    resultado.textContent = 'Error al obtener datos';
    return;
  }

  const data = await res.json();
  resultado.textContent = JSON.stringify(data, null, 2);
}
