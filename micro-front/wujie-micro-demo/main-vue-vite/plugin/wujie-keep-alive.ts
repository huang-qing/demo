// 主系统-main.js

// 在主系统中将此方法通过props暴露给子系统
function renderVue (instance, appPrefix, { Vue, App, _window, ...options } = {}) {
    if (instance) {
      const cachedInstance = instance.cachedInstance || instance
      const catchVue = cachedInstance.catchVue
      instance = new Vue({
        ...options,
        render: () => cachedInstance._vnode
      })
      // 复写路由对象
      instance.$router.app = catchVue.$router.app = catchVue
      instance.$router.apps = catchVue.$router.apps = [catchVue]
      instance.$router.onReady(() => {
        // 清除组件库副作用
        try {
          catchVue.$Notice.destroy()
          catchVue.$message.destroy()
        } catch (error) {
          console.log('clear catch error:', error)
        }
        cachedInstance._vnode.data.keepAlive = false
        // instance.cachedInstance = instance
        // 兼容错误url：/a/?b
        const path = '/' + (read('lastRouterPath') || location.pathname + location.search).replace(appPrefix, '')
        if (path !== cachedInstance.$router.leavePath) {
          catchVue.$router.push(path)
          instance.$router.push(path)
        } else {
          cachedInstance.$router.replace('/').then((res) => {
            if (res.name === '404') {
              throw new Error('Current router is not have: ' + res.path)
            }
            catchVue.$router.replace(path)
          })
          instance.$router.replace('/').then((res) => {
            instance.$router.replace(path)
          })
        }
      })
      instance.$mount('#app')
    } else {
      instance = new Vue({
        ...options,
        render: (h) => h(App)
      }).$mount('#app')
    }
    if (_window) {
      // 迫使子系统关闭弹窗
      const event = new Event('click', { bubbles: true, cancelable: true, composed: true })
      _window.document.body.dispatchEvent(event)
      window.SH_ACTIVE_WINDOW = _window
      // 监听子系统body变更(缓存app之外的dom)
      const catchNode = _window.__WUJIE_RAW_WINDOW__.__WUJIE.bodyElements || []
      const Observer = new MutationObserver(records => {
        records.forEach(record => {
          record.addedNodes.forEach(node => {
            catchNode.push(node)
          })
          record.removedNodes.forEach(node => {
            const index = catchNode.findIndex(c => c === node)
            if (index > -1) catchNode.splice(index, 1)
          })
        })
      })
      Observer.observe(_window.document.body, {
        childList: true,
        subtree: false
      })
      // 同步容器路由
      _window?.$wujie?.bus?.$on('pub-route-change', (prefix, path) => {
        if (prefix === appPrefix) {
          const cachedInstance = instance.cachedInstance || instance
          const _path = '/' + path.replace(appPrefix, '')
          try {
          // 用最初始路由进行跳转
            options.router.push(_path)
            cachedInstance.$router.apps[0].$router.push(_path)
          } catch (error) {
            console.warn(prefix, ': ', path, '跳转失败', error)
          }
        } else {
          Observer.disconnect()
        }
      })
    } else {
      const app = common.state.microApp.find(app => app.routerPrex === appPrefix)
      console.warn(`app prefix "${app?.systemCode || appPrefix}" is not have "_window" !`)
    }
    return instance
  }