import { createLazyFileRoute } from '@tanstack/react-router'
import Streams from '@/features/streams'

export const Route = createLazyFileRoute('/_authenticated/streams/')({
  component: Streams,
})
