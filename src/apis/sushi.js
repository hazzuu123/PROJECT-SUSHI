import axios from 'axios'

export async function getSushiList() {
  const response = await axios.get("http://146.56.180.210:3200/sushi")

  return response.data
}