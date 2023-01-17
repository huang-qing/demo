function sum(a, b) {
  return a + b;
}

function renderHtml(){
  const div = document.createElement('div')
  div.innerHTML=`
      <h1>Hello World</h1>
  `
  document.body.appendChild(div);
}

export { sum, renderHtml };
