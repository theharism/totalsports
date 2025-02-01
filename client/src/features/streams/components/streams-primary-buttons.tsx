import { IconUserPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useStreams } from '../context/streams-context'

export function StreamsPrimaryButtons() {
  const { setOpen } = useStreams()
  
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add Stream</span> <IconUserPlus size={18} />
      </Button>
    </div>
  )
}
