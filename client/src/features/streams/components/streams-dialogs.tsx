import { useStreams } from '../context/streams-context'
import { StreamsActionDialog } from './streams-action-dialog'
import { StreamsDeleteDialog } from './streams-delete-dialog'

export function StreamsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useStreams()
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
            key={`stream-edit-${currentRow.id}`}
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
            key={`stream-delete-${currentRow.id}`}
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
    </>
  )
}
