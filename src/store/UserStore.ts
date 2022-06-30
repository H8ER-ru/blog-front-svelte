import { writable } from "svelte/store";
import { BASE_API_URL } from "../utils/variables";
import { localStorageGet, localStorageRemove, localStorageSet } from "../utils/requestUtils";

interface AuthStore {
  token: string | null
  email: string
  id: number | null
  roles: []
  username: string
  isAuth: boolean
}

interface LoginCredentials {
  email: string
  password: string
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

export const fetchUserData = async (token: string) => {

  const formData = new FormData()
  formData.append('token', token)

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
    authStore.update((e) => {
      return {
        ...e,
        isAuth: false
      }
    })
    return e
  }
}

export const loginUser = async (loginCredentials: LoginCredentials) => {
  const formData = new FormData()
  formData.append('email', loginCredentials.email)
  formData.append('password', loginCredentials.password)
  try {
    const user = await fetch(
      `${BASE_API_URL}auth/login`,{
        method: 'POST',
        body: formData,
      }
    );
    const userData: AuthStore = await user.json()
    localStorageSet('token', userData.token)
    authStore.set({
      ...userData,
      isAuth: true
    })
  } catch (e) {
    console.log(e);
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
