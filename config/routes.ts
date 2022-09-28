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
                access: 'authFilter',
                path: '/content/list',
                component: './content/list',
            },
            {
                access: 'authFilter',
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
                access: 'authFilter',
                path: '/product/list',
                component: './product/list',
            },
            {
                access: 'authFilter',
                path: '/product/edit',
                component: './product/edit',
            },
        ],
    },
    {
        name: 'channel',
        path: '/channel',
        routes: [
            {
                path: '/channel',
                redirect: '/channel/list',
            },
            {
                access: 'authFilter',
                path: '/channel/list',
                component: './channel/list',
            },
            {
                access: 'authFilter',
                path: '/channel/module',
                component: './channel/module',
            },
        ],
    },
    {
        path: '/client',
        access: 'authFilter',
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
                access: 'authFilter',
                path: '/user/list',
                component: './user/list',
            },
            {
                access: 'authFilter',
                path: '/user/menu',
                component: './user/menu',
            },
            {
                access: 'authFilter',
                path: '/user/group',
                component: './user/group',
            },
        ],
    },
    {
        path: '/link',
        access: 'authFilter',
        component: './link',
    },
    {
        layout: false,
        path: '/login',
        component: './login',
    },
    {
        path: '/account',
        access: 'authFilter',
        component: './account',
    },
    {
        name: 'settings',
        path: '/settings',
        routes: [
            {
                path: '/settings',
                redirect: '/settings/record',
            },
            {
                access: 'authFilter',
                path: '/settings/region',
                component: './settings/region',
            },
            {
                access: 'authFilter',
                path: '/settings/record',
                component: './settings/record',
            },
            {
                access: 'authFilter',
                path: '/settings/database',
                component: './settings/backup',
            },
            {
                access: 'authFilter',
                path: '/settings/system',
                component: './settings/system',
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
