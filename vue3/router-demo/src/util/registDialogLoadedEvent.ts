import type {
  Router,
  RouteLocationNormalized,
  NavigationGuard,
} from "vue-router";
import { defineAsyncComponent } from "vue";
import type { AsyncComponentLoader } from "vue";

const DIALOG = "dialog";

function isDialog(route: RouteLocationNormalized) {
  return Object.prototype.hasOwnProperty.call(route.query, DIALOG);
}
function createAsyncComponent(component: AsyncComponentLoader<any>) {
  return defineAsyncComponent(component);
}

function replaceOriginalComponent(
  route: RouteLocationNormalized,
  component: AsyncComponentLoader<any>
) {
  if (route.matched[0]?.components?.default) {
    route.matched[0].components.default = component;
  }
}

function InjectComponentGuards(component: any, guard: NavigationGuard) {
  let originalBeforeRouteEnter = component.beforeRouteEnter;
  let beforeRouteEnter: NavigationGuard = guard;

  if (originalBeforeRouteEnter) {
    component._originalBeforeRouteEnter = originalBeforeRouteEnter;
    beforeRouteEnter = function (to, from, next) {
      originalBeforeRouteEnter(to, from, next);
      if (guard && typeof guard === "function") {
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
    if (component && typeof component === "function") {
      _component = createAsyncComponent(component);
      replaceOriginalComponent(to, _component);
    }
    InjectComponentGuards(_component, guard);
  });
}

export default function registerDialogLoadedEvent(
  router: Router,
  handler: (vm: any) => void
) {
  AddNavigationGuards(router, function (to, from, next) {
    if (isDialog(to)) {
      next(handler);
    }
  });
}
