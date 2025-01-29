import axios from 'axios'

export const MUTATION_ADD_CATEGORY = async (category: { name: string, link: string, slug: string }) => {
  try {
    const response = await axios.post('/api/v1/categories', category)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data
    }
    throw error
  }
}

export const MUTATION_DELETE_CATEGORY = async (id: string) => {
  try {
    const response = await axios.delete(`/api/v1/categories/${id}`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data
    }
    throw error
  }
}

export const MUTATION_UPDATE_CATEGORY = async (id: string, category: { name: string, link: string, slug: string }) => {
  try {
    const response = await axios.put(`/api/v1/categories/${id}`, category)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data
    }
    throw error
  }
}
