import axios from 'axios'

export const MUTATION_DELETE_GAME = async (id: string) => {
  try {
    const response = await axios.delete(`/api/v1/games/${id}`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data
    }
    throw error
  }
}
