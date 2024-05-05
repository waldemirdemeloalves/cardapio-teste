var btn = document.getElementById('openModalFuncionamentoBtn');
  var modal = document.getElementById('myModalFuncionamento');
  var days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  var today = new Date().getDay();

  btn.textContent = getOpeningText();

  btn.addEventListener('click', function() {
    modal.style.display = 'block';
  });

  document.getElementsByClassName('close-funcionamento')[0].addEventListener('click', function() {
    modal.style.display = 'none';
  });

  window.addEventListener('click', function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });

  var horariosFuncionamento = document.getElementById('horariosFuncionamento');

  for (var i = 0; i < days.length; i++) {
    var day = days[i];
    var openingHours;
    var style = '';

    if (i === 1) {
      openingHours = day + ': Fechado';
      if (i === today) {
        style = 'color: red;';
      }
    } else if (i === today) {
      openingHours = '<strong>' + day + '</strong>: das 16h às 23h59';
    } else {
      openingHours = day + ': das 16h às 23h59';
    }

    var para = document.createElement('p');
    para.style.cssText = style;
    para.innerHTML = openingHours;
    horariosFuncionamento.appendChild(para);
  }

  function getOpeningText() {
    if (today === 0) { // Domingo
      return 'Hoje (Domingo) das 16h às 23h59';
    } else if (today === 1) { // Segunda
      return 'Fechado hoje (Segunda-feira)';
    } else { // Terça a Sábado
      return 'Hoje (' + days[today] + ') das 16h às 23h59';
    }
  }