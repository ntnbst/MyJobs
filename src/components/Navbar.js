import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { theme } from '../constants'
import { clearAccessToken, getUserName, isUserLoggedIn } from '../localstorage'
import { ROUTE_LOGIN } from '../routes/routes'
import Button from './Button'
import Flex from './Flex'

export default function Navbar({ isAuthPage, headerCTAOptions }) {
  const history = useHistory()
  return (
    <header className="nav-wrapper">
      <nav className="navbar">
        <h1 style={{ cursor: 'pointer' }} onClick={() => history.push('/')}>My<span>Jobs</span></h1>
        <Flex>
          <div>{typeof headerCTAOptions !== 'undefined' && headerCTAOptions.map(op => <Link style={{ color: '#fff', marginRight: '2rem' }} to={op.cta}>{op.text}</Link>)}</div>
          {isUserLoggedIn() ? <ProfileButton name={getUserName()} /> : !isAuthPage && <Button onClick={() => history.push(ROUTE_LOGIN)} background="transparent">Login/Signup</Button>}
        </Flex>
      </nav>

      <style jsx>{`
        .nav-wrapper {
          // background: ${theme.colors.darkBlue1};
          background: linear-gradient(248deg, #303f60 0%, #1A253C 100%) 0% 0% no-repeat padding-box;

          color: #fff;
        }
        .navbar {
          max-width: 125rem;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        }

        span {
          color: ${theme.colors.primaryBlue};
        }
      
      `}
      </style>
    </header>
  )
}


const ProfileButton = ({ name }) => {

  const onClickLogout = () => {
    clearAccessToken()
    toast('You have successfully logged out.')
    setTimeout(() => {
      window.location.href = '/'
    }, 1000);
  }

  console.log('name', name)

  return (
    <div className="profile-btn">
      <Flex justify="space-between">
        <p className="margin-0">{name.substr(0,1).toUpperCase()}</p>
        <span className="drop">◣</span>
      </Flex>

      <div onClick={onClickLogout} className="logout-btn">
        <span className="margin-0">Logout</span>
      </div>

      <style jsx>{`
        .profile-btn {
          cursor: pointer;
          position: relative;
          margin-top: 1rem;
          padding-bottom: 1rem;
        }

        .profile-btn p {
          width: 5rem;
          height: 5rem;
          border-radius: 50%;
          font-size: 1.8rem;
          display: grid;
          place-items: center;
          background: rgba(217, 239, 255, 1);
          color: rgba(48, 63, 96, 1);
        }

        .drop {
          transform: rotate(-45deg);
          margin-left: 1rem;
          font-size: 1.2rem;
        }
        
        .profile-btn:hover .logout-btn {
          display: block;
        }

        .logout-btn {
          background: #fff;
          // display: block;
          width: 14rem;
          color: #000;
          position: absolute;
          z-index: 11;
          padding: 1rem;
          right: 0;
          border-radius: 4px;
          display: none;
          margin-top: 1rem;
        }
      
      `}
      </style>
    </div>
  )
}
