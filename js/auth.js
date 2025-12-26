const token = localStorage.getItem('token');
const role = localStorage.getItem('role');

const notLogged = document.getElementById('not-logged');
const adminOptions = document.getElementById('admin-options');
const astroOptions = document.getElementById('astro-options');
const logoutBtn = document.getElementById('logout');

if (!token) {
  notLogged.style.display = 'block';
} else {
  notLogged.style.display = 'none';
  logoutBtn.style.display = 'block';

  if (role === 'admin') {
    adminOptions.style.display = 'block';
  }

  if (role === 'astro') {
    astroOptions.style.display = 'block';
  }
}

logoutBtn?.addEventListener('click', () => {
  localStorage.clear();
  window.location.href = 'index.html';
});
