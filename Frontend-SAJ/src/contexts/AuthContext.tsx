import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';
import type { AuthRequest, AuthResponse } from '../types';

interface AuthContextType {
  token: string | null;
  userId: string | null;
  fullName: string | null;
  username: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = 'http://localhost:8081/api';
const TOKEN_KEY = 'saj_jwt_token';
const USER_ID_KEY = 'saj_user_id';
const USER_FULLNAME_KEY = 'saj_user_fullname';
const USER_USERNAME_KEY = 'saj_user_username';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar dados do localStorage ao iniciar
  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUserId = localStorage.getItem(USER_ID_KEY);
    const storedFullName = localStorage.getItem(USER_FULLNAME_KEY);
    const storedUsername = localStorage.getItem(USER_USERNAME_KEY);

    if (storedToken) {
      setToken(storedToken);
      setUserId(storedUserId);
      setFullName(storedFullName);
      setUsername(storedUsername);
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<void> => {
    try {
      const requestData: AuthRequest = { username, password };

      const response = await axios.post<AuthResponse>(
        `${API_BASE_URL}/auth/login`,
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { token: newToken, userId: newUserId, fullName: newFullName, username: newUsername } = response.data;

      // Armazenar dados do usuário
      localStorage.setItem(TOKEN_KEY, newToken);
      localStorage.setItem(USER_ID_KEY, newUserId);
      localStorage.setItem(USER_FULLNAME_KEY, newFullName);
      localStorage.setItem(USER_USERNAME_KEY, newUsername);

      setToken(newToken);
      setUserId(newUserId);
      setFullName(newFullName);
      setUsername(newUsername);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error('Usuário ou senha inválidos');
        }
        throw new Error(error.response?.data || 'Erro ao fazer login');
      }
      throw new Error('Erro inesperado durante a autenticação');
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(USER_FULLNAME_KEY);
    localStorage.removeItem(USER_USERNAME_KEY);
    setToken(null);
    setUserId(null);
    setFullName(null);
    setUsername(null);
  };

  const value: AuthContextType = {
    token,
    userId,
    fullName,
    username,
    isAuthenticated: !!token,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
