document.addEventListener('DOMContentLoaded', function() {
    const popupOverlay = document.getElementById('popupOverlay');
    const closeButton = document.getElementById('closeButton');

    closeButton.addEventListener('click', function() {
      popupOverlay.style.display = 'none';
    });
  });