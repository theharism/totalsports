import { useTeams } from '../context/teams-context'
import { TeamsActionDialog } from './teams-action-dialog'
import { TeamsDeleteDialog } from './teams-delete-dialog'

export function TeamsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useTeams()
  return (
    <>
      <TeamsActionDialog
        key='team-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <TeamsActionDialog
            key={`team-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <TeamsDeleteDialog
            key={`team-delete-${currentRow.id}`}
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
