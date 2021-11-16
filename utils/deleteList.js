async function deleteList(enteredData) {
    const response = await fetch('/api/delete-list', {
      method: 'DELETE',
      body: JSON.stringify(enteredData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    
    const data = await response.json();
  }

export default deleteList;