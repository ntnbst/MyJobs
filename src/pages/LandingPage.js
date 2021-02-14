import React from 'react'
import Button from '../components/Button'
import Grid from '../components/Grid'
import Layout from '../components/Layout'
import { theme } from '../constants'
import LandingImg from '../assets/landing-img.png'
import { useHistory } from 'react-router-dom'
import {ROUTE_LOGIN} from '../routes/routes'


export default function LandingPage() {
  return (
    <Layout>
      <JumbotronWithCTA />
      <br/>
      <br/>
      <br/>
      <br/>
      <p style={{ color: theme.colors.darkBlue1 }} className="text--md">Why us</p>
      <Grid gap="3rem">
        <WhyUsCard title="Get more visibility" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt." />
        <WhyUsCard title="Organize your candidates" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
        <WhyUsCard title="Verify their abilities" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore." />
      </Grid>
      <br/>
      <br/>
      <br/>
      <p style={{ color: theme.colors.darkBlue1 }}  className="text--md">Companies Who trust us</p>
      <Grid>
        <WhyUsCard title="Get more visibility" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt." />
        <WhyUsCard title="Organize your candidates" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
        <WhyUsCard title="Verify their abilities" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore." />
      </Grid>
    </Layout>
  )
}


const JumbotronWithCTA = () => {
  const history = useHistory()
  return (
    <Grid col={2}>
      <div>
        <h1 className="text--xl" style={{ color: '#fff' }}>Welcome to <br /> My<span style={{ color: theme.colors.primaryBlue }}>Jobs</span></h1>
        <Button onClick={() => history.push(ROUTE_LOGIN)}>Get Started</Button>
      </div>
      <div>
        <img src={LandingImg} alt="asdf"/>
      </div>
      <style jsx>{`
        img {
          width: 60rem;
          height: auto;
          border-radius: 20px;
          transform: translateY(5rem);
          object-fit: cover;
          max-width: 100%;
          box-shadow: 0px 30px 36px #557DA526;
        }


        @media(max-width: 950px) {
          img {
            // max-width: 100%;
          }
        }
      
      `}
      </style>
    </Grid>
  )
}

const WhyUsCard = ({ title, description }) => {
  return (
    <div className="why-us-card">
      <p className="text--md margin-0">{title}</p>
      <p className="text--xs">{description}</p>

      <style jsx>{`
        .why-us-card {
          background: #fff;
          border-radius: 5px;
          padding: 2.4rem 2rem;
          height: 19.2rem;
          box-shadow: 0px 3px 6px #557DA526;
        }

        p.text--md {
          color: ${theme.colors.primaryBlue};
          max-width: 16rem;
          margin-bottom: 3rem;
        }
      
      `}
      </style>
    </div>
  )
}
