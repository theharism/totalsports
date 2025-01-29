import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/categories-columns'
import { CategoriesDialogs } from './components/categories-dialogs'
import { CategoriesPrimaryButtons } from './components/categories-primary-buttons'
import { CategoriesTable } from './components/categories-table'
import CategoriesProvider from './context/categories-context'
import { categoriesListSchema } from './data/schema'
import { getAllCategories } from '@/queries/getCategoryTable'
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';

export default function Categories() {
  
  const { data, error, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  });
  
  const categories = _.get(data, 'data', []);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  // Parse category list
  const categoriesList = categoriesListSchema.parse(categories)

  return (
    <CategoriesProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>Categories List</h2>
            <p className='text-muted-foreground'>
              Manage your categories here.
            </p>
          </div>
          <CategoriesPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <CategoriesTable data={categoriesList} columns={columns} />
        </div>
      </Main>

      <CategoriesDialogs />
    </CategoriesProvider>
  )
}
