import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading
console.log(_import)
Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/index',
  //   meta: { roles: ['admin'] }, // you can set roles in root nav
  //   children: [{
  //     path: 'index',
  //     component: _import('permission/index'),
  //     name: 'permission',
  //     meta: {
  //       title: 'permission',
  //       icon: 'lock',
  //       roles: ['admin'] // or you can only set roles in sub nav
  //     }
  //   }]
  // },

  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [{
  //     path: 'index',
  //     component: _import('svg-icons/index'),
  //     name: 'icons',
  //     meta: { title: 'icons', icon: 'icon', noCache: true }
  //   }]
  // },

  {
    path: '/components',
    component: Layout,
    redirect: 'noredirect',
    name: 'component-demo',
    meta: {
      title: 'components',
      icon: 'component'
    },
    children: [
      { path: 'tinymce', component: _import('components-demo/tinymce'), name: 'tinymce-demo', meta: { title: 'tinymce' }},
      { path: 'markdown', component: _import('components-demo/markdown'), name: 'markdown-demo', meta: { title: 'markdown' }},
      { path: 'json-editor', component: _import('components-demo/jsonEditor'), name: 'jsonEditor-demo', meta: { title: 'jsonEditor' }},
      { path: 'dnd-list', component: _import('components-demo/dndList'), name: 'dndList-demo', meta: { title: 'dndList' }},
      { path: 'splitpane', component: _import('components-demo/splitpane'), name: 'splitpane-demo', meta: { title: 'splitPane' }},
      { path: 'avatar-upload', component: _import('components-demo/avatarUpload'), name: 'avatarUpload-demo', meta: { title: 'avatarUpload' }},
      { path: 'dropzone', component: _import('components-demo/dropzone'), name: 'dropzone-demo', meta: { title: 'dropzone' }},
      { path: 'sticky', component: _import('components-demo/sticky'), name: 'sticky-demo', meta: { title: 'sticky' }},
      { path: 'count-to', component: _import('components-demo/countTo'), name: 'countTo-demo', meta: { title: 'countTo' }},
      { path: 'mixin', component: _import('components-demo/mixin'), name: 'componentMixin-demo', meta: { title: 'componentMixin' }},
      { path: 'back-to-top', component: _import('components-demo/backToTop'), name: 'backToTop-demo', meta: { title: 'backToTop' }}
    ]
  },

  // {
  //   path: '/charts',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'charts',
  //   meta: {
  //     title: 'charts',
  //     icon: 'chart'
  //   },
  //   children: [
  //     { path: 'keyboard', component: _import('charts/keyboard'), name: 'keyboardChart', meta: { title: 'keyboardChart', noCache: true }},
  //     { path: 'line', component: _import('charts/line'), name: 'lineChart', meta: { title: 'lineChart', noCache: true }},
  //     { path: 'mixchart', component: _import('charts/mixChart'), name: 'mixChart', meta: { title: 'mixChart', noCache: true }}
  //   ]
  // },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table/complex-table',
    name: 'example',
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      {
        path: '/example/table',
        component: _import('example/table/index'),
        redirect: '/example/table/complex-table',
        name: 'Table',
        meta: {
          title: 'Table',
          icon: 'table'
        },
        children: [
          { path: 'dynamic-table', component: _import('example/table/dynamicTable/index'), name: 'dynamicTable', meta: { title: 'dynamicTable' }},
          { path: 'drag-table', component: _import('example/table/dragTable'), name: 'dragTable', meta: { title: 'dragTable' }},
          { path: 'inline-edit-table', component: _import('example/table/inlineEditTable'), name: 'inlineEditTable', meta: { title: 'inlineEditTable' }},
          { path: 'tree-table', component: _import('example/table/treeTable/treeTable'), name: 'treeTableDemo', meta: { title: 'treeTable' }},
          { path: 'custom-tree-table', component: _import('example/table/treeTable/customTreeTable'), name: 'customTreeTableDemo', meta: { title: 'customTreeTable' }},
          { path: 'complex-table', component: _import('example/table/complexTable'), name: 'complexTable', meta: { title: 'complexTable' }}
        ]
      },
      { path: 'tab/index', icon: 'tab', component: _import('example/tab/index'), name: 'tab', meta: { title: 'tab' }}
    ]
  },
  // {
  //   path: '/theme',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [{ path: 'index', component: _import('theme/index'), name: 'theme', meta: { title: 'theme', icon: 'theme' }}]
  // },
  { path: '*', redirect: '/404', hidden: true },
  {
    path: '/system',
    redirect: '/system/user',
    alwaysShow: true,
    component: Layout,
    name: 'system',
    meta: {
      title: 'system',
      icon: 'form'
    },
    children: [
      { path: 'user', component: _import('permissions/user/user'), name: 'user', meta: { title: 'user', noCache: true }},
      { path: 'permission', component: _import('permissions/permission/permission'), name: 'permission', meta: { title: 'permission', noredirect: true }},
      { path: 'role', component: _import('permissions/role/role'), name: 'role', meta: { title: 'role', noCache: true }}
    ]
  },
  {
    path: '/product',
    redirect: '/product/goods',
    alwaysShow: true,
    component: Layout,
    name: 'goods',
    meta: {
      title: 'product',
      icon: 'form'
    },
    children: [
      { path: 'addGoods', component: _import('product/goods/addGoods'), name: 'addGoods', meta: { title: 'addGoods', noCache: true }},
      { path: 'goods', component: _import('product/goods/goods'), name: 'goods', meta: { title: 'goods', noCache: true }},
      { path: 'brand', component: _import('product/brand/brand'), name: 'brand', meta: { title: 'brand', noCache: true }},
      { path: 'category', component: _import('product/category/category'), name: 'category', meta: { title: 'category', noCache: true }}
    ]
  },
  {
    path: '/monitor',
    redirect: 'noredirect',
    alwaysShow: true,
    component: Layout,
    name: 'monitor',
    meta: {
      title: 'monitor',
      icon: 'form'
    },
    children: [
      { path: 'springbootadmin', component: _import('monitor/springbootadmin'), name: 'springbootadmin', meta: { title: 'springbootadmin', noCache: true }},
      { path: 'connectionpool', component: _import('monitor/connectionpool'), name: 'connectionpool', meta: { title: 'connectionpool', noCache: true }},
      { path: 'eureka', component: _import('monitor/eureka'), name: 'eureka', meta: { title: 'eureka', noCache: true }},
      { path: 'zipkin', component: _import('monitor/zipkin'), name: 'zipkin', meta: { title: 'zipkin', noCache: true }},
      { path: 'rabbitmq', component: _import('monitor/rabbitmq'), name: 'rabbitmq', meta: { title: 'rabbitmq', noCache: true }},
      { path: 'kibana', component: _import('monitor/ELK/kibana'), name: 'kibana', meta: { title: 'kibana', noCache: true }},
      { path: 'head', component: _import('monitor/ELK/head'), name: 'head', meta: { title: 'head', noCache: true }},
      { path: 'bigdesk', component: _import('monitor/ELK/bigdesk'), name: 'bigdesk', meta: { title: 'bigdesk', noCache: true }},
      { path: 'bigdesk', component: _import('monitor/pinpoint'), name: 'pinpoint', meta: { title: 'pinpoint', noCache: true }}
    ]
  },
  {
    path: '/api',
    redirect: 'noredirect',
    alwaysShow: true,
    component: Layout,
    name: 'api',
    meta: {
      title: 'api',
      icon: 'form'
    },
    children: [
      { path: 'member-provider-api', component: _import('api/member-provider-api'), name: 'member-provider-api', meta: { title: 'member-provider-api', noCache: true }},
      { path: 'product-provider-api', component: _import('api/product-provider-api'), name: 'product-provider-api', meta: { title: 'product-provider-api', noCache: true }},
      { path: 'system-api', component: _import('api/system-api'), name: 'system-api', meta: { title: 'system-api', noCache: true }}
    ]
  },
  {
    path: '/member',
    redirect: 'noredirct',
    alwaysShow: true,
    component: Layout,
    name: 'member',
    meta: {
      title: 'member',
      icon: 'form'
    },
    children: [
      { path: 'shopAddress', component: _import('member/shopAddress'), name: 'shopAddress', meta: { title: 'shopAddress', noCache: true }},
      { path: 'shopArea', component: _import('member/shopArea'), name: 'shopArea', meta: { title: 'shopArea', noCache: true }}
    ]
  },
  {
    path: '/gateway',
    redirct: 'nodirect',
    alwaysShow: true,
    component: Layout,
    name: 'gateway',
    meta: {
      title: 'gateway',
      icon: 'form'
    },
    children: [
      { path: 'gateway', component: _import('gateway/gateway'), name: 'gateway', meta: { title: 'gateway', noCache: true }}
    ]
  },
  {
    path: '/order',
    redirct: 'nodirect',
    alwaysShow: true,
    component: Layout,
    name: 'order',
    meta: {
      title: 'order',
      icon: 'form'
    },
    children: [
      { path: 'order', component: _import('order/order'), name: 'order', meta: { title: 'order', noCache: true }}
    ]
  },
  {
    path: '/settings',
    redirct: 'nodirect',
    alwaysShow: true,
    component: Layout,
    name: 'settings',
    meta: {
      title: 'settings',
      icon: 'form'
    },
    children: [
      { path: 'settings', component: _import('settings/settings'), name: 'settings', meta: { title: 'settings', noCache: true }}
    ]
  },
  {
    path: '/article',
    redirct: 'nodirect',
    alwaysShow: true,
    component: Layout,
    name: 'article',
    meta: {
      title: 'article',
      icon: 'form'
    },
    children: [
      { path: 'article', component: _import('article/article'), name: 'article', meta: { title: 'article', noCache: true }}
    ]
  },
  {
    path: '/market',
    redirct: 'nodirect',
    alwaysShow: true,
    component: Layout,
    name: 'market',
    meta: {
      title: 'market',
      icon: 'form'
    },
    children: [
      { path: 'market', component: _import('market/coupon'), name: 'coupon', meta: { title: 'coupon', noCache: true }},
      { path: 'adv', component: _import('market/adv'), name: 'adv', meta: { title: 'adv', noCache: true }}
    ]
  }

]
