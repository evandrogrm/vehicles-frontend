import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api } from '../services/api';


interface LoginRequest {
  name: string;
  email: string;
}

type UserCredentials = {
  id: string;
  name: string;
  email: string;
  token: string;
}

type AuthContextData = {
  signIn(credentials: LoginRequest): Promise<void>;
  signOut(): Promise<void>;
  isAuthenticated: boolean;
  user: UserCredentials | null;
}

type AuthProviderProps = {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

const LOCALSTORAGE_LOGGEDUSE_ITEM = '@@Vehicles-Challenge@@:loggedUser';

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserCredentials | null>(null);
  const isAuthenticated = !!user;
  const history = useHistory();

  useEffect(() => {
    const loggedUserFromLocalStorage = localStorage.getItem(LOCALSTORAGE_LOGGEDUSE_ITEM);
    if (loggedUserFromLocalStorage) {
      setUser(JSON.parse(loggedUserFromLocalStorage));
    } else {
      signOut();
    }
  }, []);

  async function signIn({name, email}: LoginRequest): Promise<void> {
    try {
      const response = await api.post('/login', {
        name,
        email
      });

      const { id, token } = response.data;

      const loggedUser = {
        id,
        name,
        email,
        token,
      };

      localStorage.setItem(LOCALSTORAGE_LOGGEDUSE_ITEM, JSON.stringify(loggedUser));

      setUser(loggedUser)

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      history.push('/veiculos');
    } catch (error) {
      console.error(error);
      signOut();
    }
  }

  async function signOut(): Promise<void> {
    localStorage.removeItem(LOCALSTORAGE_LOGGEDUSE_ITEM);
    setUser(null);
    delete api.defaults.headers['Authorization'];
    history.push('/login');
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user: user || null }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
