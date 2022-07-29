/** @format */

export default [
    {
        name: 'dashboard',
        path: '/dashboard',
        routes: [
            {
                path: '/dashboard',
                redirect: '/dashboard/analysis',
            },
            {
                path: '/dashboard/analysis',
                component: './dashboard/analysis',
            },
            {
                path: '/dashboard/monitor',
                component: './dashboard/monitor',
            },
            {
                path: '/dashboard/workplace',
                component: './dashboard/workplace',
            },
        ],
    },
    {
        name: 'content',
        path: '/content',
        routes: [
            {
                path: '/content',
                redirect: '/content/list',
            },
            {
                path: '/content/list',
                component: './content/list',
            },
            {
                path: '/content/edit',
                component: './content/edit',
            },
        ],
    },
    {
        name: 'product',
        path: '/product',
        routes: [
            {
                path: '/product',
                redirect: '/product/list',
            },
            {
                path: '/product/list',
                component: './product/list',
            },
            {
                path: '/product/edit',
                component: './product/edit',
            },
        ],
    },
    {
        path: '/channel',
        component: './channel',
    },
    {
        path: '/client',
        component: './client',
    },
    {
        name: 'user',
        path: '/user',
        routes: [
            {
                path: '/user',
                redirect: '/user/list',
            },
            {
                path: '/user/list',
                component: './user/list',
            },
            {
                path: '/user/menu',
                component: './user/menu',
            },
            {
                path: '/user/group',
                component: './user/group',
            },
        ],
    },
    {
        path: '/link',
        component: './link',
    },
    {
        layout: false,
        path: '/login',
        component: './login',
    },
    {
        path: '/account',
        component: './account',
    },
    {
        name: 'settings',
        path: '/settings',
        routes: [
            {
                path: '/settings',
                redirect: '/settings/system',
            },
            {
                path: '/settings/system',
                component: './settings/system',
            },
            {
                path: '/settings/region',
                component: './settings/region',
            },
        ],
    },
    {
        path: '/',
        redirect: '/dashboard/analysis',
    },
    {
        component: './404',
    },
];
