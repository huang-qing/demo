<template>
  <h1 class="m-2 bg-sky-500 px-4 text-3xl font-bold underline">Hello world!</h1>
  <button class="btn">按钮</button>
  <div
    class="mx-auto flex max-w-sm items-center space-x-4 rounded-xl bg-white p-6 shadow-lg"
  >
    <div class="shrink-0">
      <img class="h-12 w-12" src="./assets/vue.svg" alt="ChitChat Logo" />
    </div>
    <div>
      <div class="text-xl font-medium text-black">ChitChat</div>
      <p class="text-slate-500">You have a new message!</p>
    </div>
  </div>

  <div
    class="mx-auto max-w-sm space-y-2 rounded-xl bg-white px-8 py-8 shadow-lg sm:flex sm:items-center sm:space-x-6 sm:space-y-0 sm:py-4 mt-4"
  >
    <img
      class="mx-auto block h-24 rounded-full sm:mx-0 sm:shrink-0"
      src="./assets/vue.svg"
      alt="Woman's Face"
    />
    <div class="space-y-2 text-center sm:text-left">
      <div class="space-y-0.5">
        <p class="text-lg font-semibold text-black">Erin Lindford</p>
        <p class="font-medium text-slate-500">Product Engineer</p>
      </div>
      <button
        class="rounded-full border border-purple-200 px-4 py-1 text-sm font-semibold text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
      >
        Message
      </button>
    </div>
  </div>


  <form>
  <label class="block">
    <span class="block text-sm font-medium text-slate-700">Email</span>
    <input type="email" class="peer"/>
    <p class="mt-2 invisible peer-invalid:visible text-pink-600 text-sm ">
      Please provide a valid email address.
    </p>
  </label>
</form>
</template>

<style scoped></style>
