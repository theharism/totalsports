import { useCategories } from '../context/categories-context'
import { CategoriesActionDialog } from './categories-action-dialog'
import { CategoriesBulkDeleteDialog } from './categories-bulk-delete-dialog'
import { CategoriesDeleteDialog } from './categories-delete-dialog'

export function CategoriesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow, currentRows, setCurrentRows } = useCategories()
  return (
    <>
      <CategoriesActionDialog
        key='category-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <CategoriesActionDialog
            key={`category-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <CategoriesDeleteDialog
            key={`category-delete-${currentRow.id}`}
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
          <CategoriesBulkDeleteDialog
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
