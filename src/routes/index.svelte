<script context="module">
  export async function load({ fetch }) {
    const url = `http://localhost:5000/posts`;
    const response = await fetch(url).then(resp => resp.json());
    return {
      props: {
        posts: response
      }
    };
  }
</script>

<script>
  import PostCard from "../lib/components/postCard/PostCard.svelte";
  export let posts
</script>

<svelte:head>
  <title>Veras IT | Главная</title>
</svelte:head>

<div class="post-wrapper">
  {#each posts as post}
    <PostCard {...post} />
  {/each}
</div>

<style type="text/sass">
  .post-wrapper
    display: flex
    flex-wrap: wrap
    gap: 15px
    justify-content: center
    align-items: center
</style>
