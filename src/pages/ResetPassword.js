import React, { useState } from 'react'
import Button from '../components/Button'
import Modal from '../components/Modal'
import TextInput from '../components/TextInput'
import { postResetPassowordAPI } from '../api/api'

export default function ResetPassword({ token }) {
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')

  const handleSubmit = () => {
    const apiBody = {
      "password": password,
      "confirmPassword": confPassword,
      "token": token
    }

    postResetPassowordAPI(apiBody).then(res => {
      console.log('res', res)
    })
  }

  return (
    <Modal>
      <p className="text--md margin-0">Reset your password?</p>
      <br/> 
      <p>Enter your new password below.</p>
      <form onSubmit={handleSubmit}>
        <TextInput
          id="email-add"
          label="Password"
          placeholder="Enter new password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          warningMessage={password.length && 'password is required' }
        />
        <TextInput
          id="email-add"
          label="Confirm Password"
          placeholder="Confirm Password"
          onChange={(e) => setConfPassword(e.target.value)}
          value={confPassword}
          warningMessage={confPassword.length && 'password is required' }
        />
        <br/>
        <div className="text-center">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Modal>
  )
}
