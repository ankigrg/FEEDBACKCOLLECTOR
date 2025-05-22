const apiUrl = 'http://localhost:5000/api/feedback';

const form = document.getElementById('feedbackForm');
const feedbackList = document.getElementById('feedbackList');

// Fetch and display feedback
async function loadFeedback() {
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    feedbackList.innerHTML = '';

    if (data.length === 0) {
      feedbackList.innerHTML = '<p>No feedback yet.</p>';
      return;
    }

    data.forEach(fb => {
      const div = document.createElement('div');
      div.className = 'feedback-item';
      div.innerHTML = `
        <strong>${escapeHtml(fb.userName)}</strong> — ${fb.rating}⭐
        <p>${escapeHtml(fb.feedbackText)}</p>
      `;
      feedbackList.appendChild(div);
    });
  } catch (err) {
    feedbackList.innerHTML = '<p>Failed to load feedback.</p>';
  }
}

// Handle form submit
form.addEventListener('submit', async e => {
  e.preventDefault();

  const userName = form.userName.value.trim();
  const rating = form.rating.value;
  const feedbackText = form.feedbackText.value.trim();

  if (!userName || !rating || !feedbackText) {
    alert('Please fill all fields');
    return;
  }

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName, rating: Number(rating), feedbackText }),
    });

    if (!res.ok) throw new Error('Network response was not ok');

    // Reset form
    form.reset();
    // Reload feedback list
    loadFeedback();
  } catch (err) {
    alert('Failed to submit feedback');
  }
});

// Basic HTML escaping to avoid XSS
function escapeHtml(text) {
  return text.replace(/[&<>"']/g, function(m) {
    return ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    })[m];
  });
}

// Load feedback on page load
loadFeedback();
