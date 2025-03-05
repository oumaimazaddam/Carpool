import { route } from 'quasar/wrappers';
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';


export default route(function () {
  const Router = createRouter({
    history: createWebHistory(process.env.VUE_ROUTER_BASE),
    routes,
    scrollBehavior: () => ({ left: 0, top: 0 }),
  });

  // ✅ Middleware pour protéger les routes nécessitant une authentification
  Router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token'); // Vérifie le JWT
    if (to.meta.requiresAuth && !isAuthenticated) {
      next('/login1'); // Redirige vers la page de connexion
    } else {
      next();
    }
  });

  return Router;
});
