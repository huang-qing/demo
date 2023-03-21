<script setup>
import { ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import TheWelcome from "./components/TheWelcome.vue";


var message = ref("");
const readIframeLocalStorage = () => {
  var wn = document.getElementById("vite2").contentWindow;
  var storage = wn.localStorage;
  // 跨域无法获取
  console.log(storage);
};

function send() {
  // 拿到 iframe 中的 window 对象
  var wn = document.getElementById("vite2").contentWindow;
  // postMessage 参数: 1.要发送的数据, 2.目标域名
  wn.postMessage("Hello to iframe from parent!", "http://localhost:3002");
}

window.addEventListener("message", handleMessage, false);

// 接收方的 message event handler
function handleMessage(event) {
  debugger;
  console.log("postmessage event.origin:", event.origin);
  // MDN 建议在处理消息前要先检查发送方的域名，防止恶意消息

  // 处理消息
  message.value=event.data;
  // 发送回执给发送方
  //event.source.postMessage("Message received", event.origin);
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
    {{ message }}
    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
    <button @click="send">sent iframe window</button>
    <button @click="readIframeLocalStorage">读取iframe的localstory</button>
    <iframe id="vite2" src="http://localhost:3002/"></iframe>
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
