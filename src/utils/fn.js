export const getArrSlider = (start ,end ,number) =>{
  const limit =start >end ?number : end
  let ouput = []

  for(let i =start ; i<=limit ;i++)
  {
      ouput.push(i)
  }
  if(start >end)
  {
    for(let i =0 ; i<=end ;i++)
  {
      ouput.push(i)
  }
  }
  return ouput
}

export const handleNumber = number => {
    if(number > Math.pow(10,6)){
      return `${Math.round( number * 10/ Math.pow(10,6)) / 10}M`
    }
    else if(number <1000)
    {
      return number
    }
    else{
      return `${Math.round( number * 10/ Math.pow(10,3)) / 10}K`
    }
}