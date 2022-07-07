import { authStore } from "../../store/UserStore";

let auth: any
authStore.subscribe(value => auth = value)

export async function routeGuard () {
  const loggedIn: boolean = auth.isAuth

  if(loggedIn) {
    return {
      status: 200
    }
  } else {
    return {
      status: 302,
      redirect: '/'
    }
  }
}
