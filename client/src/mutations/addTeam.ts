import axios from 'axios'

export const MUTATION_ADD_TEAM = async (team: { name: string; logo: File; slug: string }) => {
  try {
    const formData = new FormData();
    formData.append('name', team.name);
    formData.append('slug', team.slug);
    formData.append('logo', team.logo);

    const response = await axios.post('/api/v1/teams', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
    throw error;
  }
};

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

