// Page Switcher
function showPage(page) {
  // Hide all pages
  document.getElementById('dashboard-page').style.display = 'none';
  document.getElementById('catch-modal').style.display = 'none';
  document.getElementById('leaderboard-page').style.display = 'none';

  // Display the requested page
  if (page === 'dashboard') {
    document.getElementById('dashboard-page').style.display = 'block';
    loadDashboard();
  } else if (page === 'catch') {
    document.getElementById('catch-modal').style.display = 'block';
  } else if (page === 'leaderboard') {
    document.getElementById('leaderboard-page').style.display = 'block';
    loadLeaderboard();
  }
}

// Load Dashboard Info (mock)
function loadDashboard() {
  const tournamentName = localStorage.getItem('tournament-name') || 'Sample Tournament';
  const score = localStorage.getItem('score') || '0';
  
  document.getElementById('tournament-name').textContent = tournamentName;
  document.getElementById('score').textContent = score;
}

// Load Leaderboard (mock)
function loadLeaderboard() {
  const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
  const leaderboardTable = document.getElementById('leaderboard-table');
  leaderboardTable.innerHTML = ''; // Clear the existing table

  leaderboard.forEach((entry, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${entry.name}</td>
      <td>${entry.score}</td>
    `;
    leaderboardTable.appendChild(row);
  });
}

// Handle catch submission
document.getElementById('catch-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const fishSpecies = document.getElementById('fish-species').value;
  const fishWeight = document.getElementById('fish-weight').value;
  const fishLength = document.getElementById('fish-length').value;

  // Save the submitted catch data
  const currentScore = parseFloat(localStorage.getItem('score') || '0');
  const newScore = currentScore + parseFloat(fishWeight);

  // Store updated score and catch details
  localStorage.setItem('score', newScore.toString());

  // Optionally store the catch details (could be expanded further)
  let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
  leaderboard.push({ name: fishSpecies, score: newScore });
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

  alert('Catch submitted successfully!');
  showPage('dashboard');
});

// Open modal for catch submission
document.getElementById('submit-catch-btn').addEventListener('click', function() {
  showPage('catch');
});

// View Leaderboard
document.getElementById('view-leaderboard-btn').addEventListener('click', function() {
  showPage('leaderboard');
});

// Close the modal
document.getElementById('close-modal-btn').addEventListener('click', function() {
  s howPage('dashboard');
});

// Back to Dashboard from leaderboard
document.getElementById('back-to-dashboard-btn').addEventListener('click', function() {
  showPage('dashboard');
});

// Initial page load: Show Dashboard
showPage('dashboard');
