import { jwtDecode } from 'jwt-decode'

const LOGIN_INFO_KEY = 'login_info'

export function saveLoginData(data: object) {
    localStorage.setItem(LOGIN_INFO_KEY, JSON.stringify(data))
}

export function deleteLoginData() {
    localStorage.removeItem(LOGIN_INFO_KEY)
}

export const checkLoginToken = () => {
    const login_info = localStorage.getItem(LOGIN_INFO_KEY)

    if (!login_info) {
        return false
    }

    const token  = JSON.parse(login_info).token
    if(token) {
        const decodedToken = jwtDecode(token)
        if (decodedToken.exp !== undefined) {
            if(Date.now() >= decodedToken.exp * 1000) {
                deleteLoginData()
                return false;
            }
            else
                return true;
        }
        deleteLoginData()
        return false;
    }
}