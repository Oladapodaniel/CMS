<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  to: {
    type: String,
    required: true
  },
  target: {
    type: String,
    default: null
  },
  class: {
    type: [String, Array, Object],
    default: ''
  }
})
</script>

<template>
  <RouterLink :to="to" :class="['primary--text', props.class]" :target="target">
    <slot />
  </RouterLink>
</template>