import React from 'react'
import { theme } from '../constants'

export default function Button({ children, type="button", onClick, background=theme.colors.primaryBlue, color="#fff" }) {
  return (
    <button type={type} onClick={onClick}>
      {children}
      <style jsx>{`
        button {
          font-size: 1.6rem;
          padding: 1.3rem 3rem;
          min-width: 14.6rem;
          height: 4.6rem;
          background: ${background};
          outline: none;
          border-radius: 5px;
          color: ${color};
          border: ${background == 'transparent' ? `1px solid ${theme.colors.primaryBlue}` : 'none'};
          cursor: pointer;
        }
        
      `}
      </style>
    </button>
  )
}
