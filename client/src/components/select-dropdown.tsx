import { IconLoader } from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import { FormControl } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'
import { Input } from './ui/input'

interface SelectDropdownProps {
  onValueChange?: (value: string) => void
  defaultValue: string | undefined,
  defaultLabel?: string | undefined,
  placeholder?: string
  isPending?: boolean
  items: { label: string; value: string }[]
  disabled?: boolean
  className?: string
  isControlled?: boolean
}

export function SelectDropdown({
  defaultValue,
  onValueChange,
  isPending,
  items,
  placeholder,
  disabled,
  className = '',
  isControlled = false,
}: SelectDropdownProps) {
  const defaultState = isControlled
    ? { value: defaultValue, onValueChange }
    : { defaultValue, onValueChange }
  const [search, setSearch] = useState('')
  const filteredItems = items?.filter(item =>
    item.label.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <Select {...defaultState}>
      <FormControl>
        <SelectTrigger disabled={disabled} className={cn(className)}>
          <SelectValue placeholder={placeholder ?? 'Select'} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {isPending ? (
          <SelectItem disabled value='loading' className='h-14'>
            <div className='flex items-center justify-center gap-2'>
              <IconLoader className='h-5 w-5 animate-spin' />
              {'  '}
              Loading...
            </div>
          </SelectItem>
        ) : (
          <>
          <div className="p-2">
          <Input
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full"
          />
        </div>
          {filteredItems?.length > 0 ? filteredItems?.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
            )) : (
              <div className="p-2 text-center text-sm text-gray-500">
                No results found
              </div>
            )}
            </>
          )}
      </SelectContent>
    </Select>
  )
}
