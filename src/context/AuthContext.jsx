import {
  createContext,
  useState,
  useEffect
} from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getTasks } from "../api/taskApi";

export const AuthContext = createContext();

function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const [role, setRole] =
  useState("user");

  const [tasks, setTasks] = useState([]);

  const [authLoading, setAuthLoading] =
  useState(true);

const [loading, setLoading] =
  useState(false);

  const loadTasks = async () => {

    try {

      setLoading(true);

      const response =
        await getTasks();

      setTasks(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

  loadTasks();

  const unsubscribe = onAuthStateChanged(
    auth,
    (currentUser) => {

      console.log(
  "Firebase User:",
  currentUser
);

      if (currentUser) {

  setUser(
    currentUser.email
  );

  if (

    currentUser.email ===
    "amoghak2004@gmail.com"

  ) {

    setRole("admin");

  }

  else {

    setRole("user");

  }

}

else {

  setUser(null);

  setRole("user");

}

      setAuthLoading(false);

    }
  );

  return () => unsubscribe();

}, []);

  return (
    <AuthContext.Provider
      value={{

user,
setUser,

role,
setRole,

tasks,
setTasks,

loading,
setLoading,

authLoading,

loadTasks

}}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;