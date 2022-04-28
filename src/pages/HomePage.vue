<template>
  <div class="home container">
    <div class="row">
      <div class="col-12 text-light">
        <h1>Projects</h1>
      </div>
    </div>
    <!-- THIS IS THE REPEATED ELEMENT -->
    <Project v-for="p in projects" :key="p.id" :project="p" />
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState.js'
import { useRoute } from 'vue-router'
import { onMounted } from '@vue/runtime-core'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
import { projectsService } from '../services/ProjectsService.js'


export default {
  name: 'Home',
  setup() {
    // variables that are needed but not in the template
    // and those that require manipulation by other methods or variables

    onMounted(async () => {
      try {
        await projectsService.getAll()
      } catch (error) {
        logger.log(error)
        Pop.toast(error.message, 'error')
      }
    })


    return { // all variables needed in template MUST be in the return
      // local variables
      // computed values
      projects: computed(() => AppState.projects),
      // methods

    }
  }
}
</script>

<style scoped lang="scss">
</style>
