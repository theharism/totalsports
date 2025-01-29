import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Team } from '../data/schema'

type TeamsDialogType = 'add' | 'edit' | 'delete'

interface TeamsContextType {
  open: TeamsDialogType | null
  setOpen: (str: TeamsDialogType | null) => void
  currentRow: Team | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Team | null>>
}

const TeamsContext = React.createContext<TeamsContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function TeamsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<TeamsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Team | null>(null)

  return (
    <TeamsContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </TeamsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTeams = () => {
  const teamsContext = React.useContext(TeamsContext)

  if (!teamsContext) {
    throw new Error('useTeams has to be used within <TeamsContext>')
  }

  return teamsContext
}
