<template>
  <div class="container">
    <Header :user="currentUser"></Header>
    <loader v-if="isLoading"></loader>
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-6 ">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2020 鱼香肉丝专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue'
import { useStore } from 'vuex'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header.vue'
import Loader from './components/Loader.vue'
import { DataProps } from './store'
import createMessage from '@/components/createMessage'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Loader
  },
  setup () {
    const store = useStore<DataProps>()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    const error = computed(() => store.state.error)
    //
    watch(() => error.value.status, () => {
      const { status, message } = error.value
      if (status && message) {
        createMessage(message, 'error')
      }
    })
    return {
      currentUser,
      isLoading,
      error
    }
  }
})
</script>

<style>
.container {
  height: 109vh;
}
</style>
