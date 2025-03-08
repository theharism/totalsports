import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from './data-table-view-options'
import { IconTrash } from '@tabler/icons-react'
import { useTeams } from '../context/teams-context'
import { Team } from '../data/schema'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const { setOpen, setCurrentRows } = useTeams()
  const isFiltered = table.getState().columnFilters.length > 0
  const rows = table.getSelectedRowModel().rows.map(row => row.original) as Team[]
  const isRowSelected = rows.length > 0

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='Filter teams...'
          value={
            (table.getColumn('name')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
        {isRowSelected && (
          <Button
            variant='outline'
            size='sm'
            className='mr-2 hidden h-8 lg:flex !text-red-500 border-red-500'
            onClick={() => {
              setCurrentRows(rows)
              setOpen('bulk-delete')
            }}
          >
            <IconTrash />
            Bulk Delete
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
