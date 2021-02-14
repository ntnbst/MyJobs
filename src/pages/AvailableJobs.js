import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { applyForAJob, getAllAvailableJobs } from '../api/api'
import Grid from '../components/Grid'
import JobDetailCard from '../components/JobDetailCard'
import Layout from '../components/Layout'
import { ROUTE_APPLIED_JOBS } from '../routes/routes'

export default function AvailableJobs() {
  const history = useHistory()
  const [availableJobs, setAvailableJobs] = useState(null)

  useEffect(() => {
    getAllAvailableJobs().then(res => {
      setAvailableJobs(res.data.data)
      console.log('all jobs', res)
    })
  }, [])

  const handleApplyForJob = (jobId) => {
    const apiBody = {
      "jobId": jobId
    }
    console.log('api body', apiBody)
    applyForAJob(apiBody).then(res => {
      history.push(ROUTE_APPLIED_JOBS)
      console.log(`applied!!! to ${jobId}`, res.data)
    })
  }

  if (availableJobs == null) return 'Loading...'

  return (
    <Layout headerCTAOptions={[ {text: 'Applied Jobs', cta: ROUTE_APPLIED_JOBS} ]} sectionalBgHeight="15rem" padding="4rem 1.6rem">
      <p className="margin-0 text-white">Home</p>
      <h1 className="text--md text-white">Jobs For you</h1>
      <Grid col={4}>
        {availableJobs.map(job => (
          <JobDetailCard isCandidate onClickCTA={() => handleApplyForJob(job.id)} jobDetails={job} />
        ))}
      </Grid>
    </Layout>
  )
}
