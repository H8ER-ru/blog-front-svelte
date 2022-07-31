<script>
  import logo from '$lib/assets/img/Logo.png';
  import {openModal} from 'svelte-modals'
  import BaseButton from "../UI/BaseButton.svelte";
  import { authStore, loadingAuth, logOut } from "../../../store/UserStore.ts";
  import { goto } from "$app/navigation";

  let userData
  let loadingAuthState
  let isAdmin
  let showMobileBurger

  loadingAuth.subscribe(value => {
    if(value !== loadingAuthState) {
      loadingAuthState = value
    }
  })
  authStore.subscribe(value => {
    userData = value;
    let adminRole = false
    value.roles && value.roles.forEach(item => {
      if(item.value === 'ADMIN') {
        adminRole = true
      }
    })
    isAdmin = adminRole
  })

  const openAuthModal = () => {
    showMobileBurger = false
    openModal(() => import('$lib/components/AuthModal.svelte'), {})
  }

  const goToCreatePost = () => {
    goto('/create-post')
  }

  const toggleMobileBurger = () => {
    showMobileBurger = !showMobileBurger
  }

</script>

<header class="header">
  <a
    class="header__start"
    href="/"
  >
    <img
      src={logo}
      alt="Мопс за ноутбуком"
    >
    <span
      data-text="Veras IT"
      class="glitch"
    >
      Veras IT
    </span>
  </a>
  <div
    class="header__user"
    class:header__user--show={showMobileBurger}
    >
      <div class="header__menu">
        <button on:click={toggleMobileBurger} class="header__close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 5L19 19" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M19 5L5 19" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

        </button>
        {#if !loadingAuthState}
          {#if userData.isAuth}
            <p class="header__name">{userData.username}</p>
            <BaseButton
              text="Выход"
              on:click={logOut}
            />
          {/if}
          {#if !userData.isAuth}
            <BaseButton
              text="Авторизация"
              on:click={openAuthModal}
            />
          {/if}

          {#if isAdmin}
            <BaseButton
              text="Добавить пост"
              on:click={goToCreatePost}
            />
          {/if}
        {/if}
      </div>
  </div>
  <button
    on:click={toggleMobileBurger}
    class="header__burger"
  >
    <span></span>
    <span></span>
    <span></span>
  </button>
</header>


<style lang="sass">
  .header
    width: 100%
    margin: 0 auto
    max-width: 1300px
    display: flex
    align-items: center
    justify-content: space-between
    padding: 10px 20px

    &__burger
      display: none
      flex-direction: column
      justify-content: space-between
      width: 20px
      height: 20px
      background: transparent
      border: 0
      @media (max-width: 1024px)
        display: flex
      span
        width: 20px
        height: 2px
        background: red

    &__user
      display: flex
      align-items: center
      &--show
        display: flex !important
      @media (max-width: 1024px)
        display: none
        flex-direction: column
        align-items: end

        position: absolute
        right: 0
        top: 0
        left: 0
        bottom: 0
        z-index: 5

    &__menu
      display: flex
      align-items: center
      gap: 10px
      @media (max-width: 1024px)
        flex-direction: column
        align-items: flex-end
        gap: 20px
        background: #2d2d2d;
        padding-top: 20px
        padding-right: 30px
        width: 100%
        height: 100%
    &__close
      display: none
      @media (max-width: 1024px)
        display: flex
        align-items: center
        justify-content: center
        width: 30px
        height: 30px
        background: transparent
        border: 0
    &__name
      margin-right: 10px
    &__start
      font-size: 50px
      display: flex
      align-items: center
      text-decoration: none
      @media (max-width: 500px)
        font-size: 32px

    img
      margin-right: 5px
      height: 80px
      @media (max-width: 500px)
        height: 60px

    .glitch
      position: relative
      color: white
      mix-blend-mode: lighten
      &:before,
      &:after
        content: attr(data-text)
        position: absolute
        top: 0
        width: 100%
        background: black
        clip: rect(0, 0, 0, 0)

      &:before
        left: -1px
        text-shadow: 1px 0 rgba(red,0.7)

      &:after
        left: 1px
        text-shadow: -1px 0 rgba(blue,0.7)


      &:hover
        &:before
          text-shadow: 4px 0 rgba(red,0.7)
          animation: glitch-loop-1 0.8s infinite ease-in-out alternate-reverse

        &:after
          text-shadow: -5px 0 rgba(blue,0.7)
          animation: glitch-loop-2 0.8s infinite ease-in-out alternate-reverse

  @keyframes glitch-loop-1
    0%
      clip: rect(36px, 9999px, 9px, 0)
    25%
      clip: rect(25px, 9999px, 99px, 0)
    50%
      clip: rect(50px, 9999px, 102px, 0)
    75%
      clip: rect(30px, 9999px, 92px, 0)
    100%
      clip: rect(91px, 9999px, 98px, 0)

  @keyframes glitch-loop-2
    0%
      top: -1px
      left: 1px
      clip: rect(65px, 9999px, 119px, 0)
    25%
      top: -6px
      left: 4px
      clip: rect(79px, 9999px, 19px, 0)
    50%
      top: -3px
      left: 2px
      clip: rect(68px, 9999px, 11px, 0)
    75%
      top: 0px
      left: -4px
      clip: rect(95px, 9999px, 53px, 0)
    100%
      top: -1px
      left: -1px
      clip: rect(31px, 9999px, 149px, 0)
</style>
