<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let text
  export let loading

  const clickHandler = (e) => {
    e.preventDefault()
    dispatch('click', e)
  }

</script>

<button
  on:click={clickHandler}
  class="button">
  {#if loading}
    <span class="loader"></span>
  {/if}
  {#if !loading}
    {text}
  {/if}
</button>

<style lang="sass">
  .button
    display: flex
    align-items: center
    justify-content: center
    font-size: 16px
    padding: 10px
    background: var(--red)
    border: 0
    cursor: pointer
    min-width: min-content
    border-radius: 8px
    transition: transform .3s linear
    &:hover
      transform: scale(1.05)

  .loader
    margin-left: 5px
    width: 24px
    height: 24px
    border: 5px solid #FFF
    border-bottom-color: #FF3D00
    border-radius: 50%
    display: inline-block
    box-sizing: border-box
    animation: rotation 1s linear infinite

    @keyframes rotation
      0%
        transform: rotate(0deg)
      100%
        transform: rotate(360deg)
</style>
