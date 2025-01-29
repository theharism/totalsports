import { createLazyFileRoute } from '@tanstack/react-router'
import Teams from '@/features/teams'

export const Route = createLazyFileRoute('/_authenticated/teams/')({
  component: Teams,
})
