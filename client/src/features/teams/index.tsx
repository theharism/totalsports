import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/teams-columns'
import { TeamsDialogs } from './components/teams-dialogs'
import { TeamsPrimaryButtons } from './components/teams-primary-buttons'
import { TeamsTable } from './components/teams-table'
import TeamsProvider from './context/teams-context'
import { teamsListSchema } from './data/schema'
import { getAllTeams } from '@/queries/getTeamTable'
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';

export default function Teams() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['teams'],
    queryFn: getAllTeams,
  });
  
  const teams = _.get(data, 'data', []);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  // Parse team list
  const teamsList = teamsListSchema.parse(teams)

  return (
    <TeamsProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>Teams List</h2>
            <p className='text-muted-foreground'>
              Manage your teams here.
            </p>
          </div>
          <TeamsPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <TeamsTable data={teamsList} columns={columns} />
        </div>
      </Main>

      <TeamsDialogs />
    </TeamsProvider>
  )
}
