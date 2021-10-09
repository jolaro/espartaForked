const STORAGE_AUTH_TOKEN_KEY = "token";

export const saveAuthToken = (authToken: string) => {
  window.localStorage.setItem(STORAGE_AUTH_TOKEN_KEY, authToken);
};

export const isLoggedIn = () => {
  return Boolean(window.localStorage.getItem(STORAGE_AUTH_TOKEN_KEY));
};

export const getAuthTokenFromStorage = () => {
  return window.localStorage.getItem(STORAGE_AUTH_TOKEN_KEY);
};
