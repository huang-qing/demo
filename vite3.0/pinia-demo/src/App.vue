<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'
import HelloWorld from './components/HelloWorld.vue'
import { useUserStore } from './stores/user'
import { useAppStore } from './stores/app'

const userStore = useUserStore()
const appStore = useAppStore()

console.log("appStore:before-",appStore.token2);
appStore.token2="app-token2"
appStore.updateToken("app-update-token");
console.log("appStore:after-",appStore.token2);

const changeTokenInUserStore = () => {
  // 方式一：直接修改值
  userStore.token = 'userUpdateToken'
  // 方式二：使用$patch
  userStore.$patch((state) => {
    state.token = 'user$patchUpdateToken'
  })
}

const changeTokenInAppStore = () => {
  appStore.updateToken(`appUpdateToken+${appStore.token2}`);
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <div>
        <p>token in userState:{{ userStore.token }}</p>
        <p>token in appState:{{ appStore.token }}</p>
      </div>
      <div>
        <button @click="changeTokenInUserStore">change token in userState</button>
        <button @click="changeTokenInAppStore">change token in appState</button>
      </div>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about/123">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
