<script>
import InputField from "../InputField.svelte";
import BaseButton from "../UI/BaseButton.svelte";
import { registerUser } from "../../../store/UserStore.ts";
import { createEventDispatcher } from "svelte";

const dispatch = createEventDispatcher()

let emailValue = ''
let passwordValue = ''
let passwordValue2 = ''
let usernameValue = ''
let loading = false

const registerHandler = async (e) => {
  e.preventDefault()
  loading = true
  const register = await registerUser({email: emailValue, password: passwordValue, username: usernameValue})
  if(register.success) {
    dispatch('success')
  } else {
    console.log(register.error)
  }
  loading = false
}


</script>

<form class="register-form">

  <InputField
    type="text"
    placeholder="Ваше имя"
    inputId="username-input"
    value={usernameValue}
    on:change={e => usernameValue = e.detail.value}
  />

  <InputField
    type="email"
    placeholder="Email"
    inputId="email-input"
    value={emailValue}
    on:change={e => emailValue = e.detail.value}
  />

  <InputField
    type="password"
    placeholder="Пароль"
    inputId="password-input"
    value={passwordValue}
    on:change={e => passwordValue = e.detail.value}
  />

  <InputField
    type="password"
    placeholder="Повторите пароль"
    inputId="password-input2"
    value={passwordValue2}
    on:change={e => passwordValue2 = e.detail.value}
  />

  <BaseButton
    on:click={registerHandler}
    text="Регистрация"
    loading={loading}/>

</form>

<style lang="sass">
  .register-form
    display: flex
    flex-direction: column
    gap: 15px
</style>
