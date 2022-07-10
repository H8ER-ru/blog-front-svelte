<script context="module" >
  import { BASE_API_URL } from "../utils/variables";
  export const load = async ({ fetch }) => {
    const url = `${BASE_API_URL}posts`;
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(resp => {
        return resp.json();
      });
      return {
        props: {
          posts: response
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
  import ErrorLoadPostPlaceholder from "../lib/components/ErrorLoadPostPlaceholder.svelte";

  export let posts
</script>

<svelte:head>
  <title>Veras IT | Главная</title>
</svelte:head>

<div class="post-wrapper">
  {#if posts.length}
    {#each posts as post}
      <PostCard {...post} />
    {/each}
  {/if}
  {#if !posts.length}
    <ErrorLoadPostPlaceholder/>
  {/if}
</div>

<style type="text/sass">
  .post-wrapper
    display: flex
    flex-wrap: wrap
    gap: 15px
    justify-content: center
    align-items: center
</style>
