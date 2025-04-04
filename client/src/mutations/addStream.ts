import axios from 'axios'

interface Stream {
  game: string
  link: string
  channel: string
  ads: number
  language: string
  quality: string
  mobile: string
  nsfw: string
  ad_block: string
}

export const MUTATION_ADD_STREAM = async (stream: Stream) => {
  try {
    const response = await axios.post('/api/v1/streams', stream)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data
    }
    throw error
  }
}
