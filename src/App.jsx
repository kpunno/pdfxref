import { useState, useEffect, useRef } from "react";
import { provider, auth, signInWithPopup, signOut } from "./firebase";
import { getDocument } from "pdfjs-dist";
import "./App.css";

function App() {
  //#region variables
  const [user, setUser] = useState(null);
  //#endregion

  //#region functions
  // auth
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (err) {
      // Remove console logs, need better logger (pino ??)
      console.error("Login failed", err);
    }
  };
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  //pdf
  // ... <object></object>
  
  //#endregion

  //#region jsx
  return (
    <div>
      {user ? (
        <div>
          <p>{user.displayName}</p>
          <button onClick={handleLogout}>Sign out</button>
        </div>
      ) : (
        <div>
          <button onClick={handleLogin}>Sign in</button>
        </div>
      )}
    </div>
  );
  //#endregion
}

export default App;
