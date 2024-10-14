const form = document.getElementById("contact-form");
const loading = document.getElementById("loading");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const modalClose = document.getElementById("modal-close");

// Function to show the modal with a message
function showModal(message) {
  modalMessage.textContent = message;
  modal.classList.remove("hidden");
}

// Function to hide the modal
function hideModal() {
  modal.classList.add("hidden");
  location.href = "index.html";
}

// Close modal when clicking the close button
modalClose.addEventListener("click", hideModal);

// Close modal when clicking outside the modal content
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    hideModal();
  }
});

// Close modal when pressing the Escape key
window.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    hideModal();
  }
});

// Submitting the form
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Show the loading animation
  loading.style.display = "flex";

  const formData = new FormData(form);

  fetch(form.action, {
    method: form.method,
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      loading.style.display = "none";
      if (response.ok) {
        showModal(
          "Sent! ThankS for the message, I will get back to you soon."
        );
        form.reset();
      } else {
        response.json().then((data) => {
          showModal(
            data.message || "Oops! There was a problem submitting your form."
          );
        });
      }
    })
    .catch((error) => {
      loading.style.display = "none";
      console.log(error.message);
      showModal(
        "Sorry! There is a problem. Please email me at mail@michael-godfrey.com instead."
      );
    });
});
