<script>
  import { dateConverter } from "../../../utils/dateConverter.ts";
  import { BASE_MEDIA_URL } from "../../../utils/variables.ts";
  import Calendar from '$lib/assets/img/calendar.svg';
  import {goto} from "$app/navigation";
  import Tag from "../UI/Tag.svelte";

  export let title
  export let image
  export let tags
  export let id
  export let createdAt
  export let index
  const dateToShow = dateConverter(createdAt)
  const goToPost = () => {
    return goto(`/post/${id}`)
  }

  const tagsList = tags.replaceAll('"', '').split(', ')

</script>

<article
  on:click={goToPost}
  class="post-card">
  <img
    class="post-card__img"
    src={`${BASE_MEDIA_URL}${image}`}
    alt={title}
    decoding={index > 1 ? 'async' : 'auto'}
    loading={index > 1 ? 'lazy' : 'eager'}
  >
  <div class="post-card__text">
    <div class="post-card__info">
      <img
        src={Calendar}
        width="16"
        height="16"
        alt="Календарь"
        style="margin-right: 5px"
      >
      <time class="post-card__time">
        {dateToShow}
      </time>
      {#each tagsList as tag}
        <Tag
          text={tag}
        />
      {/each}
    </div>
    <h2>
      <a href={`/post/${id}`}>
        {title}
      </a>
    </h2>
  </div>
</article>

<style type="text/sass">
  .post-card
    width: 500px
    height: 300px
    background: #202020
    border-radius: 8px
    overflow: hidden
    position: relative
    cursor: pointer
    &__img
      width: 100%
      height: 100%
      object-fit: cover
      object-position: center center

    &__info
      display: flex
      align-items: center

    &__time
      font-size: 14px

    &__text
      position: absolute
      bottom: 0
      left: 0
      right: 0
      padding: 15px
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0.01) 0%, rgba(0, 0, 0, 0.6) 100%)
      min-height: 100px
      h2
        margin-top: 7px
      a
        text-decoration: none
        transition: color .3s linear
        &:hover
          color: var(--red)
</style>
