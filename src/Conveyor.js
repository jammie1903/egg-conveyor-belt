import React from 'react'
import Egg from './Egg'


const useTimer = (step, onStep) => {
  const [steps, setSteps] = React.useState(0)
  React.useEffect(() => {
    const interval = setInterval(() => {
      onStep && onStep(steps+1)
      setSteps(steps+1)
    }, step);
    return () => clearInterval(interval);
  }, [onStep, setSteps, step, steps]);
  return steps
}

const Conveyor = () => {
  const step = useTimer(5000)
  
  return (
    <div className="conveyor">
      <Egg key={0} visible={step >= -1}/>
      <Egg key={1} visible={step >= 0}/>
      <Egg key={2} visible={step >= 1}/>
      <Egg key={3} visible={step >= 2}/>
      <Egg key={4} visible={step >= 3}/>
    </div>
  )
}

export default Conveyor
