const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const eyeicon = document.getElementById("eye-open1");
const eyeicon2 = document.getElementById("eye-open2");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validateInputs()) {
    form.submit();
  }
});

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;

  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateInputs = () => {
  let flag = true;
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();

  if (usernameValue === "") {
    setError(username, "Username is required");
    flag = false;
  } else if (usernameValue.length < 3) {
    setError(username, "User name must be at least 3 character.");
    flag = false;
  } else {
    setSuccess(username);
  }

  if (emailValue === "") {
    setError(email, "Email is required");
    flag = false;
  } else {
    setSuccess(email);
  }

  if (emailValue === "") {
    setError(email, "Email is required");
    flag = false;
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Provide a valid email address");
    flag = false;
  } else {
    setSuccess(email);
  }

  if (passwordValue === "") {
    setError(password, "Password is required");
    flag = false;
  } else if (passwordValue.length < 8) {
    setError(password, "Password must be at least 8 character.");
    flag = false;
  } else {
    setSuccess(password);
  }

  if (confirmPasswordValue === "") {
    setError(confirmPassword, "Please confirm your password");
    flag = false;
  } else if (passwordValue !== confirmPasswordValue) {
    setError(confirmPassword, "Password doesn't match");
    flag = false;
  } else {
    setSuccess(confirmPassword);
  }

  return flag;
};

eyeicon.onclick = () => {
  eyeicon.classList.toggle("fa-eye");
  eyeicon.classList.toggle("fa-eye-slash");
  if (password.type == "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
};

eyeicon2.onclick = () => {
  eyeicon2.classList.toggle("fa-eye");
  eyeicon2.classList.toggle("fa-eye-slash");
  if (confirmPassword.type == "password") {
    confirmPassword.type = "text";
  } else {
    confirmPassword.type = "password";
  }
};
