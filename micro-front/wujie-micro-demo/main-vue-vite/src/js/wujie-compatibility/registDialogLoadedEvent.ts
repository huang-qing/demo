import type { Router, RouteLocationNormalized, NavigationGuard } from 'vue-router';
import { defineAsyncComponent } from 'vue';
import type { AsyncComponentLoader } from 'vue';

const DIALOG = 'dialog';

function isDialog(route: RouteLocationNormalized) {
  return Object.prototype.hasOwnProperty.call(route.query, DIALOG);
}
function createAsyncComponent(component: AsyncComponentLoader<any>) {
  return defineAsyncComponent(component);
}

function replaceOriginalComponent(
  route: RouteLocationNormalized,
  component: AsyncComponentLoader<any>,
) {
  if (route.matched[0]?.components?.default) {
    route.matched[0].components.default = component;
  }
}

function InjectComponentGuards(component: any, guard: NavigationGuard) {
  const originalBeforeRouteEnter = component.beforeRouteEnter;
  let beforeRouteEnter: NavigationGuard = guard;

  if (originalBeforeRouteEnter) {
    component._originalBeforeRouteEnter = originalBeforeRouteEnter;
    beforeRouteEnter = function (to, from, next) {
      originalBeforeRouteEnter(to, from, next);
      if (guard && typeof guard === 'function') {
        guard(to, from, next);
      }
    };
  }

  component.beforeRouteEnter = beforeRouteEnter;
  component._injectDialogLoadedEvent = true;
}

function AddNavigationGuards(router: Router, guard: NavigationGuard) {
  router.beforeEach((to, from) => {
    if (!to || !isDialog(to)) {
      return;
    }

    const component: any = to.matched[0]?.components?.default;
    let _component = component;
    if (_component._injectDialogLoadedEvent) {
      return;
    }
    // 使用import异步加载的组件
    if (component && typeof component === 'function') {
      _component = createAsyncComponent(component);
      replaceOriginalComponent(to, _component);
    }
    InjectComponentGuards(_component, guard);
  });
}

/**
 * 在子应用中执行此方法，用于获取弹窗界面的实例
 * 思路为：子应用监听路由beforeEach，找到跳转的页面，调用此方法
 * 此方法会找到跳转页面的组件，并向组件注入组件内路由守卫beforeRouteEnter，使用next(mv=>{})获取组件实例
 * 弹出窗口获取页面实例，用于弹出窗口功能按钮的交互逻辑
 * @param router 
 * @param handler 
 */
export default function registerDialogLoadedEvent(router: Router, handler: (vm: any) => void) {
  AddNavigationGuards(router, function (to, from, next) {
    if (isDialog(to)) {
      next(handler);
    }
  });
}
