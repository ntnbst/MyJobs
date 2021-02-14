import React, { useState } from 'react'
import Button from '../components/Button'
import Layout from '../components/Layout'
import Modal from '../components/Modal'
import TextInput from '../components/TextInput'
import { forgotPasswordAPI } from '../api/api'
import ResetPassword from './ResetPassword'
import { isUserLoggedIn, getUserRole } from '../localstorage'
import { Redirect } from 'react-router-dom'
import { ROUTE_APPLIED_JOBS, ROUTE_POSTED_JOBS } from '../routes/routes'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [showResetPassword, setShowResetPassword] = useState(false)

  const [tokenFromResetPassword, setToekenFormResetPassword] = useState('')

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    const queryParams = {
      email: email
    }
    forgotPasswordAPI(email).then(res => {
      console.log('res', res)
      if (res.data.success) {
        // this api is not returning any token, don't know what to do further
        setShowResetPassword(true)
        setToekenFormResetPassword('')
      }
    })
  }

  if (isUserLoggedIn()) {
    if (getUserRole() == 0) {
      return <Redirect to={ROUTE_POSTED_JOBS} />
    } else {
      return <Redirect to={ROUTE_APPLIED_JOBS} />
    }
  }

  return (
    <Layout isAuthPage padding="4rem 1.6rem">
      {!showResetPassword 
        ? <Modal>
            <p className="text--md margin-0">Forgot your password?</p>
            <br/> 
            <p>Enter the email associated with your account and we’ll send you instructions to reset your password.</p>
            <form onSubmit={handleEmailSubmit}>
              <TextInput
                id="email-add"
                label="Email Address"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                warningMessage={email.length && !email.includes('@') && 'Email is required' }
              />
              <br/>
              <div className="text-center">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Modal>
        : <ResetPassword token={tokenFromResetPassword} />}
    </Layout>
  )
}
