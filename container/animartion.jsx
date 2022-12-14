import { useEffect, useRef, useState } from 'react'
const randomNum = (min, max) => {
  const range = max - min
  return Math.floor(Math.random() * range) + min
}
export default function AnimationLove() {
  const [count, setCount] = useState(0)
  const likeRef = useRef()
  const timerRef = useRef()
  const [transform, setTransform] = useState(`scale(${randomNum(4, 5)})`)
  const [transition, setTransition] = useState('none')

  useEffect(() => {}, [])

  const reset = () => {
    setTransform(`scale(${randomNum(4, 5)})`)
    setTransition('none')
  }
  if (timerRef.current) window.clearTimeout(timerRef.current)
  timerRef.current = window.setTimeout(() => {
    console.log(count)
  }, 5000)
  const handleClick = () => {
    const ss = randomNum(18, 4)
    const rz = randomNum(-90, 190)
    const ty = randomNum(80, 100)
    setTransform(`scale(${ss}) rotateZ(${rz}deg) translateY(-${ty}px)`)
    setTransition('transform 1s')
    window.setTimeout(reset, 1000)
  }
  return (
    <div className='wrap'>
      <div
        className='like'
        ref={likeRef}
        style={{
          transform,
          transition
        }}
      >
        ❤️
      </div>
      <div className='btn' onClick={handleClick}>
      </div>
    </div>
  )
}
