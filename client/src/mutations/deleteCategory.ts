import axios from 'axios'

export const MUTATION_DELETE_CATEGORY = async (id: string) => {
  try {
    const response = await axios.delete(`/api/v1/categories/${id}`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data
    }
    throw error
  }
}
