import { IconMailPlus, IconUserPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useGames } from '../context/games-context'

export function GamesPrimaryButtons() {
  const { setOpen } = useGames()
  
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add Game</span> <IconUserPlus size={18} />
      </Button>
    </div>
  )
}
