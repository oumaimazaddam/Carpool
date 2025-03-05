const routes = [
  
    {
    path: '/',
    redirect: '/Login1' // 🔹 Redirige vers Login1 au lancement
    },
    {
      path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
      { path: '/dashboard', component: () => import('pages/Dashboard.vue')},
      { path: '/Dashboard2', component: () => import('pages/Dashboard2.vue') },
      { path: '/Dashboard3', component: () => import('src/pages/Dashboard3.vue') },
      { path: '/Liste', component: () => import('src/pages/ListeUtilisateur.vue') },
      { path: '/Messenger', component: () => import('src/pages/Messenger.vue') },
      { path: '/Feedbacks', component: () => import('src/pages/Feedbacks.vue') },
      { path: '/Finencement', component: () => import('src/pages/Finencement.vue') },
      { path: '/Logout', component: () => import('src/pages/Logout.vue') },
      
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  },

  // Pages spécifiques
  {
    path: '/Trajet',
    component: () => import('src/layouts/GestionTrajets.vue')
  },
  
  {
    path: '/Gestion de utilisateur',
    component: () => import('src/pages/Gestion Utilisateur.vue')
  },
  {
    path: '/Login1',
    component: () => import('pages/Login-1.vue')
  },
  
];

export default routes;
