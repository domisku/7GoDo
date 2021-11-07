async function taskToDatabase(enteredData) {
    const response = await fetch('/api/new-task', {
      method: 'POST',
      body: JSON.stringify(enteredData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
  }

export default taskToDatabase;
