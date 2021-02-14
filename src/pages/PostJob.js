import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getPostedJobsAPI, postJobAPI } from '../api/api'
import Button from '../components/Button'
import Layout from '../components/Layout'
import Modal from '../components/Modal'
import TextInput from '../components/TextInput'
import { theme } from '../constants'
import { ROUTE_POSTED_JOBS } from '../routes/routes'

export default function PostJob() {

  const history = useHistory()
  const [isSubmitClicked, setIsSubmitClicked] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')

  const isFormValidated = () => {
    if (!title) {
      return false
    }
    
    if (!description) {
      return false
    }

    if (!location) {
      return false
    }

    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitClicked(true)
    if (isFormValidated()) {
      const apiBody = {
        "title": title,
        "description": description,
        "location": location
      }

      postJobAPI(apiBody).then(res => {
        console.log('posting job res', res)
        history.push(ROUTE_POSTED_JOBS)
      })
    }
  }
  return (
    <Layout headerCTAOptions={[ {text: 'Posted Jobs by you', cta: ROUTE_POSTED_JOBS} ]} padding="4rem 1.6rem">
      <p className="margin-0 text-white">Home &gt; Post a Job</p>
      <Modal>
        <p className="text--md margin-0">Post a Job</p>
        <form onSubmit={handleSubmit}>
          <TextInput
            id="titleForJob"
            label="Job Title*"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Enter a job title"
            warningMessage={isSubmitClicked && !title && 'Title is required for the job' }
          />

          <p>Description*</p>
          <textarea rows="6" onChange={(e) => setDescription(e.target.value)} placeholder="Enter Job description" id="description">{description}</textarea>
          <div style={{ color: 'red', textAlign: 'right', fontSize: '1.4rem' }}>
            <span>{isSubmitClicked && !description && 'description is required for the job' }</span>
          </div>
          <TextInput
            id="location"
            label="Location*"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            placeholder="Enter location"
            warningMessage={isSubmitClicked && !title && 'Location is required for the job' }
          />

          <br/>
          <div className="text-center">
            <Button type="submit">Post</Button>
            <br/>
          </div>
        </form>
      </Modal>

      <style jsx>{`
        textarea {
          width: 100%;
          font-size: 1.6rem;
          resize: none;
          padding: 1rem;
          border-radius: 5px;
          border: 1px solid #C6C6C6;
          background: #E8E8E833;
          outline: none;
        }
        textarea:focus {
          border: 1px solid ${theme.colors.primaryBlue};
        }
      `}
      </style>
    </Layout>
  )
}
