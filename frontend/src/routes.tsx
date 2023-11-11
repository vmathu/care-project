import { lazy } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'


const routes: RouteObject[] = [
    {
        path: '/',
        index: true,
        Component: () => <Navigate to="/HomePage" />,
    },
    {
        path: '/SignIn',
        Component: lazy(() => import('./page/Authentication/SignIn')),
    },
    {
        path: '/SignUp',
        Component: lazy(() => import('./page/Authentication/SignUp')),
    },
    {
        path: '/HomePage',
        Component: lazy(() => import('./page/Home')),
    },
    {
        path: '/Errors',
        children: [
            {
                path: '404',
                index: true,
                Component: lazy(() => import('./page/Errors/Error404')),
            },
            {
                path: '500',
                index: true,
                Component: lazy(() => import('./page/Errors/Error500')),
            },
            {
                index: true,
                Component: () => <Navigate to="/Errors/404" />,
            }
        ],
    },
    {
        path: '*',
        index: true,
        Component: () => <Navigate to="/Errors/404" />,
    }
]

export default routes