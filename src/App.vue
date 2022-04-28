<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
    <button
      class="fab btn btn-success rounded-pill"
      data-bs-toggle="modal"
      data-bs-target="#create-project-modal"
    >
      <i class="mdi mdi-plus"></i>
    </button>
    <Modal id="create-project-modal">
      <template #title> Create Project </template>
      <template #body> <ProjectForm /> </template>
    </Modal>
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-4">
      Made with 💖 by CodeWorks
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.fab {
  height: 3em;
  width: 3em;
  position: fixed;
  right: 3em;
  bottom: 3em;
}
</style>
