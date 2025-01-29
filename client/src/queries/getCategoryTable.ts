import axios from 'axios'

export const getAllCategories = async () => {
  const { data } = await axios.get('/api/v1/categories')
  return data
}

export const getCategoryById = async (id: string) => {
  const { data } = await axios.get(`/api/v1/categories/${id}`)
  return data
}
