import { useGames } from '../context/games-context'
import { GamesActionDialog } from './games-action-dialog'
import { GamesBulkDeleteDialog } from './games-bulk-delete-dialog'
import { GamesDeleteDialog } from './games-delete-dialog'

export function GamesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow, currentRows, setCurrentRows } = useGames()
  return (
    <>
      <GamesActionDialog
        key='game-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <GamesActionDialog
            key={`game-edit-${currentRow._id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <GamesDeleteDialog
            key={`game-delete-${currentRow._id}`}
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
          <GamesBulkDeleteDialog
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
