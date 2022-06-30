<script lang="ts">
  import { closeModal } from 'svelte-modals'
  import { fly } from 'svelte/transition'
  import LoginForm from "./Forms/LoginForm.svelte";
  import Tab from "./UI/Tab.svelte";
  import RegisterForm from "./Forms/RegisterForm.svelte";
  import CloseButton from "./UI/CloseButton.svelte";

  export let isOpen

  type tabName = 'login' | 'register'
  let activeTab: tabName = 'login'

  const setActiveTab = (tabName: tabName) => {
    activeTab = tabName
  }

</script>


{#if isOpen}
  <div role="dialog" class="modal" transition:fly={{ y: 50 }} on:introstart on:outroend>
    <div class="auth-modal">
      <CloseButton
        on:click={closeModal}
        class="auth-close"/>
      <div class="auth-modal__tabs">
        <Tab
          on:click={() => setActiveTab('login')}
          active={activeTab === 'login'}
          text="Войти"/>
        <Tab
          on:click={() => setActiveTab('register')}
          active={activeTab === 'register'}
          text="Зарегистрироваться"/>
      </div>
      {#if activeTab === 'login'}
        <LoginForm/>
      {/if}
      {#if activeTab === 'register'}
        <RegisterForm/>
      {/if}
    </div>
  </div>
{/if}

<style lang="sass">
  .auth-modal :global(.auth-close)
    position: absolute
    right: 40px
    top: 40px

  .modal
    position: fixed
    top: 0
    bottom: 0
    right: 0
    left: 0
    display: flex
    justify-content: center
    align-items: center
    pointer-events: none



  .auth-modal
    width: 400px
    border-radius: 6px
    padding: 36px
    background: white
    display: flex
    flex-direction: column
    justify-content: space-between
    pointer-events: auto
    color: #14181b
    &__tabs
      width: 100%
      display: flex
      align-items: center
      justify-content: center
      margin-bottom: 24px

</style>
