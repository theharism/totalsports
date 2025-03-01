'use client'

import { useEffect, useState } from 'react'
import { IconAlertTriangle } from '@tabler/icons-react'
import { toast } from '@/hooks/use-toast'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { Category } from '../data/schema'
import { useMutation,useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { MUTATION_DELETE_CATEGORY } from '@/mutations/deleteCategory'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRows: Category[]
}

export function CategoriesBulkDeleteDialog({ open, onOpenChange, currentRows }: Props) {
  const queryClient = useQueryClient();
	const { mutate: deleteCategory, data, isLoading, error } = useMutation({
    mutationFn: MUTATION_DELETE_CATEGORY,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
  const [value, setValue] = useState('')

  useEffect(()=>{
    if(_.get(data,'success',false)){
      onOpenChange(false)
      toast({
        title: 'The following categories have been deleted:',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>
              {JSON.stringify(currentRows, null, 2)}
            </code>
          </pre>
        ),
      })
    }
  },[data])

  const handleDelete = () => {
    if (value.trim() !== "CONFIRM") return
    currentRows?.forEach((category) => {
      deleteCategory(category._id)
    })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== "CONFIRM"}
      title={
        <span className='text-destructive'>
          <IconAlertTriangle
            className='mr-1 inline-block stroke-destructive'
            size={18}
          />{' '}
          Bulk Delete Categories
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Are you sure you want to {' '}
            <span className='font-bold'>bulk delete categories</span>?
            <br />
            This action will permanently remove the categories from the system. This cannot be undone.
          </p>

          <Label className='my-2'>
            Text:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Enter CONFIRM to confirm deletion.'
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
