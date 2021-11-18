async function listToDatabase(enteredData) {
  const response = await fetch("/api/new-list", {
    method: "POST",
    body: JSON.stringify(enteredData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.status;
}

export default listToDatabase;
