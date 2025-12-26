const menu = document.getElementById('menu');
const token = localStorage.getItem('token');
const role = localStorage.getItem('role');

if (!token) {
  menu.innerHTML = `<a href="login.html">Login</a>`;
} else {
  menu.innerHTML = `
    <p>Rol: ${role}</p>
    ${role === 'admin' ? '<button>Administrar</button>' : ''}
    <button onclick="logout()">Logout</button>
  `;
}

function logout() {
  localStorage.clear();
  window.location.href = 'index.html';
}
