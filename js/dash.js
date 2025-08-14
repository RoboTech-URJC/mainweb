document.addEventListener('DOMContentLoaded', function() {
  const squares = document.querySelectorAll('.parent div');

  squares.forEach(square => {
    square.addEventListener('click', function() {
      const altText = this.querySelector('img') ? this.querySelector('img').alt : this.textContent.trim();
      if (altText === 'Conocenos más') {
        window.location.href = 'index.html';
      } else if (altText === 'Proyectos Activos') {
        window.location.href = 'proyectos_activos.html';
      } else if (altText === 'Inscríbete a la asociación' ) {
        window.location.href = 'https://forms.office.com/e/RJq49xfKkt';
      } else if (altText === 'idea') {
        window.location.href = 'https://forms.office.com/e/LfYXEyiR99';
      } else if (altText === 'Robot Scara') {
        openPopup('popupScara');
      } else if (altText === 'Proyecto Zeus') {
        openPopup('popupZeus');
      } else if (altText === 'Hirobot') {
        openPopup('popupHiroBot');
      } else if (altText === 'Hormiga') {
        openPopup('popupHormiga');
      } else if (altText === 'Drone') {
        openPopup('popupDrone');
      } else if (altText === 'Robotech Led Race') {
        openPopup('popupLedRace');
      } else if (altText === 'Contáctanos') {
        openPopup('popupContact');
      } else {
        alert(`You clicked on square ${altText}`);
      }
    });
  });
});

function openPopup(popupId) {
  document.getElementById(popupId).style.display = 'block';
}

function closePopup(popupId) {
  document.getElementById(popupId).style.display = 'none';
}
