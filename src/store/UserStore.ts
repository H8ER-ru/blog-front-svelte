import { writable } from "svelte/store";
import { BASE_API_URL } from "../utils/variables";

export const authStore = writable({})

export const fetchUserData = async (token: string) => {
  const formData = new FormData()
  formData.append('token', token)
  try {
    const user = await fetch(
      `${BASE_API_URL}/auth/check-auth`,{
      method: 'POST',
      body: formData,
      }
    );
    return user
  } catch (e) {
    console.log(e);
    return e
  }
}
