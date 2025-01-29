import { useGames } from '../context/games-context'
import { GamesActionDialog } from './games-action-dialog'
import { GamesDeleteDialog } from './games-delete-dialog'

export function GamesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useGames()
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
            key={`game-edit-${currentRow.id}`}
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
            key={`game-delete-${currentRow.id}`}
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
