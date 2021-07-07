// 分页加载
import { useStore } from 'vuex'
import { computed, ComputedRef, ref } from 'vue'

// 参数接口
interface LoadParams {
  currentPage: number;
  pageSize: number;
}
// 自定义每次加载个数
const useLoadMore = (actionName: string, total: ComputedRef<number>,
  params: LoadParams = { currentPage: 2, pageSize: 5 }) => {
  const store = useStore()
  const currentPage = ref(params.currentPage) // 创建响应式对象 初始值是上面的值
  // 发送请求
  const requestParams = computed(() => ({
    currentPage: currentPage.value,
    pageSize: params.pageSize
  }))
  // 点击加载更多按钮 加请求
  const loadMorePage = () => {
    store.dispatch(actionName, requestParams.value).then(() => {
      currentPage.value++
    })
  }
  // 判断最后一页 隐藏按钮
  const isLastPage = computed(() => {
    return Math.ceil(total.value / params.pageSize) === currentPage.value
  })
  return {
    loadMorePage,
    isLastPage,
    currentPage
  }
}

export default useLoadMore
