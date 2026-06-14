  import {
    createContext,
    useState,
    useEffect
  } from "react";
  import { auth } from "../firebase";
  import { onAuthStateChanged } from "firebase/auth";
  import {

  collection,

  onSnapshot

  }

  from "firebase/firestore";

  import {

  db

  }

  from "../firebase";

  export const AuthContext = createContext();

  function AuthProvider({ children }) {

    let unsubscribeTasks = null;

    const [user, setUser] = useState(null);

    const [role, setRole] =
    useState("user");

    const [tasks, setTasks] = useState([]);

    const [authLoading, setAuthLoading] =
    useState(true);

  const [loading, setLoading] =
    useState(false);

    const loadTasks = () => {

  setLoading(true);

  const unsubscribe =

  onSnapshot(

  collection(

  db,

  "tasks"

  ),

  (snapshot)=>{

  const data =

  snapshot.docs.map(

  (doc)=>({

  id:

  doc.id,

  ...doc.data()

  })

  );

  setTasks(data);

  setLoading(false);

  },

  (error)=>{

  console.error(error);

  setLoading(false);

  }

  );

  return unsubscribe;

  };

    useEffect(() => {

    const unsubscribe = onAuthStateChanged(

      auth,

      async (currentUser) => {

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

          unsubscribeTasks =

loadTasks();

        }

        else {

          setUser(null);

          setRole("user");

          setTasks([]);

        }

        setAuthLoading(false);

      }

    );

    return () => {

unsubscribe();

if (

unsubscribeTasks

) {

unsubscribeTasks();

}

};

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