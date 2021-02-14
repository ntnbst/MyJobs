import React, { useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerNewUserAPI } from '../api/api'
import Button from '../components/Button'
import Flex from '../components/Flex'
import Layout from '../components/Layout'
import Modal from '../components/Modal'
import TextInput from '../components/TextInput'
import { theme } from '../constants'
import { getUserRole, isUserLoggedIn, setAccessToken } from '../localstorage'
import { ROUTE_AVAILABLE_JOBS, ROUTE_LOGIN, ROUTE_POSTED_JOBS } from '../routes/routes'

export default function SignUp() {
  const history = useHistory()
  const [userRole, setUserRole] = useState(1)

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [skills, setSkills] = useState([])


  const handleSubmit = (e) => {
    e.preventDefault()

    const [firstName, lastName] = fullName.split(" ")
    let customizedFullName = firstName + lastName.toUpperCase()
    const apiBody = {
      "email": email,
      "userRole": userRole, // 0 = recruiter, 1 = candidate 
      "password": password,
      "confirmPassword": password,
      "name": customizedFullName,
      "skills": skills
    }

    registerNewUserAPI(apiBody).then(res => {
      console.log('res.data', res.data)
      if (res.data.data.userRole == 0) { // recruiter
        history.push(ROUTE_POSTED_JOBS)
      } else {
        history.push(ROUTE_AVAILABLE_JOBS)
      }
    })
  }

  console.log('userRole', userRole)

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
        <p className="text--md margin-0">Signup</p>
        <p>I'm a</p>
        <Button background={userRole == 0 ? theme.colors.primaryBlue : 'transparent'} color={userRole == 0 ? '#fff' : '#000'} onClick={() => setUserRole(0)}>Recruiter</Button>{" "}
        <Button background={userRole == 1 ? theme.colors.primaryBlue : 'transparent'} color={userRole == 1 ? '#fff' : '#000'}onClick={() => setUserRole(1)}>Candidate</Button>
        <br/>
        <form onSubmit={handleSubmit}>

          <TextInput
            id="full-name"
            label="Full Name*"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            placeholder="Enter your full name"
          />

          <TextInput
            id="email-add"
            label="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
          />

          <Flex gap="2rem">
            <TextInput
              id="password"
              type="password"
              label="Create Password*"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter your password"
            />

            <TextInput
              id="password-conf"
              type="password"
              label="Confirm Password*"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              placeholder="Confirm your password"
            />
          </Flex>

          <TextInput
            id="skills"
            label="Skills"
            onChange={(e) => setSkills(e.target.value)}
            value={skills}
            placeholder="Enter comma separated skills"
          />

          <div className="text-center">
            <Button type="submit">Signup</Button>
            <br/>
            <br/>
            <br/>
            <p>Have an Account? <Link to={ROUTE_LOGIN}>Login</Link></p>
          </div>
        </form>

        <br/>
        <br/>
      </Modal>
    </Layout>
  )
}
