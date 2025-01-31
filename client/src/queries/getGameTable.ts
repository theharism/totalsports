import axios from 'axios'

export const getAllGames = async () => {
  const { data } = await axios.get('/api/v1/games')
  return data
}

export const getGameById = async (id: string) => {
  const { data } = await axios.get(`/api/v1/games/${id}`)
  return data
}
