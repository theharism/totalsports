import { useTeams } from '../context/teams-context'
import { TeamsActionDialog } from './teams-action-dialog'
import { TeamsDeleteDialog } from './teams-delete-dialog'
import { TeamsBulkDeleteDialog } from './teams-bulk-delete-dialog'

export function TeamsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow, currentRows, setCurrentRows } = useTeams()
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
            key={`team-edit-${currentRow._id}`}
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
            key={`team-delete-${currentRow._id}`}
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
          <TeamsBulkDeleteDialog
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
