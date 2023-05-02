import { Outlet, useLoaderData, useNavigation, useSubmit } from 'react-router-dom';
import { getTokenDuration } from '../util/auth';

import MainNavigation from '../components/MainNavigation';
import { useEffect } from 'react';

function RootLayout() {
  // const navigation = useNavigation();

  // pobranie tokena i określenie czasu po jakim wygaśnie (zbieżnie z backend), zrobione tutaj bo RootLayout jest najwyżej w hierarchii (jako rodzić w routingu), useEffect zadziała jawsze jak zmieni się token (dependencies)
const token = useLoaderData();

const submit = useSubmit();
useEffect(()=>{
  if(!token){
    // jeśli nie ma już tokena nie ma nic do wykonania
    return
  }
  // sprawdzenie czy token wygasł, expired ustawiony w auth.js
  if(token==='EXPIRED'){
    submit(null, {action: '/logout', method: 'post'})
    return
  }
  // jeśli jest token i nie ma expired ustawiamy czas wygaśnięcia (po przeładowaniu strony czas się odnowi dlatego jest też zabezpieczenie wyżej)
  const tokenDuration = getTokenDuration();
  setTimeout(()=>{
    submit(null, {action: '/logout', method: 'post'})
  }, tokenDuration)
},[token, submit])



  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
