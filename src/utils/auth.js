import Cookies from "js-cookie";

export const logoutUser = () => {
  Cookies.remove("session");
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
  window.location.href = "/login";
};
