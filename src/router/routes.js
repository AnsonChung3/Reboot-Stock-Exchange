
const routes = [
    {
        path: '/',
        component: () => import('layouts/CustomLayout.vue'),
        children: [
            { path: 'game', component: () => import('pages/GamePage.vue') },
            { path: 'test', component: () => import('pages/testPage.vue') }
        ]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue')
    }
];

export default routes;
