import React from 'react'

export default function Flex({ align="center", justify="start", gap="0", children }) {
  return (
    <div>
      {children}

      <style jsx>{`
        div {
          display: flex;
          align-items: ${align};
          justify-content: ${justify};
          grid-gap: ${gap};
        }
      
      `}
      </style>
    </div>
  )
}
