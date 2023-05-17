// set values into local storage
export const setLocalStorage =  async (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};


// access the values from local storage
export const getLocalStorage = async (key) => {
  return await localStorage.getItem(key);
};


// delete value from the localStorage
export const deleteLocalStorageItem = (key)=> {
  return localStorage.removeItem(key);
}