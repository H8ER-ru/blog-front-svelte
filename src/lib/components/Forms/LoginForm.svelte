<script>
import InputField from "../InputField.svelte";
import BaseButton from "../UI/BaseButton.svelte";
import { loginUser } from "../../../store/UserStore.ts";
import { closeModal } from "svelte-modals";

let emailValue = ''
let passwordValue = ''

let loading = false

const submitHandler = async (e) => {
  e.preventDefault()
  loading = true
  await loginUser({email:emailValue, password: passwordValue})
  loading = false
  closeModal()
}

</script>


<form
  on:submit={submitHandler}
  class="login-form"
>
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

  <BaseButton
    text="Войти"
    loading={loading}
    on:click={submitHandler}
  />

</form>

<style type="text/sass">
  .login-form
    display: flex
    flex-direction: column
    gap: 15px

</style>
