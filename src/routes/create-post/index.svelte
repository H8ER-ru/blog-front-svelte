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
    <div class="create-post__tools">
      <button
        on:click={() => console.log && editor.chain().focus().toggleBold().run()}
        class={editor.isActive("bold") ? "is-active" : ""}
      >
        bold
      </button>
      <button
        on:click={() => editor.chain().focus().toggleItalic().run()}
        class={editor.isActive("italic") ? "is-active" : ""}
      >
        italic
      </button>
      <button
        on:click={() => editor.chain().focus().toggleStrike().run()}
        class={editor.isActive("strike") ? "is-active" : ""}
      >
        strike
      </button>
      <button
        on:click={() => editor.chain().focus().toggleCode().run()}
        class={editor.isActive("code") ? "is-active" : ""}
      >
        code
      </button>
      <button on:click={() => editor.chain().focus().unsetAllMarks().run()}> clear marks </button>
      <button on:click={() => editor.chain().focus().clearNodes().run()}> clear nodes </button>
      <button
        on:click={() => editor.chain().focus().setParagraph().run()}
        class={editor.isActive("paragraph") ? "is-active" : ""}
      >
        paragraph
      </button>
      <button
        on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        class={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        h1
      </button>
      <button
        on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        class={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        h2
      </button>
      <button
        on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        class={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        h3
      </button>
      <button
        on:click={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        class={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
      >
        h4
      </button>
      <button
        on:click={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        class={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
      >
        h5
      </button>
      <button
        on:click={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        class={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
      >
        h6
      </button>
      <button
        on:click={() => editor.chain().focus().toggleBulletList().run()}
        class={editor.isActive("bulletList") ? "is-active" : ""}
      >
        bullet list
      </button>
      <button
        on:click={() => editor.chain().focus().toggleOrderedList().run()}
        class={editor.isActive("orderedList") ? "is-active" : ""}
      >
        ordered list
      </button>
      <button
        on:click={() => editor.chain().focus().toggleCodeBlock().run()}
        class={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        code block
      </button>
      <button
        on:click={() => editor.chain().focus().toggleBlockquote().run()}
        class={editor.isActive("blockquote") ? "is-active" : ""}
      >
        blockquote
      </button>
      <button on:click={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </button>
      <button on:click={() => editor.chain().focus().setHardBreak().run()}> hard break </button>
      <button on:click={() => editor.chain().focus().undo().run()}> undo </button>
      <button on:click={() => editor.chain().focus().redo().run()}> redo </button>
    </div>
  {/if}
  <div>
    <p>Вставить картинку в текст</p>
    <input type="file" on:change={addImage}>
  </div>
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

      &__tools
        display: flex
        gap: 5px

        button
          color: black
          background: white
          border: 1px solid white
          padding: 2px
          border-radius: 3px
          cursor: pointer
          transition: opacity .3s linear
          &:hover
            opacity: 0.7

      &__content
        font-size: 16px
        margin-top: 20px
        margin-bottom: 20px
        border: 0
        background: #14181b
        height: 80vh
        padding: 5px

        &:global
          img
            width: 100%

          .ProseMirror-focused
            outline: none
            border: 0

</style>
