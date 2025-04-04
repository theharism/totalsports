'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Category } from '../data/schema'
import { MUTATION_ADD_CATEGORY } from '@/mutations/addCategory'
import { useMutation,useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react'
import _ from 'lodash'
import generateSlug from '@/utils/generate-slug'

const formSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required.' }),
    logo: z.any(),
    slug: z.string().min(1, { message: 'Slug is required.' }),
  })
type CategoryForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: Category
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CategoriesActionDialog({ currentRow, open, onOpenChange }: Props) {
  const queryClient = useQueryClient();
	const { mutate: addCategory, data, isLoading, error } = useMutation({
    mutationFn: MUTATION_ADD_CATEGORY,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });  
  const isEdit = !!currentRow
  const form = useForm<CategoryForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
        }
      : {
          name: '',
          logo:undefined,
          slug: '',
        },
  })
  const nameValue = form.watch('name')

  useEffect(()=>{
    if (nameValue) {
      form.setValue('slug', generateSlug(nameValue,false), { shouldValidate: true })
    }
    else{
      form.setValue('slug', '')
    }
  },[nameValue,form])

  useEffect(()=>{
    if(_.get(data,'data',false)){
      form.reset()
      toast({
        title: 'Cateory Added Successfully',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
      onOpenChange(false)
    }
  },[data])

  const onSubmit = (values: CategoryForm) => {
    const firstFile = values.logo[0];
    addCategory({ ...values, logo: firstFile });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-left'>
          <DialogTitle>{isEdit ? 'Edit Category' : 'Add New Category'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the category here. ' : 'Create new category here. '}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
          <Form {...form}>
            <form
              id='category-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-0 text-left'>
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Category Name'
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-2' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => {
                  const imagePreview = field.value
                    ? URL.createObjectURL(field.value[0])
                    : isEdit
                    ? currentRow?.logo
                    : undefined;

                  return (
                    <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                      <FormLabel className="col-span-0 text-left">Logo</FormLabel>
                      <FormControl>
                        <div className="col-span-4 flex flex-col items-center">
                          {imagePreview && (
                            <img
                              src={imagePreview}
                              alt="logo preview"
                              className="h-20 w-20 rounded-full"
                            />
                          )}
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              field.onChange(e.target.files ? Array.from(e.target.files) : [])
                            }
                            className="mt-2"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="col-span-4 col-start-2" />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name='slug'
                disabled
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-0 text-left'>
                      Slug
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='category-slug'
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-2' />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          <Button type='submit' form='category-form'>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
