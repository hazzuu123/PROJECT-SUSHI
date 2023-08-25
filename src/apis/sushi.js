import axios from 'axios'

export async function getSushiList() {
  const response = await axios.get("http://146.56.180.210:3200/sushi")
  return response.data
}

export async function postSushiRestaurant(postData) {
  console.log(postData)
  const response = await axios.post("http://146.56.180.210:3200/sushi", postData);
  return response
}

export async function getSushi(id) {
  const response = await axios.get(`http://146.56.180.210:3200/sushi/${id}`)
  return response.data
}

export async function postReview(postData, headers) {
  const response = await axios.post("http://146.56.180.210:3200/sushi/review", postData, headers);
  return response
}

export async function postSignup(postData) {
  const response = await axios.post('http://146.56.180.210:3200/auth/signup', postData)
  return response
}

export async function postLogin(postData) {
  const response = await axios.post('http://146.56.180.210:3200/auth/login', postData)
  return response
}

export async function checkUpDuplicateRequest(postData) {
  const response = await axios.post('http://146.56.180.210:3200/auth/check-duplicate', postData)
  return response
}

export async function getInitialDataRequest(headers) {
  const response = await axios.get('http://146.56.180.210:3200/auth/user-data', headers)
  return response
}