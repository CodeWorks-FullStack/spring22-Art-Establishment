<template>
  <div
    class="row my-4 p-3 border border-light rounded text-light"
    @click="openModal"
  >
    <div class="text-end" v-if="project.creatorId == account.id">
      <i class="mdi mdi-delete selectable"></i>
    </div>
    <!-- .stop prevents click being passed to parent and opening modal -->
    <div class="col-md-4 col-sm-6 d-flex" @click.stop="goToProfile">
      <img class="rounded preview-img" :src="project.creator.picture" alt="" />
      <h3 class="ms-2">{{ project.creator.name }}</h3>
    </div>
    <div class="col-md-4 col-sm-6">
      <h3>{{ project.title }}</h3>
    </div>
    <div class="col-md-4">
      <img class="rounded preview-img" :src="project.coverImg" alt="" />
      <img
        v-for="i in 2"
        :key="i"
        class="rounded preview-img"
        :src="
          project.projectImgs[i]
            ? project.projectImgs[i]
            : 'http://placekitten.com/100/100'
        "
        alt=""
      />
    </div>
  </div>
  <Modal :id="'m-' + project.id">
    <template #title>
      <div class="d-flex selectable" @click="goToProfile">
        <img
          :src="project.creator.picture"
          alt="creator picture"
          class="preview-img"
        />
        <div class="ms-2 d-flex flex-column justify-content-center">
          <h4 class="m-0">{{ project.creator.name }}</h4>
          <h4 class="m-0">{{ project.title }}</h4>
        </div>
      </div>
    </template>
    <template #body>
      <div>
        <img class="img-fluid" :src="project.coverImg" alt="" />
      </div>
      <div class="masonry-with-columns">
        <!-- the v-for if wrapped in () provides the value first and the index second -->
        <div v-for="(pic, i) in project.projectImgs" :key="i">
          <img :src="pic" alt="" />
        </div>
      </div>
    </template>
  </Modal>
</template>


<script>
import { Modal } from 'bootstrap'
import { useRouter } from 'vue-router'
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState.js'
export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    return {
      account: computed(() => AppState.account),
      goToProfile() {
        Modal.getOrCreateInstance(document.getElementById('m-' + props.project.id)).hide()
        router.push({ name: "Profile", params: { id: props.project.creatorId } })
      },
      openModal() {
        Modal.getOrCreateInstance(document.getElementById('m-' + props.project.id)).toggle()
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.masonry-with-columns {
  columns: 2 200px;
  column-gap: 1rem;
  div {
    display: inline-block;
    width: 70%;
    img {
      max-width: 100%;
      padding: 0.25em;
    }
  }
}
</style>