// 下拉菜单
<template>
  <div class="dropdown" ref="dropdownRef">
    <a href="#" class="my-2 btn btn-outline-light dropdown-toggle" @click.prevent="toggleOpen">
      {{title}}
    </a>
    <ul class="dropdown-menu" :style="{display: 'block'}" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
// watch 监控响应式变化
import { defineComponent, ref, watch } from 'vue'
import useClickOutside from '../hooks/useClickOutside'

export default defineComponent({
  name: 'Dropdown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    const isOpen = ref(false)
    const dropdownRef = ref<null | HTMLElement>(null)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    // 点击的一些操作
    const isClickOutside = useClickOutside(dropdownRef)

    // 只执行一次， 所以需要检测变化
    watch(isClickOutside, () => {
      if (isOpen.value && isClickOutside.value) {
        isOpen.value = false
      }
    })
    return {
      isOpen,
      dropdownRef,
      toggleOpen
    }
  }
})
</script>

<style>
</style>
