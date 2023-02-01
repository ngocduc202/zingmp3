import React, { memo } from 'react'
import { ThreeCircles } from 'react-loader-spinner'

const Loading = () => {
  return (
    <ThreeCircles
  height="60"
  width="60"
  color="#777777"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ariaLabel="three-circles-rotating"
  outerCircleColor=""
  innerCircleColor=""
  middleCircleColor=""
/>
  )
}

export default memo(Loading)