// funkcja do pobierania tokena z localStorage

export function getAuthToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function tokenLoader(){
  return getAuthToken();
}
