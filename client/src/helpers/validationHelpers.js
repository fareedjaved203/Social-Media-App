export const validatePassword = (password) => {
  const hasNumber = /\d/;
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  const hasLowerCase = /[a-z]/;
  const hasUpperCase = /[A-Z]/;

  return (
    hasNumber.test(password) &&
    hasSpecialChar.test(password) &&
    hasLowerCase.test(password) &&
    hasUpperCase.test(password)
  );
};

export const validateEmail = (email) => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})$/;
  return emailRegex.test(email);
};

export const saveEmail = (email, setEmail, setEmailError) => {
  setEmail(email);
  if (!validateEmail(email)) {
    setEmailError("Email Must be in a Valid Format.");
  } else {
    setEmailError("");
  }
};

export const savePassword = (password, setPassword, setPasswordError) => {
  setPassword(password);
  if (!validatePassword(password)) {
    setPasswordError(
      "Password must contain at least one number, one special character, one lowercase letter, and one uppercase letter."
    );
  } else {
    setPasswordError("");
  }
};

export const saveName = (name, setName, showToast) => {
  setName(name);
  const isValid = /^[a-zA-Z\s]+$/.test(name);
  if (!isValid) {
    showToast("Name Cannot contain Numbers or Special Characters", "error");
  }
};

export const confirmDetails = (
  passwordError,
  emailError,
  saveUser,
  verifyUser,
  showToast,
  name,
  email,
  password,
  navigate
) => {
  if (passwordError === "" && emailError === "") {
    const data = saveUser(name, email, password, showToast);
    if (data) {
      verifyUser(email, password, navigate, showToast);
    }
  } else {
    showToast("Please Provide Correct Details", "error");
  }
};
