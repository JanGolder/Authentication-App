import { redirect } from "react-router-dom";

// funkcja która sprawdza, czy token już wygasł (porównuje aktualny czas z tym w chwili pobrania tokena)
export function getTokenDuration(){
  const storedExpirationDate = localStorage.getItem('expiration');
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

// funkcja do pobierania tokena z localStorage
export function getAuthToken() {
  const token = localStorage.getItem("token");
  if(!token){
    return null;
  }
  const tokenDuration = getTokenDuration();
  if(tokenDuration < 0){
    return 'EXPIRED';
  }
  return token;
}

export function tokenLoader(){
  return getAuthToken();
}

// funkcja, która zapobiega dostaniu się do formularza (edycji, add new) jeśli nie jesteśmy zalogowani tj. nie ma tokena (po ręcznym wpisaniu url)

export function checkAuthLoader(){
  const token = getAuthToken();
  if(!token){
    return redirect('/auth')
  }
  return null
}