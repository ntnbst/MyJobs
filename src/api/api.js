import axios from 'axios'
import { toast } from 'react-toastify'
import { clearAccessToken, setAccessToken, isUserLoggedIn, getAccessToken, setUserRole, setUserName } from '../localstorage'

const BASE_URL = 'https://jobs-api.squareboat.info/api/v1'

const API_ENDPOINTS = {
  'register': '/auth/register',
  'login': '/auth/login',
  'resetPassword': '/auth/resetpassword',
  'candidates': '/candidates',
  'recruiters': '/recruiters',
  'oneJobCandidate': '/recruiters/jobs',
  'jobs': '/jobs',
  'applied': '/applied'
}

export const apiHeader = () => {
  let headers = { 'Content-Type': 'application/json' }
  
  if (isUserLoggedIn()) {
    headers['Authorization'] = getAccessToken()
  } 

  return headers
}

export const makeAPIRequest = async (method = 'get', endpoint, queryParams = {}, postData = {}) => {
  try {
    const res = await axios({
      method: method,
      url: `${BASE_URL}${endpoint}`,
      headers: apiHeader(),
      data: { ...postData },
      params: { ...queryParams }
    })
    console.log('response from the api', res)

    return res

  } catch (error) {
    if (error.response) {
      // startsWith
      console.log('endpoint', endpoint)
      if (error.response.status === 401 && !endpoint.startsWith('/auth')) {
        clearAccessToken()
        window.location.href = '/login'
        console.log('auth error in api', error.response)
        toast(error.response.data.message)
      } else {
        console.log('error in catch1', error.response)
        if (error.response.data.message) {
          toast.error(error.response.data.message)
        }
        if (error.response.data.errors) {
          error.response.data.errors.map(error => {
            for (let key in error) {
              return toast(error[key])
            }
          })
        }
        throw error
      }
    } else {
      console.log('error in catch2 no error returned from the api', error)
      toast('something went wrong!!')
      throw error
    }
    throw error
  }
}

export const registerNewUserAPI = async (apiBody) => {
  const apiResult = await makeAPIRequest('post', API_ENDPOINTS.register, {}, apiBody)
  if (apiResult.data.success) {
    setAccessToken(apiResult.data.data.token)
    setUserRole(apiResult.data.data.userRole)
    setUserName(apiResult.data.data.name)
  }
  return apiResult
};

export const loginAuthAPI = async (apiBody) => {
  const apiResult = await makeAPIRequest('post', API_ENDPOINTS.login, {}, apiBody)
  if (apiResult.data.success) {
    setAccessToken(apiResult.data.data.token)
    setUserRole(apiResult.data.data.userRole)
    setUserName(apiResult.data.data.name)
  }
  return apiResult
};

export const forgotPasswordAPI = async (email) => {
  const apiResult = await makeAPIRequest('get', `${API_ENDPOINTS.resetPassword}?email${email}`, {}, {})
  return apiResult
};

export const postResetPassowordAPI = async (apiBody) => {
  const apiResult = await makeAPIRequest('get', API_ENDPOINTS.resetPassword, {}, apiBody)
  return apiResult
};

// recruiter
export const getPostedJobsAPI = async () => {
  const apiResult = await makeAPIRequest('get', `${API_ENDPOINTS.recruiters}${API_ENDPOINTS.jobs}`, {}, {})
  return apiResult
};

// recruiter
export const postJobAPI = async (apiBody) => {
  const apiResult = await makeAPIRequest('post', API_ENDPOINTS.jobs, {}, apiBody)
  return apiResult
};

// candidate
export const getAllAvailableJobs = async () => {
  const apiResult = await makeAPIRequest('get', `${API_ENDPOINTS.candidates}${API_ENDPOINTS.jobs}`, {}, {})
  return apiResult
};

// candidate
export const applyForAJob = async (apiBody) => {
  const apiResult = await makeAPIRequest('post', `${API_ENDPOINTS.candidates}${API_ENDPOINTS.jobs}`, {}, apiBody)
  return apiResult
};

// candidate
export const getAlreadyAppliedJobs = async () => {
  const apiResult = await makeAPIRequest('get', `${API_ENDPOINTS.candidates}${API_ENDPOINTS.jobs}${API_ENDPOINTS.applied}`, {}, {})
  return apiResult
};

// recruiter
export const getCandidatesPerJob = async (jobId) => {
  const apiResult = await makeAPIRequest('get', `${API_ENDPOINTS.recruiters}${API_ENDPOINTS.jobs}/${jobId}${API_ENDPOINTS.candidates}`, {}, {})
  return apiResult
};