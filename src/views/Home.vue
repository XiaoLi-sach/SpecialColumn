/**
  主页
 */

<template>
  <div class="home-page">
    <section class="py-5 text-center container">
        <div class="row py-lg-5">
            <div class="col-lg-6 col-md-8 mx-auto">
                <img src="../assets/callout.svg" alt="callout" class="w-50"/>
                <p>
                    <router-link to="create" class="btn btn-primary my-2">开始写作</router-link>
                </p>
            </div>
        </div>
      <h4 class="font-weight-bold text-center">发现精彩</h4>
      <column-list :list="list"></column-list>
      <button
        class="btn btn-outline-primary mt-2 mb-5 btn-block w-25"
        @click="loadMorePage" v-if="!isLastPage"
      >
        加载更多
      </button>
    </section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import { DataProps } from '@/store'
import useLoadMore from '@/hooks/useLoadMore'
import ColumnList from '../components/ColumnList.vue'

export default defineComponent({
  name: 'Home',
  components: {
    ColumnList
  },
  setup () {
    const store = useStore<DataProps>()
    const total = computed(() => store.state.columns.total)
    const currentPage = computed(() => store.state.columns.currentPage)
    onMounted(() => {
      store.dispatch('fetchColumns', { pageSize: 3 })
    })
    const list = computed(() => store.getters.getColumns)
    const { loadMorePage, isLastPage } = useLoadMore('fetchColumns', total, { pageSize: 3, currentPage: (currentPage.value ? currentPage.value + 1 : 2) })
    return {
      list,
      loadMorePage,
      isLastPage
    }
  }
})
</script>

<style scoped>
.btn-outline-primary {
  /*margin-left: 37.8%;*/
}
.btn-primary {
  width: 50%;
}
/*.home-page {*/
/*  height: 100vh;*/
/*}*/
</style>
