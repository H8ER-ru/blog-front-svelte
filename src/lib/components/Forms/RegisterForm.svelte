<script>
import InputField from "../InputField.svelte";
import BaseButton from "../UI/BaseButton.svelte";

let emailValue = ''
let passwordValue = ''
let passwordValue2 = ''
let username = ''
let loading = false


</script>

<form class="register-form">

  <InputField
    type="text"
    placeholder="Ваше имя"
    inputId="username-input"
    value={username}
    on:change={e => username = e.detail.value}
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

  <BaseButton text="Регистрация" loading={loading}/>

</form>

<style lang="sass">
  .register-form
    display: flex
    flex-direction: column
    gap: 15px
</style>
