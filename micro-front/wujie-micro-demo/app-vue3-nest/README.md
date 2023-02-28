@font-face 在 Shadow DOM 中不起作用:

https://github.com/lmk123/blog/issues/79

https://robdodson.me/posts/at-font-face-doesnt-work-in-shadow-dom/

```js
// 将 @font-face 写在宿主网页中
const fontFaceCss = `
  @font-face {
    font-family: 'hcfy-font-icons';
    src: url('data:font/woff2;base64,...') format('woff2');
  }
`
const fontFaceStyle = document.createElement('style')
style.textContent = fontFaceCss
document.head.appendChild(fontFaceStyle)

// 将图标样式写在 Shadow DOM 里
const iconsCss = `
  .icon-help { ... }
  .icon-settings { ... }
`
const style = document.createElement('style')
style.textContent = iconsCss
shadowRoot.appendChild(style)
```