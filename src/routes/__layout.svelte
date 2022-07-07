<script context="module" lang="ts">
  import { localStorageGet } from "../utils/browserData.ts";
  import { fetchUserData, loadingAuth } from "../store/UserStore.ts";

  export async function load ({fetch}) {
    const token = localStorageGet('token')
    if(token && token.length) {
      await fetchUserData(token, fetch);
    }
    loadingAuth.set(false);
    return {
      data: 'hehe'
    }
  }
</script>

<script>
  import '../app.css'
  import Header from "../lib/components/Header/Header.svelte";
  import Footer from "../lib/components/Footer/Footer.svelte";
  import { fade } from 'svelte/transition'
  import {Modals} from "svelte-modals";

</script>

<Header/>
<main class="main">
  <slot/>
  <Modals>
    <div
      slot="backdrop"
      class="backdrop"
      transition:fade
    >
    </div>
  </Modals>
</main>
<Footer/>

<style type="text/scss">
  .main {
    width: 100%;
    max-width: 1200px;
    margin: 20px auto;
    padding: 0 1rem;
    height: 100%;
    min-height: 100%;
  }
  .backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0,0,0,0.50)
  }
</style>
