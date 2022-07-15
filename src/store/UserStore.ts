import { writable } from "svelte/store";
import { BASE_API_URL } from "../utils/variables";
import { localStorageGet, localStorageRemove, localStorageSet } from "../utils/browserData";

interface AuthStore {
  token: string | null
  email: string
  id: number | null
  roles: []
  username: string
  isAuth: boolean

}

interface AuthResponse extends AuthStore {
  error?: boolean
  message?: string
}


interface LoginCredentials {
  email: string
  password: string
}

interface RegisterCredentials {
  email: string
  password: string
  username: string
}


export const authStore = writable<AuthStore>({
  token: localStorageGet('token') || null,
  email: '',
  id: null,
  roles: [],
  username: '',
  isAuth: false,
})

export const loadingAuth = writable<boolean>(true)

export const fetchUserData = async (token: string, fetch?: any) => {

  const formData = new FormData()
  formData.append('token', token)
  loadingAuth.set(true)

  try {
    const user = await fetch(
      `${BASE_API_URL}auth/check-auth`,{
      method: 'POST',
      body: formData,
      }
    );
    const userData = await user.json()

    authStore.set({
      ...userData,
      isAuth: true
    })

  } catch (e) {
    console.log(e);
    authStore.update((state) => {
      return {
        ...state,
        isAuth: false
      }
    })
    return e
  } finally {
    loadingAuth.set(false)
  }
}

export const loginUser = async (loginCredentials: LoginCredentials) => {
  const formData = new FormData()
  formData.append('email', loginCredentials.email)
  formData.append('password', loginCredentials.password)
  loadingAuth.set(true)
  try {
    const user = await fetch(
      `${BASE_API_URL}auth/login`,{
        method: 'POST',
        body: formData,
      }
    );
    const userData: AuthResponse = await user.json()
    console.log(userData);
    if(!userData.error) {
      localStorageSet('token', userData.token)
      authStore.set({
        ...userData,
        isAuth: true
      })
      return {
        success: true
      }
    }
    return  {
      error: userData.message,
      success: false
    }

  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: error
    }
  } finally {
    loadingAuth.set(false)
  }
}

export const registerUser = async (dto: RegisterCredentials) => {
  const formData = new FormData()
  formData.append('email', dto.email)
  formData.append('password', dto.password)
  formData.append('username', dto.username)
  loadingAuth.set(true)
  try {
    const user = await fetch(
      `${BASE_API_URL}auth/register`,{
        method: 'POST',
        body: formData,
      }
    );
    const userData: AuthResponse = await user.json()
    console.log(userData);
    if(!userData.error) {
      localStorageSet('token', userData.token)
      authStore.set({
        ...userData,
        isAuth: true
      })
      return {
        success: true
      }
    }
    return  {
      error: userData.message,
      success: false
    }

  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: error
    }
  } finally {
    loadingAuth.set(false)
  }
}


export const logOut = () => {
  authStore.set({
    username: '',
    token: null,
    isAuth: false,
    roles: [],
    id: null,
    email: '',
  })
  localStorageRemove('token')
}
