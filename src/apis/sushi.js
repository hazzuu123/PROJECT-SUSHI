import axios from 'axios'

export async function getSushiList() {
  const response = await axios.get("http://146.56.180.210:3200/sushi")
  return response.data
}

export async function postSushiRestaurant(postData) {
  const response = await axios.post("http://146.56.180.210:3200/sushi", postData);
  return response
}

export async function getSushi(id) {
  console.log(`http://146.56.180.210:3200/sushi/${id}`)
  const response = await axios.get(`http://146.56.180.210:3200/sushi/${id}`)
  return response.data
}