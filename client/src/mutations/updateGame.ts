import axios from 'axios'

interface Game {
  team_one: string
  team_two: string
  category: string
  name: string
  slug: string
  live_link: string
  important?: boolean
  link_highlight?: string
  date_range?: boolean
  starting_date: Date
  starting_time: string
  ending_date?: Date | null
  ending_time?: string
}

export const MUTATION_UPDATE_GAME = async (id: string, game: Game) => {
  try {
    const response = await axios.put(`/api/v1/games/${id}`, game)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data
    }
    throw error
  }
}
