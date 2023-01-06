export default function authHeader() {
  const userStr = localStorage.getItem("user");
  let user = null;
  if (userStr)
    user = JSON.parse(userStr);

  if (user && user.accessToken) {
    //return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
    return { 'x-access-token': user.accessToken, 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" };       // for Node.js Express back-end
  } else {

    //return { Authorization: '' }; // for Spring Boot back-end
    return { 'x-access-token': null, 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" }; // for Node Express back-end
  }
}