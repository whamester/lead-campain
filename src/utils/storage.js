const auth_item = "auth";
const token_item = "token";
const refresh_item = "refresh";

export const initSession = (data, jwtToken, refreshToken) => {
  localStorage.setItem(auth_item, JSON.stringify(data));
  localStorage.setItem(token_item, JSON.stringify(jwtToken));
  localStorage.setItem(refresh_item, JSON.stringify(refreshToken));
};

export const removeSession = () => {
  localStorage.removeItem(auth_item);
  localStorage.removeItem(token_item);
  localStorage.removeItem(refresh_item);
};

export const getAuthData = () => {
  return localStorage.getItem(auth_item);
};

export const getAuthToken = () => {
  return localStorage.getItem(token_item);
};

export const getAuthRefresh = () => {
  return localStorage.getItem(refresh_item);
};
