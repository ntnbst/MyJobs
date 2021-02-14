import React from 'react'
import Flex from './Flex'
import Modal from './Modal'

export default function JobDetailCard({ jobDetails, onClickCTA, isCandidate, alreadyAplied }) {
  const { title, description, location, id } = jobDetails
  return (
    <div className="job-detail-card">
      <h1 className="margin-0 text--sm">{title}</h1>
      <p className="text--xs">{description.length > 60 ? description.substr(0, 90) + '...' : description}</p>
      
      <div>
        <Flex align="center" justify="space-between">
          <p className="location">{location}</p>
          {alreadyAplied ? <span> ✔ </span> : <button onClick={onClickCTA}>{isCandidate ? 'Apply' : 'View Applications'}</button>}
        </Flex>
      </div>

      <style jsx>{`
        .job-detail-card {
          background: #fff;
          box-shadow: 0px 3px 6px #557DA526;
          width: 100%;
          height: 17.3rem;
          padding: 1.5rem;
          max-width: 26rem;
          border-radius: 5px;
          // position: relative;


          display: flex;
          flex-direction: column;
          justify-content: space-between;

        }

        p.text--xs {
          margin-bottom: ${description.length < 60 ? '2.7rem' : "1rem"};
        }

        .location {
          font-size: 1.1rem;
        }

        button {
          background: #43AFFF33;
          border: 0;
          padding: .9rem 1.5rem;
          border-radius: 5px;
          font-size: 1.2rem;
        }
      
      `}</style>
    </div>
  )
}


