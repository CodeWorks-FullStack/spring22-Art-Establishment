<template>
  <form class="p-5" @submit.prevent="createProject">
    <div class="mb-3">
      <label class="form-label">Title</label>
      <input
        type="text"
        class="form-control"
        placeholder="Title..."
        v-model="newProject.title"
      />
    </div>
    <div class="mb-3">
      <label class="form-label">Cover Image</label>
      <input
        type="url"
        class="form-control"
        placeholder="Image Url..."
        v-model="newProject.coverImg"
      />
    </div>
    <div class="mb-3">
      <p>Project Images: {{ projectImgs }}</p>
      <label class="form-label">Additional Images</label>
      <textarea
        class="form-control"
        placeholder="Image Urls..."
        v-model="images"
      ></textarea>
      <p><small>* seperate with a space</small></p>
    </div>
    <button type="button" data-bs-dismiss="modal" class="btn btn-danger">
      Cancel
    </button>
    <button class="btn btn-success">Create Project</button>
  </form>
</template>


<script>
import { ref } from '@vue/reactivity'
import { watchEffect } from '@vue/runtime-core'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
import { projectsService } from '../services/ProjectsService.js'
import { Modal } from 'bootstrap'
export default {
  setup() {
    const images = ref('')
    const projectImgs = ref([])

    const newProject = ref({})

    watchEffect(() => {
      projectImgs.value = images.value.trim().split(' ')
      projectImgs.value = projectImgs.value.filter(img => img)
    })

    return {
      images,
      projectImgs,
      newProject,
      async createProject() {
        try {
          newProject.value.projectImgs = projectImgs.value
          await projectsService.createProject(newProject.value)
          newProject.value = {}
          images.value = ''
          Modal.getOrCreateInstance(document.getElementById('create-project-modal')).toggle()
          Pop.toast("Created Project!", 'success')
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }

    }
  }
}
</script>


<style lang="scss" scoped>
form {
  background: #000;
}
</style>