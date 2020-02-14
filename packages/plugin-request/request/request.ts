import axiosInstance from './axiosInstance'

async function request(options) {
  try {
    const response = await axiosInstance(options)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default request
