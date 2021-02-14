import React from 'react'
import Navbar from './Navbar'

export default function Layout({ isAuthPage, headerCTAOptions, children, padding="2rem 1.6rem", sectionalBgHeight="35rem" }) {
  return (
    <>
      <Navbar isAuthPage={isAuthPage} headerCTAOptions={headerCTAOptions} />
      <div className="layout">
        <div className="top-sectional-background"></div>
        <div className="inner-layout">
          {children}
        </div>

        <style jsx>{`

          .top-sectional-background {
            background: linear-gradient(248deg, #303f60 0%,#1A253C 100%) 0% 0% no-repeat padding-box;
            position: absolute;
            top: 0;
            height: ${sectionalBgHeight};
            width: 100%;
            z-index: -1;
          }

          .layout {
            position: relative;
            background: #EDF6FF;
            z-index: 3;
            min-height: 100vh;
            // background: linear-gradient(248deg, #303f60 0%,#1A253C 100%) 0% 0% no-repeat padding-box;
          }

          
          
          .inner-layout {
            max-width: 110rem;
            padding: ${padding};
            margin: 0 auto;
          }
          
        `}
        </style>
      </div>
    </>
  )
}
