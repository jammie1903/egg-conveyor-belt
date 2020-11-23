import React from 'react'

const SquarePattern = ({id, fillColor, patternColor, chance}) => {
  const size = chance.integer({min: 8, max: 20})
  return (
    <pattern id={id} x={chance.integer({min: 0, max: 20})} y={chance.integer({min: 0, max: 20})} width={size*2} height={size*2} patternUnits="userSpaceOnUse">
      <rect x="0" y="0" width={size*2} height={size*2} fill={fillColor}/>
      <rect x="0" y="0" width={size} height={size} fill={patternColor}/>
      <rect x={size} y={size} width={size} height={size} fill={patternColor}/>
    </pattern>
  )
}

const squareRootOf2 = Math.sqrt(2)

const StripePattern = ({id, fillColor, patternColor, chance}) => {
  const size = chance.integer({min: 10, max: 70})
  const dir = chance.bool()
  return (
    <pattern id={id} x={0} y={0} width={size} height={size} patternUnits="userSpaceOnUse">
      <rect width={size} height={size} fill={fillColor}/>
      <g transform={dir ? `translate(${size}, 0) rotate(135)` : 'rotate(45)'}>
        <rect width={size * squareRootOf2} height={size / 2.8} fill={patternColor}/>
        <rect y={size / -1.4} width={size * squareRootOf2} height={size / 2.8} fill={patternColor}/>
      </g>
    </pattern>
  )
}

const CircleDiamondPattern = ({id, fillColor, patternColor, chance}) => {
  const size = chance.integer({min: 15, max: 30})
  return (
    <pattern id={id} x={chance.integer({min: 0, max: 30})} y={chance.integer({min: 0, max: 30})} width={size*2} height={size*2} patternUnits="userSpaceOnUse">
      <rect width={size*2} height={size*2} fill={fillColor}/>
      <circle cx={size} cy={size} r={size} fill={patternColor}/>
      <path d={`M0 ${size} A${size} ${size} 45 0 0 ${size} 0 A${size} ${size} 315 0 0 ${size*2} ${size} A${size} ${size} 45 0 0 ${size} ${size*2} A${size} ${size} 270 0 0 0 ${size}Z`} fill={fillColor}/>
    </pattern>
  )
}


const CirclePattern = ({id, fillColor, patternColor, chance}) => {
  const size = chance.integer({min: 8, max: 25})
  return (
    <pattern id={id} x={chance.integer({min: 0, max: 25})} y={chance.integer({min: 0, max: 25})} width={size*2} height={size*2} patternUnits="userSpaceOnUse">
      <rect x="0" y="0" width={size*2} height={size*2} fill={fillColor}/>
      <circle cx={size * 0.5} cy={size * 0.5} r={size / 2} fill={patternColor}/>
      <circle cx={size * 1.5} cy={size * 1.5} r={size / 2} fill={patternColor}/>
    </pattern>
  )
}

const mmtRed = '#e2231a'

const MmtPattern = ({id, fillColor, patternColor, chance, small}) => {
  // enforce brand colours 2/3rds of the time
  if(chance.integer({min: 0, max: 2}) !== 0) {
    const inverse = chance.bool()
    fillColor = inverse ? 'white' : mmtRed
    patternColor = inverse ? mmtRed : 'white'
  }

  return (
    <pattern id={id} x={0} y={0} width={1} height={1} patternUnits="objectBoundingBox">
      <rect x={0} y={0} width={200} height={200} fill={fillColor}/>
      <g transform={`scale(${0.65 / (small ? 2.5 : 1)}) translate(20, 90)`}>
        <path fill={patternColor} d="M56.1,54.9c-11.7,32.2-28.7,48-42.6,53L0,94.5c5.7-7,13.4-19.2,20.8-39.7C34.5,17.5,55.6,1.4,71.6,0l10,10
          C74.4,17,64.7,31.1,56.1,54.9"></path>
        <path fill={patternColor} d="M100.1,54.9c-11.7,32.2-28.7,48-42.6,53L44,94.5c5.7-7,13.4-19.2,20.8-39.7C78.5,17.5,99.6,1.4,115.6,0l10,10
          C118.4,17,108.7,31.1,100.1,54.9"></path>
        <path fill={patternColor} d="M144.1,54.9c-11.7,32.2-28.7,48-42.6,53L88,94.5c5.7-7,13.4-19.2,20.8-39.7C122.5,17.5,143.6,1.4,159.6,0
          l10,10C162.4,17,152.7,31.1,144.1,54.9"></path>
      </g>
    </pattern>
  )
}

const getPattern = (seed, small) => {
  // eslint-disable-next-line no-undef
  const chance = new Chance(seed)

  const hue = chance.integer({min: 0, max: 360})
  let variation = chance.integer({min: 40, max: 80}) * (chance.bool() ? 1 : -1)
  if(variation < 0) variation += 360
  const fillColor = `hsl(${hue}, ${chance.integer({min: 0, max: 100})}%, ${chance.integer({min: 25, max: 75})}%)`
  const patternColor = `hsl(${hue + variation}, ${chance.integer({min: 25, max: 100})}%, ${chance.integer({min: 50, max: 100})}%)`

  const Pattern = chance.pickone([SquarePattern, CirclePattern, CircleDiamondPattern, StripePattern, MmtPattern])
  return <Pattern id={`Pattern-${seed}`} chance={chance} fillColor={fillColor} patternColor={patternColor} small={small}/>
}

const Pattern = ({seed, small}) => {
  const pattern = getPattern(seed, small)

  return <svg height='100%' width='100%'>
    {pattern}
    <rect fill={`url(#Pattern-${seed})`} height='100%' width='100%'/>
  </svg>
}

export default Pattern