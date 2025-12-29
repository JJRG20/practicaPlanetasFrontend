const API_URL = 'http://localhost:3000';
const resultado = document.getElementById('resultado');

function getHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
}

async function generarReporte() {
  const params = new URLSearchParams();

  const mindiameter = document.getElementById('mindiameter').value;
  const maxdiameter = document.getElementById('maxdiameter').value;
  const minweight = document.getElementById('minweight').value;
  const maxweight = document.getElementById('maxweight').value;
  const minsunDist = document.getElementById('minsunDist').value;
  const maxsunDist = document.getElementById('maxsunDist').value;
  const mintime = document.getElementById('mintime').value;
  const maxtime = document.getElementById('maxtime').value;
  const minluna = document.getElementById('minluna').value;
  const maxluna = document.getElementById('maxluna').value;

  if (mindiameter) params.append('mindiameter', mindiameter);
  if (maxdiameter) params.append('maxdiameter', maxdiameter);
  if (minweight) params.append('minweight', minweight);
  if (maxweight) params.append('maxweight', maxweight);
  if (minsunDist) params.append('minsunDist', minsunDist);
  if (maxsunDist) params.append('maxsunDist', maxsunDist);
  if (mintime) params.append('mintime', mintime);
  if (maxtime) params.append('maxtime', maxtime);
  if (minluna) params.append('minluna', minluna);
  if (maxluna) params.append('maxluna', maxluna);

  const url = `${API_URL}/api/reporte/idPlanet?${params.toString()}`;

  const res = await fetch(url, {
    headers: getHeaders()
  });

  if (!res.ok) {
    resultado.textContent = 'Error al generar reporte';
    return;
  }

  const data = await res.json();
  resultado.textContent = JSON.stringify(data, null, 2);
}
