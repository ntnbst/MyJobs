import React, { useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginAuthAPI } from '../api/api'
import Button from '../components/Button'
import Layout from '../components/Layout'
import Modal from '../components/Modal'
import TextInput from '../components/TextInput'
import { getUserRole, isUserLoggedIn } from '../localstorage'
import { ROUTE_AVAILABLE_JOBS, ROUTE_POSTED_JOBS } from '../routes/routes'

export default function Login() {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isSubmitClicked, setIsSubmitClicked] = useState(false)

  const isFormValidated = () => {
    if (!email) {
      return false
    }
    
    if (!password) {
      return false
    }

    return true

  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value.trim())
    setIsSubmitClicked(false)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    setIsSubmitClicked(false)
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    setIsSubmitClicked(true)
    if (isFormValidated()) {
      let apiBody = {
        email: email,
        password: password
      }

      loginAuthAPI(apiBody).then(res => {
        if (res.data.data.userRole == 0) { // recruiter
          history.push(ROUTE_POSTED_JOBS)
        } else {
          history.push(ROUTE_AVAILABLE_JOBS)
        }
        console.log('login', res)
      })
    }
  }

  if (isUserLoggedIn()) {
    if (getUserRole() == 0) { // 
      return <Redirect to={ROUTE_POSTED_JOBS} />
    } else {
      return <Redirect to={ROUTE_AVAILABLE_JOBS} />
    }
  }

  return (
    <Layout isAuthPage padding="4rem 1.6rem">
      <Modal>
        <p className="text--md margin-0">Login</p>
        <br/>
        <form onSubmit={handleLoginSubmit}>
          <TextInput
            id="email-add"
            label="Email Address"
            placeholder="Enter your email"
            onChange={handleEmailChange}
            value={email}
            warningMessage={isSubmitClicked && !email && 'Email is required' }
          />

          <TextInput
            id="password"
            type="password"
            label="Password"
            onChange={handlePasswordChange}
            value={password}
            placeholder="Enter your password"
            forgotPass="Forgot password"
            warningMessage={isSubmitClicked && !password && 'Password is required' }
          />
          <br/>
          <br/>
          <div className="text-center">
            <Button type="submit">Login</Button>
            <br/>
            <br/>
            <br/>
            <br/>
            <p>New to MyJobs? <Link to="/sign-up"> Create an account </Link></p>
          </div>
        </form>
      </Modal>
    </Layout>
  )
}
