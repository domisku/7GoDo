async function updateTask(enteredData) {
    const response = await fetch('/api/update-task', {
      method: 'PATCH',
      body: JSON.stringify(enteredData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
  }

export default updateTask;