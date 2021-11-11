import { User } from "interfaces/User";

const STORAGE_AUTH_TOKEN_KEY = "auth_token";
const STORAGE_USER_KEY = "user_info";

export const saveAuthToken = (authToken: string) => {
  window.localStorage.setItem(STORAGE_AUTH_TOKEN_KEY, authToken);
};

export const removeAuthToken = () => {
  window.localStorage.removeItem(STORAGE_AUTH_TOKEN_KEY);
};

export const isLoggedIn = () => {
  return Boolean(window.localStorage.getItem(STORAGE_AUTH_TOKEN_KEY));
};

export const getAuthTokenFromStorage = () => {
  return window.localStorage.getItem(STORAGE_AUTH_TOKEN_KEY);
};

export const getUser = () => {
  const userData = window.localStorage.getItem(STORAGE_USER_KEY);
  try {
    if (userData) {
      const user = JSON.parse(userData) as User;
      return user;
    }

    return null;
  } catch (e) {
    return null;
  }
};

export const saveUser = (user: User | null) => {
  if (!user) {
    window.localStorage.removeItem(STORAGE_USER_KEY);
    return;
  }

  window.localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
};
