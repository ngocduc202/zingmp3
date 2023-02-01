import React, { memo } from 'react'
import { ThreeDots } from 'react-loader-spinner'
const SearchLoading = () => {
  return (
    <ThreeDots
    height="60"
    width="60"
    radius="9"
    color="#4fa94d"
    ariaLabel="three-dots-loading"
    wrapperStyle={{}}
    wrapperClassName=""
    visible={true}
    />
  )
}

export default memo(SearchLoading)