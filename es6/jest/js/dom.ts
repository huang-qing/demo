
/**
 * @jest-environment jsdom
 */
export function renderHtml(){
  const div = document.createElement('div')
  div.innerHTML=`
      <h1>Hello World </h1>
  `
  document.body.appendChild(div);
}
