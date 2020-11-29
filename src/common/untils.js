export function debounce(func, delay) {
  // 防抖函数的编写
  let timer = null
  return function(...arges) {
    if(timer) clearTimeout(timer)

    timer = setTimeout(() => {
      func.apply(this, arges)
    }, delay)
  }
}