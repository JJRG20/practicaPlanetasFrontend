document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const res = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (!res.ok) {
    document.getElementById('error').innerText = data.error;
    return;
  }

  localStorage.setItem('token', data.token);
  localStorage.setItem('role', data.user.role);
  localStorage.setItem('username', data.user.username);


  window.location.href = 'index.html';
});
