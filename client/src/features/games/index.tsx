import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/games-columns'
import { GamesDialogs } from './components/games-dialogs'
import { GamesPrimaryButtons } from './components/games-primary-buttons'
import { GamesTable } from './components/games-table'
import GamesProvider from './context/games-context'
import { gameListSchema } from './data/schema'
import { useQuery } from '@tanstack/react-query'
import { getAllGames } from '@/queries/getGameTable'
import _ from 'lodash'

export default function Games() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['games'],
    queryFn: getAllGames,
  });
  
  const games = _.get(data, 'data', []);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  // Parse game list
  const gameList = gameListSchema.parse(games)

  return (
    <GamesProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>Game List</h2>
            <p className='text-muted-foreground'>
              Manage your games here.
            </p>
          </div>
          <GamesPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <GamesTable data={gameList} columns={columns} />
        </div>
      </Main>

      <GamesDialogs />
    </GamesProvider>
  )
}
