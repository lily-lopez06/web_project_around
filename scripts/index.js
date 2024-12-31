document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const addProfileButton = document.getElementById("addProfile");
  const editProfileButton = document.getElementById("editProfile");
  const closePopupButton = document.getElementById("closePopup");
  const saveProfileButton = document.getElementById("saveProfile");
  const nameInput = document.getElementById("nameInput");
  const aboutInput = document.getElementById("aboutInput");
  const profileName = document.querySelector(".profile__name");
  const profileParagraph = document.querySelector(".profile__paragraph");
  const likeButtons = document.querySelectorAll(".like-button");

  editProfileButton.addEventListener("click", () => {
    popup.classList.add("popup_opened");
    nameInput.value = profileName.textContent;
    aboutInput.value = profileParagraph.textContent;
    popup.style.display = "block";
  });

  closePopupButton.addEventListener("click", () => {
    popup.style.display = "none";
  });

  addProfileButton.addEventListener("click", () => {
    popup.style.display = "block";
  });

  saveProfileButton.addEventListener("click", () => {
    const name = nameInput.value;
    const about = aboutInput.value;
    profileName.textContent = nameInput.value || "Nombre predeterminado";
    profileParagraph.textContent =
      aboutInput.value || "Descripción predeterminada";

    popup.style.display = "none";

    if (name) {
      document.querySelector(".profile__name").textContent = name;
    }

    if (about) {
      document.querySelector(".profile__paragraph").textContent = about;
    }

    popup.style.display = "none";
  });

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
