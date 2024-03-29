/* eslint-disable consistent-return */
import { useState, useEffect } from 'react'

import { useStickyState } from '../../context/contextsticky'

function useSentinelOffsets () {
  const [bottomSentinelHeight] = useState('')
  const [topSentinelMarginTop] = useState('')

  // Move the sentinel up by the top margin of the sticky component

  return { bottomSentinelHeight, topSentinelMarginTop }
}

/**
 * Observe the TOP sentinel and dispatch sticky events
 * @param {React.MutableRefObject<T>} topSentinelRef Ref to underlying TOP sentinel
 */
// https://developers.google.com/web/updates/2017/09/sticky-headers
function useObserveTopSentinels (
  topSentinelRef,
  {
    /**
     * @param {Function} onStuck dispatched when TOP sentinel is unstuck
     * @param {Function} onUnstuck dispatched when TOP sentinel is stuck
     * @param {Function} onChange dispatched when TOP sentinel is either stuck or unstuck
     */
    events: { onStuck, onUnstuck, onChange }
  }
) {
  const { stickyRefs, containerRef } = useStickyState()

  useEffect(() => {
    if (!containerRef) return
    if (!containerRef.current) return

    const root = containerRef.current
    const options = { threshold: [0], root }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const target = stickyRefs.get(entry.target)
        const targetInfo = entry.boundingClientRect
        const rootBoundsInfo = entry.rootBounds

        let type
        // Started sticking.
        if (targetInfo.bottom < rootBoundsInfo.top) {
          type = 'stuck'
          onStuck(target)
        }

        // Stopped sticking.
        if (
          targetInfo.bottom >= rootBoundsInfo.top &&
          targetInfo.bottom < rootBoundsInfo.bottom
        ) {
          type = 'unstuck'
          onUnstuck(target)
        }

        type && onChange({ type, target })
      })
    }, options)

    const sentinel = topSentinelRef.current
    sentinel && observer.observe(sentinel)
    return () => {
      observer.unobserve(sentinel)
    }
  }, [topSentinelRef, onChange, onStuck, onUnstuck, stickyRefs, containerRef])
}

/**
 * Observe the BOTTOM sentinel and dispatch sticky events
 * @param {React.MutableRefObject<T>} topSentinelRef Ref to underlying BOTTOM sentinel
 */
function useObserveBottomSentinels (
  bottomSentinelRef,
  {
    /**
     * @param {Function} onStuck dispatched when TOP sentinel is unstuck
     * @param {Function} onUnstuck dispatched when TOP sentinel is stuck
     * @param {Function} onChange dispatched when TOP sentinel is either stuck or unstuck
     */ events: { onStuck, onUnstuck, onChange }
  }
) {
  const { stickyRefs, containerRef } = useStickyState()

  useEffect(() => {
    if (!containerRef) return
    if (!containerRef.current) return

    const root = containerRef.current
    const options = { threshold: [1], root }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const target = stickyRefs.get(entry.target)
        const targetRect = target.getBoundingClientRect()
        const bottomSentinelRect = entry.boundingClientRect
        const rootBounds = entry.rootBounds
        const intersectionRatio = entry.intersectionRatio

        let type

        if (
          bottomSentinelRect.top >= rootBounds.top &&
          bottomSentinelRect.bottom <= rootBounds.bottom &&
          intersectionRatio === 1 &&
          targetRect.y === 0
        ) {
          type = 'stuck'
          onStuck(target)
        }

        if (bottomSentinelRect.top <= rootBounds.top) {
          type = 'unstuck'
          onUnstuck(target)
        }

        type && onChange({ type, target })
      })
    }, options)

    const sentinel = bottomSentinelRef.current
    sentinel && observer.observe(sentinel)
    return () => {
      observer.unobserve(sentinel)
    }
  }, [
    bottomSentinelRef,
    onChange,
    onStuck,
    onUnstuck,
    stickyRefs,
    containerRef
  ])
}

export {
  useSentinelOffsets,
  useObserveTopSentinels,
  useObserveBottomSentinels
}
