import React from 'react'

export default function Hero({children, hero}) {
  return (
    <header className={hero}>
      {children}
    </header>
  )
}

Hero.defaultProps = {
  hero: 'defaultHero'
}

//by passing in hero as a prop I get the option to change the className each time Hero component is rendered. 'hero' provides access to different css classes in the app.css