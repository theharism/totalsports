'use client'

import { useEffect, useState } from 'react'
import { IconAlertTriangle } from '@tabler/icons-react'
import { toast } from '@/hooks/use-toast'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { Game } from '../data/schema'
import { useMutation,useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { MUTATION_DELETE_GAME } from '@/mutations/deleteGame'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Game
}

export function GamesDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const queryClient = useQueryClient();
	const { mutate: deleteGame, data, isLoading, error } = useMutation({
    mutationFn: MUTATION_DELETE_GAME,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
    },
  });  
  const [value, setValue] = useState('')

  useEffect(()=>{
    if(_.get(data,'success',false)){
      onOpenChange(false)
      toast({
        title: 'The following game has been deleted:',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>
              {JSON.stringify(data, null, 2)}
            </code>
          </pre>
        ),
      })
    }
  },[data])

  const handleDelete = () => {
    if (value.trim() !== currentRow.name) return
    deleteGame(currentRow._id)
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.name}
      title={
        <span className='text-destructive'>
          <IconAlertTriangle
            className='mr-1 inline-block stroke-destructive'
            size={18}
          />{' '}
          Delete Game
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Are you sure you want to delete{' '}
            <span className='font-bold'>{currentRow.name}</span>?
            <br />
            This action will permanently remove the game from the system. This cannot be undone.
          </p>

          <Label className='my-2'>
            Name:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Enter game name to confirm deletion.'
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be carefull, this operation can not be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText='Delete'
      destructive
    />
  )
}
