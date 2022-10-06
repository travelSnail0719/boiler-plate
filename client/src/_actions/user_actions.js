import axios from "axios";
import {
    LOGIN_USER
} from './types';

export function loginUser(dataTosubmit){
    let url = "/api/users/login"
    const request = axios.post(url, dataTosubmit)
         .then(response => response.data)

         return {
            type : LOGIN_USER,
            payload : request
         }
}