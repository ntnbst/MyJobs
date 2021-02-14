import React, { useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { getAlreadyAppliedJobs } from '../api/api'
import Button from '../components/Button'
import Grid from '../components/Grid'
import JobDetailCard from '../components/JobDetailCard'
import Layout from '../components/Layout'
import { getUserRole } from '../localstorage'
import { ROUTE_AVAILABLE_JOBS, ROUTE_POSTED_JOBS } from '../routes/routes'

export default function AppliedJobs() {
  
  const [appliedJobs, setAppliedJobs] = useState(null)

  useEffect(() => {
    getAlreadyAppliedJobs().then(res => {
      setAppliedJobs(res.data.data)
      console.log('already applied jobs', res.data)
    })
  }, [])

  if (getUserRole() == 0) {
    return <Redirect to={ROUTE_POSTED_JOBS} />
  }

  if (appliedJobs == null) return 'Loading...'

  return (
    <Layout headerCTAOptions={[ {text: 'Apply For a job', cta: ROUTE_AVAILABLE_JOBS} ]} sectionalBgHeight="15rem" padding="4rem 1.6rem">
      <p className="margin-0 text-white">Home &gt; Applied Jobs</p>
      <h1 className="text--md text-white">Jobs applied by you</h1>
      {appliedJobs.msg 
        ? <NoJobsAppliedPlaceholder />
        : <Grid col={4}>
          {appliedJobs.map(job => (
            <JobDetailCard alreadyAplied isCandidate onClickCTA={() => {}} jobDetails={job} />
          ))}
          </Grid>}
    </Layout>
  )
}

const NoJobsAppliedPlaceholder = () => {
  const history = useHistory()
  return (
    <div>
      <p className="text--md">Your applied jobs will show here.</p>
      <Button onClick={() => history.push(ROUTE_AVAILABLE_JOBS)}>See All jobs</Button>


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
