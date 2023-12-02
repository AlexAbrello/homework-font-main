import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { Layout } from '@/components/ui/header-component/header-component.tsx'
import { Loader } from '@/components/ui/loader'
import { SignInPage } from '@/pages/auth/login-page.tsx'
import { SignUpPage } from '@/pages/auth/registration-page.tsx'
import { Deck } from '@/pages/decks/deck-page/deck-page.tsx'
import { Decks } from '@/pages/decks/decks.tsx'
import { Learn } from '@/pages/learn'
import { PageNotFound } from '@/pages/not-found/not-found.tsx'
import { useMeQuery } from '@/services/auth/auth-api.ts'
import { Profile } from './pages/profile-page/profile-page'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <SignInPage />,
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
  },
  // {
  //   path: '/forgot-password',
  //   element: <ForgotPassPage />,
  // },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Decks />,
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/deck/:id',
    element: <Deck />,
  },
  {
    path: '/deck/:id/learn',
    element: <Learn />,
  },
]

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      ...publicRoutes,
      {
        element: <PrivateRoutes />,
        children: privateRoutes
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
])

export const Router = () => {
  const { isLoading } = useMeQuery()

  if (isLoading) return <Loader />

  return (
    <RouterProvider router={router} />
  )
}
function PrivateRoutes() {

  const { data } = useMeQuery()

  const isAuthenticated = !!data 


  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}