import { showToast } from "./showToast";

import "react-toastify/dist/ReactToastify.css";

export function verifyUser(email, password, navigate) {
  let isUser = false;
  let id = "";
  let name = "";
  let userEmail = "";
  let allUsers = JSON.parse(localStorage.getItem("users"));
  if (allUsers) {
    const data = Object.entries(allUsers);
    console.log(email);
    data.forEach((value) => {
      if (value[0] === email && value[1].password === password) {
        id = value[1].userId;
        name = value[1].name;
        userEmail = value[0];
        value[1].isActive = true;
        isUser = true;
      }
    });
    allUsers = Object.fromEntries(data);
    localStorage.setItem("users", JSON.stringify(allUsers));
  }

  if (isUser) {
    localStorage.setItem("userId", JSON.stringify(id));
    localStorage.setItem("userName", JSON.stringify(name));
    localStorage.setItem("userEmail", JSON.stringify(userEmail));
    localStorage.setItem("active", JSON.stringify(true));
    navigate("/", { replace: true });
    return true;
  } else {
    showToast("Incorrect Email/Password", "error");
  }
  return false;
}

export function saveUser(name, email, password) {
  try {
    let isUser = true;
    const oldUsers = JSON.parse(localStorage.getItem("users"));
    if (name !== "" && email !== "" && password !== "") {
      //users exist before
      if (oldUsers) {
        const verify = Object.keys(oldUsers);
        verify.forEach((value) => {
          if (value === email) {
            isUser = false;
          }
        });
      }
      if (isUser) {
        let allUsers = {};
        const user = {
          [email]: {
            userId: Date.now(),
            name,
            password,
            isActive: false,
          },
        };
        if (oldUsers) {
          allUsers = { ...oldUsers, ...user };
        } else {
          allUsers = { ...user };
        }
        localStorage.setItem("users", JSON.stringify(allUsers));
        return true;
      } else if (!isUser) {
        showToast("Email Already Exists", "error");
      } else {
        showToast("Please Provide Correct Details", "error");
      }
    } else {
      showToast("Please Provide Correct Details", "error");
    }
  } catch (error) {
    showToast("Please Provide Correct Details", "error");
  }
  return false;
}
