function openModal() {
    document.getElementById("emailModal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("emailModal").classList.add("hidden");
}

// Close modal when clicking outside
document
    .getElementById("emailModal")
    .addEventListener("click", function (e) {
    if (e.target === this) {
        closeModal();
    }
    });
