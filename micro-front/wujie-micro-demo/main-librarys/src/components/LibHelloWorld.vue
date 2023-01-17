<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>LibHelloWorld</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/LibHelloWorld.vue</code>
    </p>
  </div>
</template>

<style scoped>
.card {
  color: #888;
}
</style>
