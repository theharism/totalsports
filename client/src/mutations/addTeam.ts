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
