<script context="module" lang="ts">
  import { routeGuard } from "../../lib/routeGuard";

  export async function load() {
    return await routeGuard()
  }
</script>

<script>
  import {BASE_API_URL} from "../../utils/variables.js";
  import { onMount, onDestroy } from 'svelte'
  import { Editor } from '@tiptap/core'
  import StarterKit from '@tiptap/starter-kit'
  import BaseButton from "../../lib/components/UI/BaseButton.svelte";
  import { localStorageGet } from "../../utils/browserData.js";
  let element
  let editor
  let img
  let imgToShow
  let tags
  let title

  const setImg = e => {
    img = e.target.files[0]
    const reader = new FileReader()
    reader.onload = (loadData) => {
      imgToShow = loadData.target.result
    }
    reader.readAsDataURL(img)
  }

  const setTitle = e => {
    title = e.target.value
  }

  const savePost = async () => {
    const html = editor.getHTML()
    const objToSend = {
      type: 'html',
      text: html,
    }
    const content = JSON.stringify(objToSend)
    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    formData.append('tags', tags)
    formData.append('image', img)
    const post = await fetch(`${BASE_API_URL}posts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorageGet('token')}`
      },
      body: formData,
    })
    console.log(post);
  }

  onMount(() => {

    editor = new Editor({
      element: element,
      extensions: [
        StarterKit,
      ],
      content: '<p>Начало Поста</p>',
      onTransaction: () => {
        editor = editor
      },
    })
  })

  onDestroy(() => {
    if (editor) {
      editor.destroy()
    }
  })

</script>

<div style="display: flex; flex-direction: column">
  <input type="text" on:input={setTitle} class="create-post__title" placeholder="Заголовок">
  <div class="create-post__image">
    <input on:input={setImg} type="file" placeholder="Картинка">
    <img src={imgToShow} alt="Главная картинка">
  </div>
  <input class="create-post__tags" type="text" placeholder="Тэги (через запятую с пробелом)" bind:value={tags}>
  <div bind:this={element} class="create-post__content"></div>
  <BaseButton text="Создать пост" on:click={savePost}/>
</div>

<style lang="sass">
    .create-post
      &__title
        font-size: 20px
        background: transparent
        border: 0
        border-bottom: 1px solid white
        padding-bottom: 5px
        margin: 20px 0
        outline: 0
      &__tags
        font-size: 18px
        background: transparent
        border: 0
        border-bottom: 1px solid white
        padding-bottom: 5px
        margin: 20px 0
        outline: 0
      &__image

      &__content
        font-size: 16px
        margin-top: 20px
        margin-bottom: 20px
        border: 0
        background: #14181b
        height: 80vh
        padding: 5px

</style>
