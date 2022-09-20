import { createVNode, render as vueRender, defineComponent } from "vue";

export const mountSoltVnode = (
  options: any,
  render: any,
  el: any,
  context: any
) => {
  if (!el) {
    el = document.body;
  }
  // 创建一个组件，使用插槽的方式把render函数作为默认插槽渲染
  // 可以保持响应式
  const Comp = defineComponent({
    setup(this, props, { slots }) {
      return () => {
        return createVNode("div", {}, [slots.default!()]);
      };
    },
  });

  const vnode: any = createVNode(Comp, null, { default: render });
  vnode.appContext = context;
  vueRender(vnode, el);
};
