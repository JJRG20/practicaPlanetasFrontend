function renderHeader() {
  const header = document.createElement('header');
  header.id = 'app-header';

  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  if (!token) {
    header.innerHTML = `
      <button onclick="login()">Login</button>
    `;
  } else {
    header.innerHTML = `
      <span>👤 ${username}</span>
      <button onclick="logout()">Cerrar sesión</button>
    `;
  }

  document.body.prepend(header);
}

function login() {
  window.location.href = 'login.html';
}

function logout() {
  localStorage.clear();
  window.location.href = 'index.html';
}

renderHeader();
