async function fetchGreeting() {
  const response = await fetch(
    'http://localhost:5000/graphql',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: 'query { greeting }',
      }),
    },
  );
  const body = await response.json();
  return body.data.greeting;
}

fetchGreeting().then((greeting) => {
  document.getElementById('greeting').textContent = greeting;
})