import { defineAsyncComponent } from "vue";
const components: Record<string, any> = {};

export const getItemByType = (type: string) => {
  return components[type] || null;
};

export const registerComponent = (name: string, component: Promise<any>) => {
  components[name] = defineAsyncComponent(() => component);
};
