export default [
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'dashboard',
    routes: [
      {
        path: '/dashboard',
        redirect: '/dashboard/analysis',
      },
      {
        name: 'analysis',
        icon: 'smile',
        path: '/dashboard/analysis',
        component: './dashboard/analysis',
      },
      {
        name: 'monitor',
        icon: 'smile',
        path: '/dashboard/monitor',
        component: './dashboard/monitor',
      },
      {
        name: 'workplace',
        icon: 'smile',
        path: '/dashboard/workplace',
        component: './dashboard/workplace',
      },
    ],
  },
  {
    name: 'content',
    path: '/content',
    icon: 'unordered-list',
    routes: [
      {
        name: 'list',
        path: '/content/list',
        component: './content/list'
      },
      {
        name: 'edit',
        path: '/content/edit',
        component: './content/edit'
      },
      {
        component: '404',
      },
    ],
  },
  {
    name: 'user',
    icon: 'user',
    path: '/user',
    routes: [
      {
        name: 'login',
        layout: false,
        hideInMenu:true,
        path: '/user/login',
        component: './user/Login',
      },
      {
        name: 'list',
        path: '/user/list',
        component: './user/list'
      },
      {
        name: 'auth-list',
        path: '/user/authlist',
        component: './user/auth-list'
      },
      {
        name: 'group-list',
        path: '/user/grouplist',
        component: './user/group-list'
      }
    ],
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    component: './404',
  },
];
