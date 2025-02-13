import { useRef, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";


declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
  }
}

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

initializeApp(firebaseConfig);

const auth = getAuth();
auth.languageCode = 'ko';

function Phone() {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [authCode, setAuthCode] = useState<string>('');
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
  }, []);

  const handleChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  }

  const handleChangeAuthCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthCode(e.target.value);
  }

  const handlePhoneAuth = async () => {
    const recaptchaCerifier = buttonRef.current;

    if (!recaptchaCerifier) return;

    const appVerifier = new RecaptchaVerifier(auth, recaptchaCerifier, {
      'size': 'invisible',
      'callback': () => {
        //
      }
    });

    signInWithPhoneNumber(auth, `+82${phoneNumber}`, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      }).catch((error) => {
        console.log(error);
      });
  }

  const handleAuthCode = () => {
    window.confirmationResult.confirm(authCode)
      .then((result: any) => {
        console.log(result);
      }).catch((error: any) => {
        console.log(error);
      });
  }

  return (
    <div>
      <Helmet>
        <title>전화번호 인증 페이지 | Phone Auth</title>
        <meta name="description" content="전화번호 인증 페이지입니다." />
      </Helmet>
      <input onChange={handleChangePhoneNumber}></input>
      <button ref={buttonRef} onClick={handlePhoneAuth}>인증번호 전송</button>
      <input onChange={handleChangeAuthCode}></input>
      <button onClick={handleAuthCode}>코드 인증</button>
    </div>
  );
}

export default Phone;


