import axios from 'axios'

export const MUTATION_DELETE_TEAM = async (id: string) => {
  try {
    const response = await axios.delete(`/api/v1/teams/${id}`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data
    }
    throw error
  }
}
