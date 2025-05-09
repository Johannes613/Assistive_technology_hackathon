import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export const GlobalContext = createContext(null);

const GlobalStateProvider = ({children})=>{
    const [currentUser,setCurrentUser] = useState(null);

    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (user) => {
          if (user) {
            setCurrentUser(user.uid);
            console.log("User Logged In");
          } else {
            setCurrentUser(null);
          }
        });
    
        return () => unSub();
      }, []);
    return(
        <GlobalContext.Provider
        value = {{
            currentUser,
            setCurrentUser
        }}
        >
            {children}
        </GlobalContext.Provider>
    )
}
export default GlobalStateProvider;