document.getElementById('tipoCreacion').addEventListener('change', mostrarFormulario);

function mostrarFormulario() {
  const tipo = document.getElementById('tipoCreacion').value;
  const formularioCrear = document.getElementById('formularioCrear');

  if (tipo === 'planeta') {
    formularioCrear.innerHTML = `
      <h3>Crear Planeta</h3>
      <label for="name">Nombre:</label>
      <input type="text" id="name" required /><br>
      <label for="diameter">Diámetro (Km):</label>
      <input type="number" id="diameter" required /><br>
      <label for="weight">Masa (Ton):</label>
      <input type="number" id="weight" required /><br>
      <label for="sunDist">Distancia de su órbita al sol (Km):</label>
      <input type="number" id="sunDist" required /><br>
      <label for="time">Tiempo de órbita alrededor del sol (días):</label>
      <input type="number" id="time" required /><br>
      <button onclick="crearPlaneta()">Crear planeta</button>
    `;
  } else if (tipo === 'luna') {
    formularioCrear.innerHTML = `
      <h3>Crear Luna</h3>
      <label for="name">Nombre:</label>
      <input type="text" id="name" required /><br>
      <label for="diameter">Diámetro (Km):</label>
      <input type="number" id="diameter" required /><br>
      <label for="weight">Masa (Ton):</label>
      <input type="number" id="weight" required /><br>
      <label for="planeta">Planeta:</label>
      <select id="planetaSelect">
        <!-- Aquí se cargan los planetas existentes -->
      </select><br>
      <button onclick="crearLuna()">Crear luna</button>
    `;
    cargarPlanetas();
  }
}

async function cargarPlanetas() {
  const res = await fetch('http://localhost:3000/api/planeta', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });

  const planetas = await res.json();
  const select = document.getElementById('planetaSelect');

  planetas.forEach(planeta => {
    const option = document.createElement('option');
    option.value = planeta.idPlanet;
    option.textContent = planeta.name;
    select.appendChild(option);
  });
}

async function crearPlaneta() {
  const name = document.getElementById('name').value;
  const diameter = document.getElementById('diameter').value;
  const weight = document.getElementById('weight').value;
  const sunDist = document.getElementById('sunDist').value;
  const time = document.getElementById('time').value;

  const res = await fetch('http://localhost:3000/api/planeta', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      diameter: diameter,
      weight: weight,
      sunDist: sunDist,
      time: time
    })
  });

  const data = await res.json();

  if (res.ok) {
    alert('Planeta creado exitosamente');
    window.location.href = 'crear.html';
  } else {
    alert('Error al crear el planeta: ' + data.message);
  }
}

async function crearLuna() {
  const name = document.getElementById('name').value;
  const diameter = document.getElementById('diameter').value;
  const weight = document.getElementById('weight').value;
  const idPlanet = document.getElementById('planetaSelect').value;

  const res = await fetch('http://localhost:3000/api/luna', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      diameter: diameter,
      weight: weight,
      idPlanet: idPlanet
    })
  });

  const data = await res.json();

  if (res.ok) {
    alert('Luna creada exitosamente');
    window.location.href = 'crear.html';
  } else {
    alert('Error al crear la luna: ' + data.message);
  }
}
