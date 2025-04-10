function openModal() {
  const modal = document.getElementById("emailModal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeModal() {
  const modal = document.getElementById("emailModal");
  modal.classList.remove("flex");
  modal.classList.add("hidden");
}

// Close modal when clicking outside
document.getElementById("emailModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeModal();
  }
});
