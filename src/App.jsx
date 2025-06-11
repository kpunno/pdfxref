import { useState } from "react";
import { provider, auth, signInWithPopup, signOut } from "./firebase";
import "./App.css";
import PDF from "../components/pdf"

function App() {
  //#region variables
  const [user, setUser] = useState(null);
  const [url, seturl] = useState(null);
  //#endregion

  //#region functions
  // auth
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (err) {
      // TODO: Remove console logs, need better logger (pino ??)
      console.error("Login failed", err);
    }
  };
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  //pdf
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type == "application/pdf") {
      const url = URL.createObjectURL(file);
      seturl(url);
    }
  };
  // ... <object></object>

  //#endregion

  //#region jsx
  return (
    <div>
      {user ? (
        <>
          <p>{user.displayName}</p>
          <button onClick={handleLogout}>Sign out</button>
        </>
      ) : (
        <button onClick={handleLogin}>Sign in</button>
      )}
      <p>Drop your file below</p>
      <input type="file" onChange={handleFileUpload}></input>

      {url && (
        
        <PDF url={url}/>
      )}
    </div>
    
  );
  //#endregion
}

export default App;
