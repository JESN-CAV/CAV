async function loadVersion() {
  try {
    const response = await fetch('./version.json', {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('version.json introuvable');
    }

    const data = await response.json();

    document.getElementById('version').textContent = data.sha;

  } catch (error) {
    console.error('Erreur version :', error);

    document.getElementById('version').textContent = 'dev';
  }
}

loadVersion();