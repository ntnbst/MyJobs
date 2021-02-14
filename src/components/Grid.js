import React from 'react'

export default function Grid({ col=3, children, gap="1.6rem", justify="start", align="start" }) {
  return (
    <div>
      {children}
      <style jsx>{`
        div {
          display: grid;
          grid-template-columns: repeat(${col}, 1fr);
          align-items: ${align};
          justify-items: ${justify};
          grid-gap: ${gap};
        }
      
      `}
      </style>
    </div>
  )
}
