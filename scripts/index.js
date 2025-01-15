document.addEventListener("DOMContentLoaded", () => {
  const editPopup = document.getElementById("editPopup");
  const editProfileButton = document.getElementById("editProfile");
  const profileName = document.querySelector(".profile__name");
  const profileParagraph = document.querySelector(".profile__paragraph");
  const nameInput = document.getElementById("nameInput");
  const aboutInput = document.getElementById("aboutInput");
  const addPopup = document.getElementById("addPopup");
  const closeEditPopupButton = document.getElementById("closeEditPopup");
  const saveProfileButton = document.getElementById("saveProfile");
  const addProfileButton = document.getElementById("addProfile");
  const closeAddPopupButton = document.getElementById("closeAddPopup");
  const cardNameInput = document.getElementById("cardNameInput");
  const cardImageInput = document.getElementById("cardImageInput");
  const cardsContainer = document.getElementById("cardsContainer");
  const addCardForm = document.getElementById("addCardForm");

  const imagePopup = document.getElementById("imagePopup");
  const bigImage = document.getElementById("bigImage");
  const closeImagePopupButton = document.getElementById("closeImagePopup");
  const imageTitle = document.getElementById("imageTitle");

  const initialCards = [
    { name: "Valle de Yosemite", link: "./images/yosemite-min.jpg" },
    { name: "Lago Louise", link: "./images/lago-louise-min.jpg" },
    { name: "Montañas Calvas", link: "./images/montañas-calvas-min.jpg" },
    { name: "Latemar", link: "./images/latemar-min.jpg" },
    {
      name: "Parque Nacional de Vanoise",
      link: "./images/vanois-national-min.jpg",
    },
    { name: "Lago di Braies", link: "./images/lago-di-braies-min.jpg" },
  ];

  closeImagePopupButton.addEventListener("click", () => {
    imagePopup.classList.remove("popup_opened");
    bigImage.src = "";
    bigImage.alt = "";
    imageTitle.textContent = "";
  });

  function handleImageClick(event) {
    const imgElement = event.target;
    if (imgElement.classList.contains("card__photo")) {
      const cardFooter = imgElement
        .closest(".card")
        .querySelector(".card__footer span");

      bigImage.src = imgElement.src;
      bigImage.alt = imgElement.alt;
      imageTitle.textContent = cardFooter.textContent;
      imagePopup.classList.add("popup_opened");
    }
  }

  cardsContainer.addEventListener("click", handleImageClick);

  function createCard(name, link) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <button class="delete-button">
        <img src="./images/icons8-delete.svg" alt="icon-delete" class="icon-delete" />
      </button>
      <img src="${link}" alt="${name}" class="card__photo" />
      <div class="card__footer">
        <span>${name}</span>
        <button class="like-button">&#9825;</button>
      </div>
    `;

    card.querySelector(".delete-button").addEventListener("click", () => {
      card.remove();
    });

    card.querySelector(".like-button").addEventListener("click", (event) => {
      const button = event.target;
      button.classList.toggle("liked");
      button.innerHTML = button.classList.contains("liked")
        ? "&#9829;" // Corazón lleno
        : "&#9825;"; // Corazón vacío
    });

    return card;
  }

  initialCards.forEach(({ name, link }) => {
    const card = createCard(name, link);
    cardsContainer.appendChild(card);
  });

  editProfileButton.addEventListener("click", () => {
    editPopup.classList.add("popup_opened");
    nameInput.value = profileName.textContent;
    aboutInput.value = profileParagraph.textContent;
  });

  closeEditPopupButton.addEventListener("click", () => {
    editPopup.classList.remove("popup_opened");
  });

  saveProfileButton.addEventListener("click", () => {
    const name = nameInput.value.trim() || "Nombre predeterminado";
    const about = aboutInput.value.trim() || "Descripción predeterminada";
    profileName.textContent = name;
    profileParagraph.textContent = about;
    editPopup.classList.remove("popup_opened");
  });

  addProfileButton.addEventListener("click", () => {
    addPopup.classList.add("popup_opened");
  });

  closeAddPopupButton.addEventListener("click", () => {
    addPopup.classList.remove("popup_opened");
  });

  addCardForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = cardNameInput.value.trim();
    const link = cardImageInput.value.trim();

    if (!name || !link) {
      alert("Por favor, llena todos los campos.");
      return;
    }

    if (name && link) {
      const card = createCard(name, link);
      cardsContainer.appendChild(card);
      addPopup.classList.remove("popup_opened");
      addCardForm.reset();
    }
  });
});
