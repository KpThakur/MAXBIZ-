import { GLOBAL_URL } from "./constants";
import axios from "axios";
/* import configureStore from "app/Redux/Store";
import AsyncStorage from "@react-native-async-storage/async-storage"; */

const httpClient = axios.create({
  baseURL: `${GLOBAL_URL}/api/`,
});

export function setDefaultHeader(header, value) {
  console.log("🚀 ~ file: httpClient.js:11 ~ setDefaultHeader ~ value:", value)
  //httpClient.defaults.headers.common[header] = value;
  httpClient.defaults.headers.common = {'Authorization': `Bearer ${value}`}
}


export async function apiCall(
  method,
  url,
  data,
  header = { "Content-Type": "application/json", "access-control-allow-origin": "*" }
) {
  console.log("🚀 ~ file: httpClient.js:22 ~ url:", url)
 /*  const { response } = configureStore().store.getState().login;
  const generatedToken = await AsyncStorage.getItem("token");
  let headers = {
    ...header,
    "token": response?.token ? response?.token : generatedToken
  } */
  try {
    const response = await httpClient({
      method,
      url,
      data,
      headers: header,
      // withCredentials: false,
    });
    if (response.status === 200) {
      return response;
    }
    if (response.status === 201) {
      return response;
    }
    if (response.status === 202) {
      return response;
    }
  } catch (error) {
     console.log('errordsfdfdfs: ', error);
    if (error.response) {
      if (error.response.status === 401) {
        // console.log(`${url}: `, error.response);
        return error.response;
      }
      return error.response;
    } else if (error.request) {
      // console.log("Error request 1: ", error.request);
      return error.response;
    } else {
      // console.log("Error message 2: ", error.message);
    }
    // return error;
    return error.response;
  }
}





