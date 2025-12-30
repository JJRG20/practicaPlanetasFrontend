document.getElementById('tipoActualizar').addEventListener('change', renderFormulario);

function renderFormulario() {
  const tipo = document.getElementById('tipoActualizar').value;
  const contenedor = document.getElementById('formularioActualizar');

  if (tipo === 'planeta') {
    contenedor.innerHTML = `
      <h3>Actualizar planeta</h3>

      <label>Planeta:</label>
      <select id="idPlanet"></select><br>

      <label>Nombre:</label>
      <input id="name"><br>

      <label>Diámetro (Km):</label>
      <input type="number" id="diameter"><br>

      <label>Masa (Ton):</label>
      <input type="number" id="weight"><br>

      <label>Distancia de su órbita al sol (Km):</label>
      <input type="number" id="sunDist"><br>

      <label>Tiempo de órbita alrededor del sol (días):</label>
      <input type="number" id="time"><br>

      <button onclick="actualizarplaneta()">Actualizar</button>
    `;
    cargarplaneta();
  }

  if (tipo === 'luna') {
    contenedor.innerHTML = `
      <h3>Actualizar luna</h3>

      <label>Luna:</label>
      <select id="idLuna"></select><br>

      <label>Nombre:</label>
      <input id="name"><br>

      <label>Diámetro (Km):</label>
      <input type="number" id="diameter"><br>

      <label>Masa (Ton):</label>
      <input type="number" id="weight"><br>

      <button onclick="actualizarluna()">Actualizar</button>

      <hr>

      <h3>Cambiar planeta asociado</h3>

      <label>Luna:</label>
      <select id="idLunaCorreccion"></select><br>

      <label>Nuevo planeta:</label>
      <select id="idPlanet"></select><br>

      <button onclick="cambiarplaneta()">Cambiar asociación</button>
    `;
    cargarluna();
    cargarplaneta();
  }
}

async function cargarplaneta() {
  const res = await fetch('http://localhost:3000/api/planeta', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

  const planeta = await res.json();
  const select = document.getElementById('idPlanet');

  planeta.forEach(planeta=> {
    const opt = document.createElement('option');
    opt.value = planeta.idPlanet;
    opt.textContent = planeta.name;
    select.appendChild(opt);
  });
}

async function cargarluna() {
  const res = await fetch('http://localhost:3000/api/planeta', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

  const planeta = await res.json();

  const selectDatos = document.getElementById('idLuna');
  const selectRelacion = document.getElementById('idLunaCorreccion');

  selectDatos.innerHTML = '';
  selectRelacion.innerHTML = '';

  planeta.forEach(planeta => {
    planeta.luna.forEach(luna => {
      const texto = `${luna.name} (${planeta.name})`;

      const opt1 = document.createElement('option');
      opt1.value = luna.idLuna;
      opt1.textContent = texto;

      const opt2 = opt1.cloneNode(true);

      selectDatos.appendChild(opt1);
      selectRelacion.appendChild(opt2);
    });
  });
}


async function actualizarplaneta() {
  const idPlanet = document.getElementById('idPlanet').value;

  const body = {
    name: document.getElementById('name').value,
    diameter: document.getElementById('diameter').value,
    weight: document.getElementById('weight').value,
    sunDist: document.getElementById('sunDist').value,
    time: document.getElementById('time').value
  };

  const res = await fetch(`http://localhost:3000/api/planeta/${idPlanet}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();

  if (res.ok) {
    alert('Planeta actualizado exitosamente');
    window.location.href = 'actualizar.html';
  } else {
    alert('Error al actualizar planeta: ' + data.message);
  }
}

async function actualizarluna() {
  const idLuna = document.getElementById('idLuna').value;

  const body = {
    name: document.getElementById('name').value,
    diameter: document.getElementById('diameter').value,
    weight: document.getElementById('weight').value
  };

  const res = await fetch(`http://localhost:3000/api/luna/${idLuna}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();

  if (res.ok) {
    alert('Luna actualizada exitosamente');
    window.location.href = 'actualizar.html';
  } else {
    alert('Error al actualizar luna: ' + data.message);
  }
}

async function cambiarplaneta() {
  const idLuna = document.getElementById('idLunaCorreccion').value;
  const idPlanet = document.getElementById('idPlanet').value;

  const res = await fetch(
    `http://localhost:3000/api/planeta/${idPlanet}/luna/${idLuna}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
  );

  const data = await res.json();
  if (res.ok) {
    alert('Planeta asociado exitosamente');
    window.location.href = 'actualizar.html';
  } else {
    alert('Error al asociar planeta: ' + data.message);
  }
}
