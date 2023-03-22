import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useUserStore } from './user'

export const useAppStore = defineStore(
  'app',
  () => {
    const user = useUserStore()

    //const { token } = storeToRefs(user.token)
    const token = computed(() => {
      return user.token
    })

    const token2 = ref('app-token-2')
    const updateToken = (token: string) => {
      user.token = token
    }

    return { token, token2, updateToken }
  },
  {
    persist:{
      key: 'hq-app'
    }
  }
)
