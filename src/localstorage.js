export function setAccessToken(accessToken) {
  localStorage.setItem('token', accessToken);
}

export function setUserRole(userRole) {
  localStorage.setItem('userRole', userRole);
}

export function setUserName(name) {
  localStorage.setItem('name', name);
}

export function getUserName() {
  return localStorage.getItem('name');
}

/** Get saved user token */
export function getAccessToken() {
  return localStorage.getItem('token');
}

export function getUserRole() {
  return localStorage.getItem('userRole');
}

/** Clear user token */
export function clearAccessToken() {
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
}

export function isUserLoggedIn() {
  const idToken = getAccessToken();
  return !!idToken;
}
