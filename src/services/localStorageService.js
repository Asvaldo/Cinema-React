// src/services/localStorageService.js

export const getFromLocalStorage = (key, defaultValue = []) => {
  const data = localStorage.getItem(key);
  try {
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error("Erro ao parsear dados do localStorage:", error);
    return defaultValue;
  }
};

export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Erro ao salvar dados no localStorage:", error);
  }
};
