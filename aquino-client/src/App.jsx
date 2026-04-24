import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Home Structure
import Layout from './layouts/Layout';
import ArticlePage from './pages/LandingPages/ArticlePage';
import ArticleListPage from './pages/LandingPages/ArticleListPage';
import HomePage from './pages/LandingPages/HomePage';
import AboutPage from './pages/LandingPages/AboutPage';

// Auth Structure
import AuthLayout from './layouts/AuthLayout';
import LoginPage from './pages/AuthPages/LoginPage';
import SignupPage from './pages/AuthPages/SignupPage';

import NotFoundPage from './pages/NotFoundPage';

// const routes = [
//   {
//     path: '/',
//     element: <Layout />,
//     errorElement: <NotFoundPage />,
//     children: [
//       { path: '', element: <HomePage /> },
//       { path: 'about', element: <AboutPage /> },
//       { path: 'articles', element: <ArticlePage /> },
//       { path: 'articles', element: <ArticleListPage /> },
//     ],
//   },
// ];

const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      // This shows the list of all articles
      { path: 'articles', element: <ArticleListPage /> },
      // This shows a single article. Note the :name parameter!
      { path: 'articles/:name', element: <ArticlePage /> },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: '', element: <LoginPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signin', element: <LoginPage /> },
      { path: 'sign-in', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
