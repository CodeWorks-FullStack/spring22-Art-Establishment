<template>
  <div class="container text-light">
    <div class="row">
      <div v-if="!editing" class="col d-flex p-3">
        <img :src="profile.picture" alt="" />
        <div>
          <h2>{{ profile.name }}</h2>
          <h5>Projects: {{ projects.length }}</h5>
        </div>
        <div v-if="profile.id == account.id">
          <i
            class="text-light selectable ms-2 mdi mdi-pencil"
            @click="editing = true"
          ></i>
        </div>
      </div>
      <form v-else @submit="editAccount">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            aria-describedby="helpId"
            placeholder="Name.."
            v-model="profile.name"
          />
        </div>
        <div class="mb-3">
          <label for="name" class="form-label">Picture</label>
          <input
            type="text"
            class="form-control"
            id="name"
            aria-describedby="helpId"
            placeholder="Name.."
            v-model="profile.picture"
          />
        </div>
        <button class="btn btn-danger" @click="editing = false">Cancel</button>
        <button class="btn btn-success ms-2">Submit</button>
      </form>
    </div>
    <Project v-for="p in projects" :key="p.id" :project="p" />
  </div>
</template>


<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
import { projectsService } from '../services/ProjectsService.js'
import { AppState } from '../AppState.js'

import { profilesService } from '../services/ProfilesService.js'
import { accountService } from '../services/AccountService.js'
export default {
  setup() {
    const route = useRoute()
    const editing = ref(false)

    onMounted(async () => {
      try {
        await projectsService.getByQuery({ creatorId: route.params.id })
        await profilesService.getProfile(route.params.id)
      } catch (error) {
        logger.log(error)
        Pop.toast(error.message)
      }
    })


    return {
      editing,
      profile: computed(() => AppState.activeProfile),
      projects: computed(() => AppState.searchResults),
      account: computed(() => AppState.account),
      async editAccount() {
        try {
          await accountService.editAccount(AppState.activeProfile)
          Pop.toast("Updated Account", 'success')
          editing.value = false
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
</style>