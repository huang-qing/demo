import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount((count) => count + 1);
  }

  // 第一次渲染时回调
  useEffect(() => {
    console.log("mounted");
  }, []);

  // 依赖变更触发的钩子函数
  useEffect(() => {
    console.log("count change");
  }, [count]);

  // 组件卸载时执行内部 return
  useEffect(() => {
    const timerId = setInterval(() => {
      console.log('定时器在运行')
    }, 1000)

    return () => { // 用来清理副作用的事情
      clearInterval(timerId)
    }
  }, [])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
        <button onClick={handleClick}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
