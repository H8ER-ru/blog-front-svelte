<script context="module" lang="ts">
  import { routeGuard } from "../../lib/routeGuard";

  export async function load() {
    return await routeGuard()
  }
</script>

<script>
  import { BASE_API_URL, BASE_MEDIA_URL } from "../../utils/variables.js";
  import { onMount, onDestroy } from 'svelte'
  import { Editor } from '@tiptap/core'
  import StarterKit from '@tiptap/starter-kit'
  import Image from '@tiptap/extension-image'
  import Link from '@tiptap/extension-link'
  import BaseButton from "../../lib/components/UI/BaseButton.svelte";
  import { localStorageGet } from "../../utils/browserData.js";
  import ToolsButtons from "../../lib/components/CreatePost/ToolsButtons.svelte";
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

  const addImage = async (e) => {
    const file = e.target.files?.[0]
    console.log(file);
    const formData = new FormData()
    formData.append('image', file)
    const addImageUrl = await fetch(`${BASE_API_URL}files`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorageGet('token')}`
      },
      body: formData
    })
    const imagePath = await addImageUrl.text()
    editor.chain().focus().setImage({ src: `${BASE_MEDIA_URL}${imagePath}` }).run()

  }


  Link.configure({
    linkOnPaste: false
  })
  onMount(() => {

    editor = new Editor({
      element: element,
      extensions: [
        StarterKit,
        Image,
        Link,
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
  {#if editor}
    <ToolsButtons editor={editor}/>
  {/if}
  <div>
    <p>Вставить картинку в текст</p>
    <input type="file" on:change={addImage}>
  </div>
  <div on:click={() => editor.chain().focus()} bind:this={element} class="create-post__content"></div>
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

      &__content
        font-size: 16px
        margin-top: 20px
        margin-bottom: 20px
        border: 0
        background: #14181b
        min-height: 80vh
        padding: 5px

        &:global
          img
            width: 100%
          code
            opacity: 0.5
          p:empty
            height: 10px
          p
            font-size: 1.1rem
            line-height: 1.5rem
            margin: 7px 0
          h2
            margin: 15px 0 7px 0
          a
            color: blueviolet
          .ProseMirror-focused
            outline: none
            border: 0

</style>
