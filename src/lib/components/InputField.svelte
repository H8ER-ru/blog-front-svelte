<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let value
  export let type
  export let placeholder
  export let inputId
  export let errorText

  const inputEvent = (e) => {
    dispatch('change', { value: e.target.value })
  }
</script>

<fieldset class="fieldset">
  <label class="fieldset__label" for={inputId}></label>
  <input
    value={value}
    on:input={inputEvent}
    placeholder={placeholder}
    type={type}
    id={inputId}
  >
  {#if errorText}
    <p>{errorText}</p>
  {/if}
</fieldset>

<style type="text/sass">
  .fieldset
    width: 100%
    max-width: 320px
    height: 40px
    border: 0
    margin-bottom: 20px
    input
      height: 40px
      color: #181d20
      background: transparent
      width: 100%
      border: 0
      border-bottom: 1px solid #181d20
      outline: 0
      &::placeholder
        color: rgba(#181d20, 0.5)

</style>
