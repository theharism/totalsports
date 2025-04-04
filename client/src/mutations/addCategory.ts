import axios from 'axios'

export const MUTATION_ADD_CATEGORY = async (category: { name: string, logo: File, slug: string }) => {
  try {
    const formData = new FormData();
    formData.append('name', category.name);
    formData.append('slug', category.slug);
    formData.append('logo', category.logo);

    const response = await axios.post('/api/v1/categories', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data
    }
    throw error
  }
}
