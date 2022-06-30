<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  const  clickHandler = (e) => {
    e.preventDefault()
    dispatch('click', e)
  }

  export let text
  export let active

</script>


<button
  on:click={clickHandler}
  class="tab"
  class:active={active}
>
  {text}

</button>

<style lang="sass">
  .tab
    border: 0
    background: transparent
    padding: 16px
    position: relative
    font-size: 16px
    color: #181d20
    cursor: pointer
    &:before
      content: ""
      height: 2px
      background: var(--red)
      position: absolute
      width: 50%
      left: 25%
      right: 25%
      bottom: 0
      transition: opacity .3s linear
      opacity: 0

    &.active:before
      opacity: 1

</style>
