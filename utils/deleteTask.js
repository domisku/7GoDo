async function deleteTask(enteredData) {
    const response = await fetch('/api/delete-task', {
      method: 'DELETE',
      body: JSON.stringify(enteredData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    
    const data = await response.json();
  }

export default deleteTask;