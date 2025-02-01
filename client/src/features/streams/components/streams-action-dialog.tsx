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
import { SelectDropdown } from '@/components/select-dropdown'
import { Stream } from '../data/schema'
import { useQuery,useQueryClient,useMutation } from '@tanstack/react-query';
import { getAllGames } from '@/queries/getGameTable';
import _ from 'lodash';
import { useEffect } from 'react'
import { MUTATION_ADD_STREAM } from '@/mutations/addStream'

const formSchema = z
  .object({
    game: z.string().min(1, { message: 'Id is required' }),
    link: z.string().url({ message: 'Link is required and must be a valid URL' }),
    channel: z.string().min(1, { message: 'Channel is required' }),
    ads: z.coerce.number().positive().int().min(0, { message: 'Ads cannot be negative' }),
    language: z.string().min(1, { message: 'Language is required' }),
    quality: z.enum(['HD', 'SD']).default('HD'),
    mobile: z.enum(['Yes', 'No']).default('No'),
    nsfw: z.enum(['Yes', 'No']).default('No'),
    ad_block: z.enum(['Yes', 'No']).default('No'),
  })
type StreamForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: Stream
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function StreamsActionDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow
  const queryClient = useQueryClient();
	const { mutate: addStream, data, isLoading, error } = useMutation({
    mutationFn: MUTATION_ADD_STREAM,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['streams'] });
    },
  });  
  const results = useQuery({
    queryKey: ['games'],
    queryFn: getAllGames,
  });
  const games = _.get(results.data,"data",[]);
  const gamesError = results.error;
  const gamesLoading = results.isLoading;

  // if (gamesLoading) return <div>Loading...</div>;
  if (gamesError) return <div>Error: {gamesError.message}</div>;

  const form = useForm<StreamForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
        }
      : {
          game: '',
          link: '',
          channel: '',
          ads: 0,
          language: '',
          quality: 'HD',
          mobile: 'No',
          nsfw: 'No',
          ad_block: 'No',
        },
  })

  useEffect(()=>{
    if(_.get(data,'data',false)){
      form.reset()
      toast({
        title: 'You submitted the following values:',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
      onOpenChange(false)
    }
  },[data])

  const onSubmit = (values: StreamForm) => {
    addStream(values);
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
          <DialogTitle>{isEdit ? 'Edit Stream' : 'Add New Stream'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the stream here. ' : 'Create new stream here. '}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
          <Form {...form}>
            <form
              id='stream-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              <FormField
                control={form.control}
                name='game'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Game
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder='Select a game'
                      className='col-span-4'
                      items={games?.map(({ name,starting_time,starting_date, _id }: { name: string;starting_time:string;starting_date:string;_id: string }) => ({
                        label: "(" + new Date(starting_date)?.toLocaleDateString() + ' ' + starting_time + ") " + name,
                        value: _id,
                      }))}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='link'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Live link
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='e.g., https://example.com/stream'
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='channel'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Channel
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='e.g., channel'
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='ads'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Ads
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='e.g., 3'
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='language'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Language
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='e.g., English'
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='quality'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Quality
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder='Select a quality'
                      className='col-span-4'
                      items={[{name:"HD",value:"HD"},{name:"SD",value:"SD"}]?.map(({ name,value }: { name: string;value: string; }) => ({
                        label: name,
                        value: value,
                      }))}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='mobile'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Mobile
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder='Select option for mobile'
                      className='col-span-4'
                      items={[{name:"Yes",value:"Yes"},{name:"No",value:"No"}]?.map(({ name,value }: { name: string;value: string; }) => ({
                        label: name,
                        value: value,
                      }))}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='ad_block'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Mobile
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder='Select option for ad block'
                      className='col-span-4'
                      items={[{name:"Yes",value:"Yes"},{name:"No",value:"No"}]?.map(({ name,value }: { name: string;value: string; }) => ({
                        label: name,
                        value: value,
                      }))}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='nsfw'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      NSFW
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder='Select option for nsfw'
                      className='col-span-4'
                      items={[{name:"Yes",value:"Yes"},{name:"No",value:"No"}]?.map(({ name,value }: { name: string;value: string; }) => ({
                        label: name,
                        value: value,
                      }))}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          <Button type='submit' form='stream-form'>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
