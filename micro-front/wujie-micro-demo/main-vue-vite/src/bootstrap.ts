// 测试使用import引入wujie加载资源的情况
// 1. 使用正常的等待没有明显的资源加载顺序变化

async function load() {
  await import("wujie");
  await import("wujie-vue3");
  await import("./startApp");
  import("./main");
}

// 2. 500毫秒的延迟可以让子应用资源优先加载并执行
async function load2() {
  await import("wujie");
  await import("wujie-vue3");
  await import("./startApp");

  setTimeout(() => {
    import("./main");
  }, 500);
}

//load();
load2()
