import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('1111-1111-1111-1111')
    const timeZone = ref('8')
    const lang = ref('zhs')

    return { token, timeZone, lang }
  },
  {
    persist: true
  }
)
