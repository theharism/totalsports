import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/streams-columns'
import { StreamsDialogs } from './components/streams-dialogs'
import { StreamsPrimaryButtons } from './components/streams-primary-buttons'
import { StreamsTable } from './components/streams-table'
import StreamsProvider from './context/streams-context'
import { streamListSchema} from './data/schema'
import { useQuery } from '@tanstack/react-query'
import _ from 'lodash'
import { getAllStreams } from '@/queries/getSteamTable'

export default function Streams() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['streams'],
    queryFn: getAllStreams,
  });
  
  const streams = _.get(data, 'data', []);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  // Parse stream list
  const streamList = streamListSchema.parse(streams)

  return (
    <StreamsProvider>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Stream List</h2>
            <p className='text-muted-foreground'>
              Manage your streams here.
            </p>
          </div>
          <StreamsPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <StreamsTable data={streamList} columns={columns} />
        </div>
      </Main>

      <StreamsDialogs />
    </StreamsProvider>
  )
}
