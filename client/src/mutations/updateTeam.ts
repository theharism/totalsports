import axios from 'axios'

export const MUTATION_UPDATE_TEAM = async (id: string, team: { name: string, link: string, slug: string }) => {
  try {
    const response = await axios.put(`/api/v1/teams/${id}`, team)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data
    }
    throw error
  }
}

