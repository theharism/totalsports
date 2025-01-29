import axios from 'axios'

export const getAllTeams = async () => {
  const { data } = await axios.get('/api/v1/teams')
  return data
}

export const getTeamById = async (id: string) => {
  const { data } = await axios.get(`/api/v1/teams/${id}`)
  return data
}
