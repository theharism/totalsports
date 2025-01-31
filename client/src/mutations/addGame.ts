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

export const MUTATION_ADD_GAME = async (game: Game) => {
  try {
    const response = await axios.post('/api/v1/games', game)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data
    }
    throw error
  }
}
