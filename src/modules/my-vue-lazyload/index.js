import Lazyload from './Lazyload'

const MyVueLazyload = {
  install (Vue, options) {

    const LazyClass = Lazyload(Vue)
    const lazyload = new LazyClass(options)

    Vue.directive('lazy', {
      // el bindings vnode
      bind: lazyload.bindLazy.bind(lazyload)
    })
  }
}

export default MyVueLazyload