import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Stream } from '../data/schema'

type StreamsDialogType = 'invite' | 'add' | 'edit' | 'delete' | 'bulk-delete'

interface StreamsContextType {
  open: StreamsDialogType | null
  setOpen: (str: StreamsDialogType | null) => void
  currentRow: Stream | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Stream | null>>
  currentRows: Stream[] | null
  setCurrentRows: React.Dispatch<React.SetStateAction<Stream[] | null>>
}

const StreamsContext = React.createContext<StreamsContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function StreamsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<StreamsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Stream | null>(null)
  const [currentRows, setCurrentRows] = useState<Stream[] | null>(null)

  return (
    <StreamsContext value={{ open, setOpen, currentRow, setCurrentRow,currentRows, setCurrentRows }}>
      {children}
    </StreamsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useStreams = () => {
  const streamsContext = React.useContext(StreamsContext)

  if (!streamsContext) {
    throw new Error('useStreams has to be used within <StreamsContext>')
  }

  return streamsContext
} 
