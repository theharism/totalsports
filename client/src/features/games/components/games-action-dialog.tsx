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
import { Game } from '../data/schema'
import { getAllCategories } from '@/queries/getCategoryTable'
import { useQueries,useQueryClient,useMutation } from '@tanstack/react-query';
import { getAllTeams } from '@/queries/getTeamTable';
import _ from 'lodash';
import { useEffect, useState } from 'react'
import { MUTATION_ADD_GAME } from '@/mutations/addGame'
import generateSlug from '@/utils/generate-slug'
import { extractTeamsFromSlug } from '@/utils/extract-teams'

const formSchema = z
  .object({
    team_one: z.string().min(1, { message: 'Team one is required' }),
    team_two: z.string().min(1, { message: 'Team two is required' }),
    category: z.string().min(1, { message: 'Category is required' }),
    name: z.string().min(1, { message: 'Name is required' }),
    slug: z.string().min(1, { message: 'Slug is required' }),
    important: z.boolean().default(false),
    date_range: z.boolean().default(false),
    starting_date: z.date().refine((v) => v.setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0), { message: 'Starting date is required' }),
    starting_time: z.string().min(1, { message: 'Starting time is required' }),
    ending_date: z.date().optional().nullable(),
    ending_time: z.string().optional(),
  }).refine((data) => {
    if (data.date_range && !data.ending_date) {
      return false;
    }
    return true;
  }, {
    message: "Ending date is required when date range is enabled",
    path: ["ending_date"],
  });
type GameForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: Game
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GamesActionDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow
  const queryClient = useQueryClient();
	const { mutate: addGame, data } = useMutation({
    onError: (error: { message: string; error?: string }) => {
      toast({
        variant: 'destructive',
        title: error.message,
        description: error?.error,
      })
    },
    mutationFn: MUTATION_ADD_GAME,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
    },
  });  
  const results = useQueries({
    queries:[
    {
      queryKey: ['categories'],
      queryFn: getAllCategories,
    },
    {
      queryKey: ['teams'],
      queryFn: getAllTeams,
    },
  ]});
  
  const categories = _.get(results[0].data,"data",[]);
  const categoriesError = results[0].error;
  const categoriesLoading = results[0].isLoading;
  
  const teams = _.get(results[1].data,"data",[]);
  const teamsError = results[1].error;
  const teamsLoading = results[1].isLoading;  

  // if (categoriesLoading || teamsLoading) return <div>Loading...</div>;
  if (categoriesError) return <div>Error: {categoriesError.message}</div>;
  if (teamsError) return <div>Error: {teamsError.message}</div>;

  const form = useForm<GameForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
          starting_date: currentRow?.starting_date || new Date(),
          starting_time: currentRow?.starting_time || '',
          ending_date: currentRow?.ending_date || undefined,
          ending_time: currentRow?.ending_time || '',
        }
      : {
          team_one: '',
          team_two: '',
          category: '',
          name: '',
          slug: '',
          live_link: '',
          important: false,
          date_range: false,
          starting_date: new Date(),
          starting_time: '',
          ending_date: undefined,
          ending_time: '',
        },
  })
  const [teamOneLabel, setTeamOneLabel] = useState('');
  const [teamTwoLabel, setTeamTwoLabel] = useState('');
  const nameValue = form.watch('name')
  const teamOneValue = form.watch('team_one')
  const teamTwoValue = form.watch('team_two')

  useEffect(() => {
    if (nameValue) {
      const slug = generateSlug(nameValue, true);
      form.setValue('slug', slug, { shouldValidate: true });
  
      const { teamOneName, teamTwoName } = extractTeamsFromSlug(slug);
  
      const teamOne = teams.find((team: { name: string }) => team.name.toLowerCase().replace(/-/g, ' ').trim() === teamOneName);
      const teamTwo = teams.find((team: { name: string }) => team.name.toLowerCase().replace(/-/g, ' ').trim() === teamTwoName);
  
      form.setValue('team_one', teamOne?._id || '');
      form.setValue('team_two', teamTwo?._id || '');

      setTeamOneLabel(teamOne?.name || '');
      setTeamTwoLabel(teamTwo?.name || '');
    } else {
      form.setValue('slug', '');
      form.setValue('team_one', '');
      form.setValue('team_two', '');
      setTeamOneLabel('');
      setTeamTwoLabel('');
    }
  }, [nameValue, form, teams]);  

  useEffect(()=>{
    if(teamOneValue && teamTwoValue){
      const teamOne = teams.find((team: { _id: string }) => team._id === teamOneValue).name
      const teamTwo = teams.find((team: { _id: string }) => team._id === teamTwoValue).name
      form.setValue('name', `${teamOne} vs ${teamTwo}`)
    }
  },[teamOneValue,teamTwoValue])

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

  const onSubmit = (values: GameForm) => {
    addGame(values);
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
          <DialogTitle>{isEdit ? 'Edit Game' : 'Add New Game'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the game here. ' : 'Create new game here. '}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
          <Form {...form}>
            <form
              id='game-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              <FormField
                control={form.control}
                name='team_one'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Team one
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder={teamOneLabel || 'Select a team'}
                      className='col-span-4'
                      items={teams?.map(({ name, _id }: { name: string; _id: string }) => ({
                        label: name,
                        value: _id,
                      }))}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='team_two'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Team two
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder={teamTwoLabel || 'Select a team'}
                      className='col-span-4'
                      items={teams?.map(({ name, _id }: { name: string; _id: string }) => ({
                        label: name,
                        value: _id,
                      }))}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='category'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Category
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder='Select a category'
                      className='col-span-4'
                      items={categories?.map(({ name, _id }: { name: string; _id: string }) => ({
                        label: name,
                        value: _id,
                      }))}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='e.g., League match'
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
                name='slug'
                disabled
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Slug
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='e.g., league-match'
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
                name='important'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Important
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='checkbox'
                        className='col-span-4'
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='starting_date'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Date
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='date'
                        className='col-span-4'
                        onChange={(e) => field.onChange(new Date(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='starting_time'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Time
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='time'
                        className='col-span-4'
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='date_range'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Date range
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='checkbox'
                        className='col-span-4'
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              {form.watch('date_range') && (
                <>
                  <FormField
                    control={form.control}
                    name='ending_date'
                    render={({ field }) => (
                      <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                        <FormLabel className='col-span-2 text-right'>
                          Ending Date
                        </FormLabel>
                        <FormControl>
                          <Input
                            type='date'
                            className='col-span-4'
                            onChange={(e) => field.onChange(new Date(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage className='col-span-4 col-start-3' />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='ending_time'
                    render={({ field }) => (
                      <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                        <FormLabel className='col-span-2 text-right'>
                          Ending Time
                        </FormLabel>
                        <FormControl>
                          <Input
                            type='time'
                            className='col-span-4'
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </FormControl>
                        <FormMessage className='col-span-4 col-start-3' />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          <Button type='submit' form='game-form'>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
