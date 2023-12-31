import axios from "axios";
const setAuthToken = (token) => {
  if (token) {
    console.log("authorized", token);
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common["Authorization"] = token;
    // console.log("authorized", token);
    const authorizedToken = axios.defaults.headers.common["Authorization"];
    console.log("authorizedToken", authorizedToken);
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};
export default setAuthToken;
