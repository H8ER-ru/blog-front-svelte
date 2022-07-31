<script context="module" >
  import { BASE_API_URL } from "../utils/variables";
  export const load = async ({ fetch }) => {
    const url = `${BASE_API_URL}posts`;
    try {
      const response = await fetch(url)
      const posts = await response.json()
      return {
        props: {
          posts
        }
      };
    } catch (e) {
      return  {
        props: {
          posts: []
        }
      }
    }
  }
</script>

<script>
  import PostCard from "../lib/components/postCard/PostCard.svelte";
  import { onMount } from "svelte";

  export let posts
  let ErrorComponent = null
  onMount(async() => {
    if(!posts.length) {
      try {
        ErrorComponent = (await import('../lib/components/ErrorLoadPostPlaceholder.svelte')).default
      } catch (e) {
        console.log(e);
      }
    }
  })
</script>

<svelte:head>
  <title>Veras IT | Главная</title>
  <meta name="description" content="Блог о фронтенде и не только. Автор - Верас Никита">
</svelte:head>

<div class="post-wrapper">
  {#if posts.length}
    {#each posts as post, index}
      <PostCard {...post} index={index} />
    {/each}
  {/if}
  {#if !posts.length}
    <svelte:component this={ErrorComponent}/>
  {/if}
</div>

<style type="text/sass">
  .post-wrapper
    display: flex
    flex-wrap: wrap
    gap: 15px
    justify-content: center
    align-items: center
    @media (max-width: 900px)
      margin: 0 15px

</style>
