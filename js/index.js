const authArea = document.getElementById('auth-area');

const token = localStorage.getItem('token');
const username = localStorage.getItem('username');
const role = localStorage.getItem('role');

if (!token) {
  authArea.innerHTML = `
    <a href="login.html">Login</a>
  `;
} else {
  authArea.innerHTML = `
    <p>Bienvenido/a, <b>${username}</b></p>

    ${role === 'admin' ? `
      <h3>Opciones Administrador</h3>
      <button>Ver datos</button>
      <button>Crear</button>
      <button>Eliminar</button>
    ` : ''}

    ${role === 'astro' ? `

      <h3>Opciones Astrónomo</h3>
      <button>Ver datos</button>
    ` : ''}
    <br><br>
    <button onclick="logout()">Cerrar sesión</button>
  `;
}

function logout() {
  localStorage.clear();
  location.reload();
}
