const authArea = document.getElementById('auth-area');

const token = localStorage.getItem('token');
const username = localStorage.getItem('username');
const role = localStorage.getItem('role');

if (!token) {
  authArea.innerHTML = `
    <h3>Inicie sesión para trabajar</h3>
  `;
} else {
  authArea.innerHTML = `
    ${role === 'admin' ? `
      <p>Bienvenido/a, <b>${username}</b> (Administrador)</p>
      <h3>Opciones Administrador</h3>
      <button onclick="window.location.href='ver.html'">Ver datos</button>
      <button onclick="window.location.href='reporte.html'">Generar reporte</button>
      <button>Crear</button>
      <button>Eliminar</button>
    ` : ''}

    ${role === 'astro' ? `
      <p>Bienvenido/a, <b>${username}</b></p>

      <h3>Opciones Astrónomo</h3>
      <button onclick="window.location.href='ver.html'">Ver datos</button>
      <button onclick="window.location.href='reporte.html'">Generar reporte</button>
    ` : ''}
    
  `;
}

