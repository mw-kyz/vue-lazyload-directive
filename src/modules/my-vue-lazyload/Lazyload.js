import Lazyimg from "./Lazyimg"
import { getScrollParent, throttle } from "./utils"

export default function Lazyload (Vue) {

  return class Lazy {
    constructor (options) {
       this.options = options
       this.isAddScrollListener = false // 防止重复绑定事件
       this.lazyImgPool = []
     }

    bindLazy (el, bindings, vnode) {
      Vue.nextTick(() => {
        const scrollParent = getScrollParent(el)

        if (scrollParent && !this.isAddScrollListener) {
          scrollParent.addEventListener('scroll', throttle.call(this, this.handleScroll, 100), false)
        }
        
        const lazyImg = new Lazyimg({
          el,
          src: bindings.value,
          options: this.options,
          imgRender: this.imgRender.bind(this)
        })

        this.lazyImgPool.push(lazyImg)
        // 先显示已经在可视区域的图片
        this.handleScroll()
      })
    }

    handleScroll () {
      let isVisble = false

      this.lazyImgPool.forEach(lazyImg => {
        if (!lazyImg.loaded) {
          isVisble = lazyImg.checkIsVisible()
          isVisble && lazyImg.loadImg()
        }
      })
    }

    imgRender (lazyImg, state) {
      const { el } = lazyImg
      let src = ''

      switch (state) {
        case 'loading':
          src = lazyImg.options.loading || ''
          break
        case 'error':
          src = lazyImg.options.error || ''
          break
        default:
          src = lazyImg.src
          break
      }

      el.setAttribute('src', src)
    }
  }
}