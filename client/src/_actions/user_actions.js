import axios from "axios";
import { 
        LOGIN_USER,
        REGISTER_USER,
        AUTH_USER
} from './types';

export function loginUser(dataTosubmit){
    const url = "/api/users/login"
    const request = axios.post(url, dataTosubmit)
         .then(response => response.data)

         return {
            type : LOGIN_USER,
            payload : request
         }
}

export function registerUser(dataTosubmit){
    const url = '/api/users/register'
    const request = axios.post(url, dataTosubmit)
        .then(response => response.data)

        return {
            type : REGISTER_USER,
            payload : request
        }
}

export function auth(){
    const url = '/api/users/auth';
    const request = axios.get(url)
            .then(response => response.data)

            return {
                type : AUTH_USER,
                payload : request
            }
}