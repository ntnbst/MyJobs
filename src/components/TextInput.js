import React from 'react'
import { theme } from '../constants'

export default function TextInput({ id, type="text", value, onChange, label, placeholder, warningMessage }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input value={value} onChange={onChange} id={id} type={type} placeholder={placeholder} />
      <small>{warningMessage}</small>

      <style jsx>{`
        input {
          width: 100%;
          display: block;
          border: 0;
          border: 1px solid ${warningMessage ? '#ff0000' : '#C6C6C6'};
          font-size: 1.6rem;
          padding: 1.5rem 1.7rem;
          margin-top: .8rem;
          border-radius: 5px;
          outline: 0;
          background: #E8E8E833;
        }

        label {
          color: ${theme.colors.darkBlue1};
        }

        input:focus {
          border: 1px solid ${theme.colors.primaryBlue};
        }

        div {
          margin: 2rem 0;
          width: 100%;
        }

        small {
          display: block;
          text-align: right;
          color: #ff0000;
          visibility: ${warningMessage ? 'visible' : 'hidden'};
        }
      
      `}
      </style>
    </div>
  )
}
