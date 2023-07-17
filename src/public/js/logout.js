const logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  fetch('/api/sessions/logout', {
    method: 'POST',
  })
    .then(response => {
      if (response) return window.location.replace('/login')
    })
    .catch(error => {
      console.error('Error:', error);
    });
});