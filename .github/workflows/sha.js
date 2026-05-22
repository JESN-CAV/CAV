fetch('version.json')
  .then(response => response.json())
  .then(data => {
    document.getElementById('version').textContent = data.sha;
  });