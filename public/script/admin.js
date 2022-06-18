const deleteButtons = document.querySelectorAll("#deleteBtn");

const deleteProduct = async (event) => {
  const id = event.target.dataset.id;
  const csrfToken = event.target.dataset.csrftoken;
  fetch(`/admin/product/${id}/delete?_csrf=${csrfToken}`, {
    method: "delete",
  }).then(() => {});
  event.target.parentElement.parentElement.parentElement.remove();
};

for (const deleteButton of deleteButtons) {
  deleteButton.addEventListener("click", deleteProduct);
}
