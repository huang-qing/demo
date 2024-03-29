/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module "team-blue/*"{}

declare module "team-green/*"{}

declare module "team-red/*"{}