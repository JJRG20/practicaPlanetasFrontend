// Función que se ejecuta al hacer clic en "Eliminar"
async function eliminar() {
  const tipo = document.getElementById('tipoEliminacion').value;
  const idEliminar = document.getElementById('idEliminar').value;
  const confirmacion = document.getElementById('confirmacion');
  
  if (!idEliminar) {
    confirmacion.textContent = 'Por favor, ingresa un ID.';
    return;
  }

  // Mostrar confirmación de eliminación
  const confirmar = window.confirm(`¿Estás seguro de que deseas eliminar permanentemente este ${tipo}?`);

  if (!confirmar) {
    return; // Si el usuario cancela, no hace nada
  }

  // Determinar la URL según el tipo seleccionado (planeta o luna)
  let url = '';
  if (tipo === 'planeta') {
    url = `/api/planeta/${idEliminar}`;
  } else if (tipo === 'luna') {
    url = `/api/luna/${idEliminar}`;
  }

  // Realizar la solicitud para eliminar el recurso
  const res = await fetch(`http://localhost:3000${url}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  });

  const data = await res.json();

  if (res.ok) {
    alert(data.message);
    window.location.href = 'eliminar.html';
  } else {
    alert(data.message);
  }
}
