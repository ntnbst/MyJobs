import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { getCandidatesPerJob, getPostedJobsAPI } from '../api/api'
import JobDetailCard from '../components/JobDetailCard'
import Grid from '../components/Grid'
import Modal from '../components/Modal'
import Flex from '../components/Flex'
import FilePlaceholder from '../assets/file-placeholder.svg'
import { ROUTE_POST_JOB } from '../routes/routes'
import Button from '../components/Button'
import { useHistory } from 'react-router-dom'

export default function PostedJobs() {

  const [postedJobs, setPostedJobs] = useState(null)
  const [selectedJob, setSelectedJob] = useState(null)

  const [showCandidatesPerJob, setShowCandidatesPerJob] = useState(false)

  useEffect(() => {
    getPostedJobsAPI().then(res => {
      setPostedJobs(res.data)
    })
  }, [])

  const handleOnClickViewApplicants = (jobId) => {
    setSelectedJob(jobId)
    setShowCandidatesPerJob(true)
  }

  console.log('posted jobs', postedJobs)

  if (postedJobs == null) return <h1>Loading...</h1>

  return (
    <Layout sectionalBgHeight="15rem" padding="4rem 1.6rem">
      <h1 className="text--md text-white">Job Posted by you</h1>
      <p>Home</p>
      {postedJobs.message 
      ? <NoJobsPostedPlaceholder />
      : <Grid col={4}>
        {postedJobs.data.data.map(job => (
          <JobDetailCard onClickCTA={() => handleOnClickViewApplicants(job.id)} jobDetails={job} />
        ))}
      </Grid>}


      {showCandidatesPerJob && <CandidatesPerJob jobId={selectedJob} onDismiss={() => setShowCandidatesPerJob(false)} />}

    </Layout>
  )
}



const CandidatesPerJob = ({ jobId, onDismiss }) => {
  const [candidates, setCandates] = useState(null)
  useEffect(() => {
    getCandidatesPerJob(jobId).then(res => {
      setCandates(res.data)
      console.log('candidates per job', res.data)
    })
  }, [])

  if (candidates == null) return 'loading...'
  return (
    <Modal maxWidth="69rem" absolute onDismiss={onDismiss}>
      <h1>Applicants for this job</h1>
      <hr/>
      <p>Total {candidates.message ? candidates.data.length : 'number of app'} Applicants</p>

      <div className="candidates-wrapper">
        {candidates.message
          ? <NoApplicantsAvailablePlaceholder />
          : <>
            {/* {jobId} */}
            <Grid col={2}>
            {candidates.data.map(candidate => (
              <ApplicantCard candidate={candidate} />
            ))}
            </Grid>
              
          </>}
      </div>
      <style jsx>{`
        h1 {
          font-size: 1.9rem;
          margin: 0;
        }

        .candidates-wrapper {
          height: 100%;
          width: 100%;
          background: rgba(169, 175, 188, 0.2);
          padding: .8rem;
          border-radius: 10px;
        }
      
      `}
      </style>

    </Modal>
  )
}

const ApplicantCard  = ({ candidate }) => {
  const {email, id, name, skills} =  candidate
  return (
    <div className="ApplicantCard">
      <Flex>
        <div className="applicant-profile">{name.substr(0,1).toUpperCase()}</div>
        <div>
          <p className="margin-0">{name}</p>
          <p style={{ marginTop: '1rem' }} className="margin-0">{email}</p>
        </div>
      </Flex>

      <p>Skills</p>
      <p className="text-md margin-0">
        {skills}
      </p>

      <style jsx>{`
        .ApplicantCard {
          background: #fff;
          border: 1px solid #303F6080;
          width: 100%;
          padding: 1.4rem;
          border-radius: 5px;
        }

        .applicant-profile {
          background: #D9EFFF;
          border-radius: 50%;
          display: grid;
          place-items: center;
          width: 5rem;
          height: 5rem;
          margin-right: 1.2rem;
        }
      
      `}
      </style>
    </div>
  )
}


const NoApplicantsAvailablePlaceholder = () => {
  return (
    <div>
      <img src={FilePlaceholder} />
      <h4>No Applicants available</h4>

      <style jsx>{`
        div {
          // height: 100%;
          // width: 100%;
          padding: 4rem 1rem;
          text-align: center;

        }

        img {
          width: 8rem;
          height: auto;
        }
      
      
      `}</style>
    </div>
  )
}


const NoJobsPostedPlaceholder = () => {
  const history = useHistory()
  return (
    <div>
      <p className="text--md">Your posted jobs will show here!</p>
      <Button onClick={() => history.push(ROUTE_POST_JOB)}>Post a Job</Button>


      <style jsx>{`
        div {
          height: 85vh;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
      
      
      `}
      </style>
    </div>
  )
}