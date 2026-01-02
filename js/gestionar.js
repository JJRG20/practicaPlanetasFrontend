const API = 'http://localhost:3000';

const tipoOcultar = document.getElementById('tipoOcultar');
const elementoSelect = document.getElementById('elementoSelect');

tipoOcultar.addEventListener('change', cargarElementos);

function getHeaders() {
  return {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  };
}

// --------------------
// Cargar planetas o lunas
// --------------------
async function cargarElementos() {
  elementoSelect.innerHTML = '';

  const tipo = tipoOcultar.value;
  if (!tipo) return;

  let url = '';

  if (tipo === 'planeta') {
    url = '/api/planeta';
  } else if (tipo === 'luna') {
    // no hay listado de lunas solo → se obtienen desde planetas
    const res = await fetch(`${API}/api/planeta`, { headers: getHeaders() });
    const planetas = await res.json();

    planetas.forEach(planeta => {
      planeta.luna.forEach(luna => {
        const option = document.createElement('option');
        option.value = luna.idLuna;
        option.textContent = `${luna.name} (ID ${luna.idLuna})`;
        elementoSelect.appendChild(option);
      });
    });
    return;
  }

  const res = await fetch(`${API}${url}`, { headers: getHeaders() });
  const data = await res.json();

  data.forEach(item => {
    const option = document.createElement('option');
    option.value = item.idPlanet;
    option.textContent = `${item.name} (ID ${item.idPlanet})`;
    elementoSelect.appendChild(option);
  });
}

// --------------------
// Soft delete
// --------------------
async function softDelete() {
  const tipo = tipoOcultar.value;
  const id = elementoSelect.value;

  if (!tipo || !id) {
    alert('Seleccione tipo y elemento');
    return;
  }

  let url = '';

  if (tipo === 'planeta') {
    url = `/api/planeta/${id}/soft-delete`;
  } else {
    url = `/api/luna/${id}/soft-delete`;
  }

  const res = await fetch(`${API}${url}`, {
    method: 'PATCH',
    headers: getHeaders()
  });

  const data = await res.json();

  if (res.ok) {
    alert(data.message);
    cargarElementos();
  } else {
    alert('Error: ' + data.message);
  }
}

// --------------------
// Restaurar
// --------------------
async function restaurar() {
  const tipo = document.getElementById('tipoRestaurar').value;
  const id = document.getElementById('idRestaurar').value;

  if (!tipo || !id) {
    alert('Complete los datos');
    return;
  }

  let url = '';

  if (tipo === 'planeta') {
    url = `/api/planeta/${id}/restore`;
  } else {
    url = `/api/luna/${id}/restore`;
  }

  const res = await fetch(`${API}${url}`, {
    method: 'PATCH',
    headers: getHeaders()
  });

  const data = await res.json();

  if (res.ok) {
    alert(data.message);
    window.location.href = 'gestionar.html';
  } else {
    alert('Error: ' + data.message);
  }
}
