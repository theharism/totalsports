import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Game } from '../data/schema'

type GamesDialogType = 'invite' | 'add' | 'edit' | 'delete'

interface GamesContextType {
  open: GamesDialogType | null
  setOpen: (str: GamesDialogType | null) => void
  currentRow: Game | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Game | null>>
}

const GamesContext = React.createContext<GamesContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function GamesProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<GamesDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Game | null>(null)

  return (
    <GamesContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </GamesContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useGames = () => {
  const gamesContext = React.useContext(GamesContext)

  if (!gamesContext) {
    throw new Error('useGames has to be used within <GamesContext>')
  }

  return gamesContext
}
