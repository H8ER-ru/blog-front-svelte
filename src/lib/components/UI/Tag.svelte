<script>
  export let text
</script>

<span class="tag">
  {text}
</span>

<style lang="sass">
  .tag
    background: var(--red)
    color: white
    border-radius: 5px
    padding: 4px
    margin-left: 5px
    font-size: 14px
    display: block
    &:first-of-type
      margin-left: auto
</style>
