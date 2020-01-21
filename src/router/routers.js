import Main from '@/components/main'
/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  // 登录操作
  {
    path: '/',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  // home主页面
  {
    path: '/home',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      // hideInMenu: true,
      // notCache: true
      title: '工作台'
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          // hideInMenu: true,
          title: '工作台',
          // notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  // 修改密码
  {
    path: '/change_password',
    name: 'change_password',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: '/change_password_inner',
        name: 'change_password_inner',
        meta: {
         icon: 'ios-key-outline',
         title: '修改密码'
        },
        component: () => import('@/view/i18n/i18n-page.vue')
      }
    ]
  },
  
  // 用户管理
  {
    path: '/user_manage',
    name: 'user_manage',
    meta: {
      icon: 'logo-buffer',
      title: '用户管理'
    },
    component: Main,
    children: [
      {
        path: '/user_manage_inner',
        name: 'user_manage_inner',
        meta: {
          icon: 'md-navigate',
          title: '用户管理'
        },
        component: () => import('@/view/hello/hello.vue')
      }
    ]
  },

  {
    path: '/g6_topo',
    name: 'g6_topo',
    meta: {
      icon: 'ios-paper-outline',
      title: 'G6拓扑'
    },
    component: Main,
    children: [
      {
        path: '/content_g6_tutorial',
        name: 'content_g6_tutorial',
        meta: {
          icon: 'ios-document',
          title: 'tutorial'
        },
        component: () => import('@/view/g6/tutorial.vue')
      },
      {
        path: '/content_g6_line',
        name: 'content_g6_line',
        meta: {
          icon: 'ios-document',
          title: '节点连线'
        },
        component: () => import('@/view/g6/g6_line.vue')
      },
      {
        path: '/content_g6_forceLayout',
        name: 'content_g6_forceLayout',
        meta: {
          icon: 'ios-cloud-download',
          title: '经典力导向布局'
        },
        component: () => import('@/view/g6/force-layout.vue')
      },
      {
        path: '/content_g6_animateNodes',
        name: 'content_g6_animateNodes',
        meta: {
          icon: 'ios-cloud-download',
          title: '节点动画'
        },
        component: () => import('@/view/g6/animate-nodes.vue')
      },
      {
        path: '/content_g6_hoverEvents',
        name: 'content_g6_hoverEvents',
        meta: {
          icon: 'ios-cloud-download',
          title: '鼠标hover事件'
        },
        component: () => import('@/view/g6/hover-events.vue')
      },
      {
        path: '/content_g6_arcEdge',
        name: 'content_g6_arcEdge',
        meta: {
          icon: 'ios-cloud-download',
          title: '鼠标hover事件'
        },
        component: () => import('@/view/g6/arcEdge.vue')
      }
    ]
  },
  // Echart拓扑图
  {
    path: '/echart_topo',
    name: 'echart_topo',
    meta: {
      icon: 'ios-people',
      title: 'Echart拓扑图'
    },
    component: Main,
    children: [
      {
        path: '/echart_network_topo',
        name: 'echart_network_topo',
        meta: {
          icon: 'md-person',
          title: '网络拓扑图'
        },
        component: () => import('@/view/Echart/networkTopo.vue')
      },
      {
        path: '/echart_force_topo',
        name: 'echart_force_topo',
        meta: {
          icon: 'md-person',
          title: 'Echart力导向图'
        },
        component: () => import('@/view/Echart/forceTopo.vue')
      },
      {
        path: '/echart_animate_topo',
        name: 'echart_animate_topo',
        meta: {
          icon: 'md-person',
          title: 'Echart动画拓扑图'
        },
        component: () => import('@/view/Echart/animateTopo.vue')
      },
      {
        path: '/echart_topo_dragging',
        name: 'echart_topo_dragging',
        meta: {
          icon: 'md-person-add',
          title: 'echart拖拽实例'
        },
        component: () => import('@/view/Echart/dragging.vue')
      },
      {
        path: '/echart_portMonitor',
        name: 'echart_portMonitor',
        meta: {
          icon: 'md-person-add',
          title: '端口监控'
        },
        component: () => import('@/view/Echart/portMonitor.vue')
      },
      {
        path: '/echart_3DBar',
        name: 'echart_3DBar',
        meta: {
          icon: 'md-person-add',
          title: '3D柱状图'
        },
        component: () => import('@/view/Echart/3DBar.vue')
      },
    ]
  },
  //DEMO
  {
    path: '/iview_demo',
    name: 'iview_demo',
    meta: {
      icon: 'ios-people',
      title: 'iview-例子'
    },
    component: Main,
    children: [
      {
        path: '/iview_tabs',
        name: 'iview_tabs',
        meta: {
          icon: 'md-person',
          title: 'iview标签页'
        },
        component: () => import('@/view/demo/tabs/tabs.vue')
      },
      {
        path: '/iview_radio',
        name: 'iview_radio',
        meta: {
          icon: 'md-person',
          title: 'iview单选框'
        },
        component: () => import('@/view/demo/radio/index.vue')
      },
      {
        path: '/iview_dropdown',
        name: 'iview_dropdown',
        meta: {
          icon: 'md-person',
          title: 'iview下拉菜单'
        },
        component: () => import('@/view/demo/dropdown/index.vue')
      },
    ]
  },

  // 错误页面
  {
    path: '/401',
    name: 'error_401',
    meta: {
      icon: 'md-close',
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      icon: 'md-close',
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      icon: 'md-close',
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
