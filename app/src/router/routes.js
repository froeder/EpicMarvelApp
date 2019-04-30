
const routes = [
  {
    mode: 'history',
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'sobre' ,name:'Sobre', component: () => import('pages/Sobre.vue') },
      { path: 'favoritos' ,name:'Favoritos', component: () => import('pages/Favoritos.vue') },
      { path: 'aleatorio' ,name:'Aleatorio', component: () => import('pages/Aleatorio.vue') },
      { path: 'detalhes/:id' ,name:'Detalhes', component: () => import('pages/Detalhes.vue') },
      { path: 'detalhes/revista/:id' ,name:'DetalhesRevista', component: () => import('pages/DetalhesRevista.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
