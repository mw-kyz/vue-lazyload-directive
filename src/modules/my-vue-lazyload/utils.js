export function getScrollParent (el) {
  let _parent = el.parentNode

  while (_parent) {
    if (_parent === document) {
      throw Error('请给所有图片的共同父级设置overflow: scroll|auto 属性')
    }
    const styleOverflow = getComputedStyle(_parent)['overflow']

    if (/(scroll)|(auto)/.test(styleOverflow)) {
      return _parent
    }

    _parent = _parent.parentNode
  }
}

export function imgLoad (src) {
  return new Promise((resolve, reject) => {
    const oImg = new Image()
    oImg.src = src
    oImg.onload = resolve
    oImg.onerror = reject
  })
}

// 函数节流
export function throttle(fn, delay) {
  let t = null,
      begin = new Date().getTime();
  
  const _self = this

  return function() {
    const args = arguments,
          cur = new Date().getTime();

    clearTimeout(t);

    if(cur - begin >= delay) {
      fn.apply(_self, args);
      begin = cur;
    }else {
      t = setTimeout(function() {
        fn.apply(_self, args);
      }, delay);
    }
  }
}