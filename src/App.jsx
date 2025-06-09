import { useState } from "react";
import { provider, auth, signInWithPopup, signOut } from "./firebase";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = async() => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (err) {
      // Remove console logs, need better logger (pino ??)
      console.error("Login failed", err);
    }
  }

  const handleLogout = async() => {
    await signOut(auth);
    setUser(null);
  }

  return(
  <div> 
    {
      user? (
        <div>
          <p>{user.displayName}</p>
          <button onClick={handleLogout}>Sign out</button>
        </div>
      ) : (
        <div>
          <button onClick={handleLogin}>Sign in</button>
        </div>
      )
    }
  </div>
  );
}

export default App;
