<script>
  import { onMount, onDestroy } from 'svelte'
  import { Editor } from '@tiptap/core'
  import StarterKit from '@tiptap/starter-kit'
  let element
  let editor
  let img
  let tags
  let title

  const setImg = e => {
    img = e.target.files[0]
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
    console.log(formData);
    const post = await fetch('http://localhost:5000/posts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pay52ZXJhc0BtYWlsLnJ1IiwiaWQiOjEsInJvbGVzIjpbeyJpZCI6MSwidmFsdWUiOiJBRE1JTiIsImRlc2NyaXB0aW9uIjoi0JLRgdGRINC80L7QttC10YIiLCJjcmVhdGVkQXQiOiIyMDIyLTA2LTExVDA1OjI4OjE3LjMyNloiLCJ1cGRhdGVkQXQiOiIyMDIyLTA2LTExVDA1OjI4OjE3LjMyNloiLCJVc2VyUm9sZXMiOnsiaWQiOjEsInJvbGVJZCI6MSwidXNlcklkIjoxfX1dLCJ1c2VybmFtZSI6ItCd0LjQutC40YLQsCDQktC10YDQsNGBIiwiaWF0IjoxNjU1ODIzNzY4LCJleHAiOjE2NzEzNzU3Njh9.hGnUHoCpWbyT6ADQIPEn_Dr3F-Fex4byPOXm-3O5-bU`
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
      content: '<p>Hello World! 🌍️ </p>',
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

{#if editor}
  <button
    on:click={() => editor.chain().focus().toggleHeading({ level: 1}).run()}
    class:active={editor.isActive('heading', { level: 1 })}
  >
    H1
  </button>
  <button
    on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
    class:active={editor.isActive('heading', { level: 2 })}
  >
    H2
  </button>
  <button on:click={() => editor.chain().focus().setParagraph().run()} class:active={editor.isActive('paragraph')}>
    P
  </button>
  <button on:click={() => editor.chain().focus().setCode().run()} class:active={editor.isActive('paragraph')}>
    code
  </button>
{/if}

<div style="display: flex; flex-direction: column">
  <input type="text" on:input={setTitle} placeholder="Заголовок">
  <div bind:this={element}></div>
  <input on:input={setImg} type="file" placeholder="Картина">
  <input type="text" placeholder="Тэги" bind:value={tags}>
  <button on:click={() => savePost()}>save</button>
</div>

<style>
    button.active {
        background: black;
        color: white;
    }
</style>
