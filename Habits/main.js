document.getElementById('add-habit-button').addEventListener('click', function() {
  // Hente verdien fra input-feltet
  let habitInput = document.getElementById('new-habit-input');
  let habitText = habitInput.value;

  // Enkel sjekk for å se om vi har noen verdi
  if(!habitText) return

  // Opprett et nytt <li>-element for vanen
  let newHabit = document.createElement('li');
  newHabit.textContent = habitText + ' - Streak: 0';

  // Append det nye vanen til habit-list
  document.getElementById('habit-list').appendChild(newHabit);

  // Tøm input-feltet
  habitInput.value = '';
});

document.getElementById('habit-list').addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
      // Hente ut tekstinnholdet og splitte det for å få streak-nummeret
      let habitText = event.target.textContent;
      let parts = habitText.split(' - Streak: ');
      // Gjør om til tallverdi
      let streak = parseInt(parts[1]) + 1;

      // Oppdatere tekstinnholdet med ny streak
      event.target.textContent = parts[0] + ' - Streak: ' + streak;
  }
});