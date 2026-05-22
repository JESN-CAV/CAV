document.addEventListener('DOMContentLoaded', async () => {

  try {

    const response = await fetch('./version.json', {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('version.json introuvable');
    }

    const data = await response.json();

    const versionElement = document.getElementById('version');

    if (versionElement) {
      //versionElement.textContent = data.sha;
      const d = new Date(data.when);
      const dt = d.toString();

      alert(dt);
      versionElement.textContent =data.sha +" — "+ dt;
    }

  } catch (error) {

    console.error('Erreur chargement version :', error);

    const versionElement = document.getElementById('version');

    if (versionElement) {
      versionElement.textContent = 'dev';
    }
  }

});