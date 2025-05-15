import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'  // redirige la racine vers /login
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/login.vue"),
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../views/ContactManager.vue"),
    },
    {
      path: "/View/:id",
      name: "View",
      component: () => import("../views/ViewContact.vue"),
    },
    {
      path: "/Add",
      name: "Add",
      component: () => import("../views/AddContact.vue"),
    },
    {
      path: "/Edit/:id",
      name: "Edit",
      component: () => import("../views/EditContact.vue"),
    },
  ],
});



router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (!isAuthenticated && to.name !== 'login') {
    next({ name: 'login' });
  } else if (isAuthenticated && to.name === 'login' && from.name) {
    // autorise /login si redirigé depuis une autre route (évite la boucle infinie)
    next({ name: 'home' });
  } else {
    next();
  }
});





export default router
