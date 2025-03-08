import { useStreams } from '../context/streams-context'
import { StreamsBulkDeleteDialog } from './steams-bulk-delete-dialog'
import { StreamsActionDialog } from './streams-action-dialog'
import { StreamsDeleteDialog } from './streams-delete-dialog'

export function StreamsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow, currentRows, setCurrentRows } = useStreams()
  return (
    <>
      <StreamsActionDialog
        key='stream-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <StreamsActionDialog
            key={`stream-edit-${currentRow._id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <StreamsDeleteDialog
            key={`stream-delete-${currentRow._id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
       {currentRows && (
        <>
          <StreamsBulkDeleteDialog
            key={'bulk-delete'}
            open={open === 'bulk-delete'}
            onOpenChange={() => {
              setOpen('bulk-delete')
              setTimeout(() => {
                setCurrentRows(null)
              }, 500)
            }}
            currentRows={currentRows}
          />
        </>
      )}
    </>
  )
}
