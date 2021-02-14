export function setAccessToken(accessToken) {
  localStorage.setItem('token', accessToken);
}

export function setUserRole(userRole) {
  localStorage.setItem('userRole', userRole);
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
