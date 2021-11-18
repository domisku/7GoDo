async function deleteList(enteredData) {
  const response = await fetch("/api/delete-list", {
    method: "DELETE",
    body: JSON.stringify(enteredData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.status;
}

export default deleteList;
