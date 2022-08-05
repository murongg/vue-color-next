import type { Ref } from 'vue'

export function mouseChange(e: MouseEvent | TouchEvent, skip = false, container: Ref<HTMLElement | null>) {
  !skip && e.preventDefault()
  if (!container.value) {
    // for some edge cases, container may not exist. see #220
    return
  }

  const containerWidth = container.value.clientWidth
  const containerHeight = container.value.clientHeight

  const xOffset = container.value.getBoundingClientRect().left + window.pageXOffset
  const yOffset = container.value.getBoundingClientRect().top + window.pageYOffset
  const pageX = e instanceof MouseEvent ? e.pageX : (e.touches ? e.touches[0].pageX : 0)
  const pageY = e instanceof MouseEvent ? e.pageY : (e.touches ? e.touches[0].pageY : 0)
  return {
    containerWidth,
    containerHeight,
    xOffset,
    yOffset,
    pageX,
    pageY,
  }
}
