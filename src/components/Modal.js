import React from 'react'

export default function Modal({ children, absolute, onDismiss, maxWidth="55rem" }) {
  return (
    <>
    {onDismiss && <div onClick={onDismiss} className="backdrop"></div>}
    <div className="modal">
      {onDismiss && <span onClick={onDismiss}>⤬</span>}
      {children}
    </div>
    <style jsx>{`
      .modal {
        background: #fff;
        border-radius: 20px;
        max-width: ${maxWidth};
        width: 100%;
        max-height: 73rem;
        min-height: 40rem;
        overflow: scroll;
        padding: 3rem;
        margin: 0 auto;
        box-shadow: 0px 30px 36px #557DA526;

        ${absolute && 
          `position: fixed;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);`}
      }

      .backdrop {
        position: fixed;
        height: 100%;
        width: 100%;
        background: rgba(0,0,0,0.6);
        left: 0;
        top: 0;
        z-index: 0;
      }

      span {
        position: absolute;
        top: 2rem;
        right: 2rem;
      }
    
    `}</style>
    </>
  )
}
