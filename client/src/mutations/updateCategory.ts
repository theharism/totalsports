import axios from 'axios'

export const MUTATION_UPDATE_CATEGORY = async (id: string, category: { name: string, link: string, slug: string }) => {
  try {
    const response = await axios.put(`/api/v1/categories/${id}`, category)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data
    }
    throw error
  }
}
