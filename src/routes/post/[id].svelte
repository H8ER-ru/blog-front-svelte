<script context="module">
  import { BASE_MEDIA_URL } from "../../utils/variables.ts";
  export async function load({ fetch, params }) {
    const url = `http://localhost:5000/posts/id/${params.id}`;
    const response = await fetch(url).then(resp => resp.json());

    console.log(response);
    return {
      props: {
        post: response
      }
    };
  }
</script>

<script>
  import { dateConverter } from "../../utils/dateConverter.ts";
  import Tag from "../../lib/components/UI/Tag.svelte";
  import '$lib/assets/css/content.css'
  import Calendar from '$lib/assets/img/calendar.svg';

  export let post
  const postHtmlText = JSON.parse(post.content).text
  const dateToShow = dateConverter(post.createdAt)
  const tagsList = post.tags.replaceAll('"', '').split(', ')
</script>

<svelte:head>
  <title>Veras IT | {post.title}</title>
</svelte:head>

<div class="post-page">
  <img
    class="post-page__img"
    src={`${BASE_MEDIA_URL}${post.image}`}
    loading="lazy"
    alt=""
  >
  <div class="post-page__info">
    <div>
      <p>{post.authorName}</p>
      <div class="post-page__date">
        <img
          src={Calendar}
          alt="Календарь"
          loading="lazy"
          width="16"
          height="16"
        >
        <time>{dateToShow}</time>
      </div>
    </div>
    <div class="post-page__tags">
      {#each tagsList as tag}
        <Tag
          text={tag}
        />
      {/each}
    </div>
  </div>
  <h1 class="post-page__title">{post.title}</h1>
  <div class="post-page__content">
    {@html postHtmlText}
  </div>

</div>

<style type="text/sass">
  .post-page
    background: #14181b
    color: #fff
    padding: 30px
    width: 100%
    max-width: 900px
    margin: 0 auto
    border-radius: 5px
    &__title
      font-size: 42px
      line-height: 1.2
      margin-bottom: 20px

    &__img

      height: 100%
      max-height: 400px
      display: block
      max-width: 500px
      margin: 0 auto 20px

    &__info
      display: flex
      align-items: center
      justify-content: space-between
      p
        font-size: 16px
        line-height: 1.2


    &__tags
      display: flex

    &__date
      display: flex
      align-items: center
      margin-top: 5px
      time
        margin-left: 5px
        font-size: 14px
        line-height: 1.2
</style>
