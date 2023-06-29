import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import firebaseApp from "./config/firebase-config";
import { useEffect, useState } from "react";
import ToDo from "./ToDo";
firebase.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

function App() {
  let [auth, setAuth] = useState(
    false || localStorage.getItem("auth") === "true"
  );
  let [isRegistering, setIsRegistering] = useState(null);
  const [token, setToken] = useState("");
  useEffect(() => {
    firebase.auth().onAuthStateChanged((userCred) => {
      console.log(userCred);
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");
        userCred.getIdToken().then((tokenId) => {
          setToken(tokenId);
        });
      }
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

          <ToDo token={token} />
          <button onClick={logOut}>LogOut</button>
        </div>
      ) : (
        <div>
          <h1>{isRegistering ? "Registrate" : "Inicia Sesion"}</h1>
          <form>
            <label>direccion de Email</label>
            <input type="email" name="email" placeholder="example@gmail.com" />
            <label>contraseña</label>
            <input
              name="password"
              placeholder="Contrasena532!@"
              type="password"
            />

            <button>{isRegistering ? "Registrate" : " Ininia Sesion"}</button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsRegistering(!isRegistering);
              }}
            >
              {isRegistering
                ? "Ya tienes cuenta? Inicia sesion"
                : "No tienes Cuenta? Registrate"}
            </button>

            <button onClick={loginWithGoogle}>Iniciar sesión con Google</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
