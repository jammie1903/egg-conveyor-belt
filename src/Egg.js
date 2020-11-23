import React from 'react'
import Pattern from './Pattern'

const createDesign = (small, seed) => {
  return <Pattern seed={seed || (Math.random() * 10000000).toFixed()} small={small}/>
}

const Egg = ({visible, seed, small}) => {
  const [design, setDesign] = React.useState(createDesign(small, seed))

  const updateDesign = () => {
    setDesign(createDesign(small))
  }

  return (
    <div className="egg" onAnimationIteration={seed ? undefined : updateDesign} style={{opacity: visible ? 1 : 0}}>
      <div className='design'>
        {design}
      </div>
      <div className="light"></div>
    </div>
  )
}

export default Egg