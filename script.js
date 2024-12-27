document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const addProfileButton = document.getElementById("addProfile");
  const editProfileButton = document.getElementById("editProfile");
  const closePopupButton = document.getElementById("closePopup");
  const saveProfileButton = document.getElementById("saveProfile");
  const nameInput = document.getElementById("nameInput");
  const aboutInput = document.getElementById("aboutInput");

  editProfileButton.addEventListener("click", () => {
    popup.classList.add("popup_opened");
  });

  closePopupButton.addEventListener("click", () => {
    popup.classList.remove("popup_opened");
  });

  addProfileButton.addEventListener("click", () => {
    popup.classList.add("popup_opened");
  });

  saveProfileButton.addEventListener("click", () => {
    const name = nameInput.value;
    const about = aboutInput.value;

    if (name) {
      document.querySelector(".profile-info h2").textContent = name;
    }

    if (about) {
      document.querySelector("profile-info p").textContent = about;
    }

    popup.classList.remove("popup_opened");
  });

  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      popup.classList.remove("popup_opened");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const likeButtons = document.querySelectorAll(".like-button");

  likeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("liked")) {
        button.innerHTML = "&#9825;";
      } else {
        button.innerHTML = "&#9829;";
      }
      button.classList.toggle("liked");
    });
  });
});
