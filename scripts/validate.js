export function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach((form) => {
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const submitButton = form.querySelector(config.submitButtonSelector);

    setEventListeners(form, inputs, submitButton, config);
  });
}

function setEventListeners(form, inputs, submitButton, config) {
  toggleButtonState(inputs, submitButton, config.inactiveButtonClass);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(input, config);
      toggleButtonState(inputs, submitButton, config.inactiveButtonClass);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });
}

function checkInputValidity(input, config) {
  const errorElement = input.nextElementSibling;
  const lineElement = errorElement.nextElementSibling;

  if (!input.validity.valid) {
    showInputError(
      input,
      errorElement,
      lineElement,
      input.validationMessage,
      config
    );
  } else {
    hideInputError(input, errorElement, lineElement, config);
  }
}

function showInputError(
  input,
  errorElement,
  lineElement,
  errorMessage,
  config
) {
  input.classList.add(config.inputErrorClass);
  if (errorElement) {
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  }
  if (lineElement) {
    lineElement.classList.add("line_invalid");
    lineElement.classList.remove("line_valid");
  }
}

function hideInputError(input, errorElement, lineElement, config) {
  input.classList.remove(config.inputErrorClass);
  if (errorElement) {
    errorElement.textContent = "";
    errorElement.classList.remove(config.errorClass);
  }
  if (lineElement) {
    lineElement.classList.remove("line_invalid");
    lineElement.classList.add("line_valid");
  }
}

function toggleButtonState(inputs, submitButton, inactiveButtonClass) {
  if (hasInvalidInput(inputs)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
}

function hasInvalidInput(inputs) {
  return inputs.some((input) => !input.validity.valid);
}
