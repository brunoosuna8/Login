import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import firebaseConfig from "./config/firebase-config";
import { useEffect, useState } from "react";
firebase.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

function App() {
  let [auth, setAuth] = useState(
    false || localStorage.getItem("auth") === "true"
  );
  const [token, setToken] = useState("");
  useEffect(() => {
    firebase.auth().onAuthStateChanged((userCred) => {
      console.log(userCred);
      if (userCred) setAuth(true);
      window.localStorage.setItem("auth", "true");
      userCred.getIdToken().then((token) => {
        setToken(token);
      });
    });
  }, []);
  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((userCred) => {
        console.log(userCred);
        if (userCred) setAuth(true);
        window.localStorage.setItem("auth", "true");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setAuth(false);
        window.localStorage.clear();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      {auth ? (
        <div>
          <h1>ToDos</h1>
          <button onClick={logOut}>LogOut</button>
        </div>
      ) : (
        <button onClick={loginWithGoogle}>Iniciar sesión con Google</button>
      )}
    </div>
  );
}

export default App;
