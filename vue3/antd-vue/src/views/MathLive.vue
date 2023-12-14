<template>
  <div class="">
    <h1>This is an mathlive demo page</h1>
    <div>
      <math-field ref="mfe">{{ mathText }}</math-field>
    </div>
    <!-- <div>
      <input :value="mathText" />
    </div> -->
    <p>{{ mathText }}</p>

    <h2>使用html的上下标</h2>
    
    <p>H_{2}O : H<sub>2</sub>O</p>
  
    <p>  x^{2} : </p>
    <p>  x^{22} : x<sup>22</sup></p>
    
  </div>
</template>

<script setup lang="ts">
// https://blog.csdn.net/xutongbao/article/details/125432142
// import 'mathlive/static.css'
// import { MathfieldElement } from 'mathlive'
// const mfe = new MathfieldElement();

import 'mathlive'
import { ref, onMounted } from 'vue'

const mfe = ref()

let mathText = ref('f(x)= x^2 + H_2O');

const updateLatex = () => {
  mathText.value = mfe.value.value
}

onMounted(() => {
  debugger;
  (mfe.value as any as HTMLElement).addEventListener('input', updateLatex);
})
</script>

<style>
math-field {
  width: 100%;
}
</style>
