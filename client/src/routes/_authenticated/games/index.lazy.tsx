import { createLazyFileRoute } from '@tanstack/react-router'
import Games from '@/features/games'

export const Route = createLazyFileRoute('/_authenticated/games/')({
  component: Games,
})
