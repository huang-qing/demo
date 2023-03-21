<script setup>
import { ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import TheWelcome from "./components/TheWelcome.vue";

window.addEventListener("message", handleMessage, false);

var _alert = window.alert;
var message = ref("");

// 接收方的 message event handler
function handleMessage(event) {
  debugger;
  // MDN 建议在处理消息前要先检查发送方的域名，防止恶意消息
  if (event.origin === "http://localhost:3001") {
    // 处理消息
    //_alert(event.data);
    message.value=event.data;
    // 发送回执给发送方
    event.source.postMessage("Message received", event.origin);
  }
}

// 在 iframe 中发送消息
function send() {
  window.parent.postMessage(
    "Hello to parent from iframe!",
    "http://localhost:3001"
  );
}
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="./assets/logo.svg"
      width="125"
      height="125"
    />
    <div>
      {{ message }}
      <button @click="send">sent parent window</button>
    </div>
    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
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
}
</style>
