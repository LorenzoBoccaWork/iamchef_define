import { createBrowserRouter, type RouteObject } from 'react-router'
import ApiKeyPage from './pages/ApiKeyPage'
import SearchPage from './pages/SearchPage'
import DiscoverRecipes from './pages/DiscoverRecipes'
import { RecipeDetails } from './pages/RecipeDetails'
import NotFound from './pages/NotFound'

// Definisci le rotte con type safety
const routes: RouteObject[] = [
  {
    path: '/',
    element: <ApiKeyPage />
  },
  {
    path: '/search',
    element: <SearchPage />
  },
  {
    path: '/discover',
    element: <DiscoverRecipes />
  },
  {
    path: '/recipe/:id',
    element: <RecipeDetails />
  },
  {
    path: '*',
    element: <NotFound />
  }
]

// Crea il router
export const router = createBrowserRouter(routes)