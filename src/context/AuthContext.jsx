import {
  createContext,
  useState,
  useEffect
} from "react";

import { getTasks } from "../api/taskApi";

export const AuthContext = createContext();

function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] =
    useState(true);

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

  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        tasks,
        setTasks,
        loading,
        setLoading,
        loadTasks
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;