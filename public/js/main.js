/*
  Source: JavaScript Fetch API
  https://www.w3schools.com/js/js_api_fetch.asp
  https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
*/

document.getElementById('searchBtn').addEventListener('click', async () => {
  const userName = document.getElementById('userName').value.trim();
  const resultEl = document.getElementById('result');

  // clear previous result
  resultEl.textContent = '';
  resultEl.className = '';

  if (!userName) {
    resultEl.textContent = 'Please enter a name.';
    resultEl.classList.add('error');
    return;
  }

  try {
    const response = await fetch('/api/get-name', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName })
    });

    const data = await response.json();

    if (!response.ok) {
      resultEl.textContent = data.error || 'Something went wrong.';
      resultEl.classList.add('error');
      return;
    }

    resultEl.textContent = `${data.name} ${data.emoji}`;
    resultEl.classList.add('success');
  } catch (err) {
    resultEl.textContent = 'Could not reach the server.';
    resultEl.classList.add('error');
  }
});
