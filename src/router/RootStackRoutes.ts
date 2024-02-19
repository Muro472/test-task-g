import { RouteRecordRaw } from 'vue-router';
import { RouterLinks } from 'src/utils/enums/RouterLinks';
import { RouterNames } from 'src/utils/enums/RouterNames';

export const rootStackRoutes: RouteRecordRaw[] = [
  {
    path: RouterLinks.REQUESTS_PAGE,
    name: RouterNames.REQUESTS_PAGE,
    component: () => import('src/pages/RootStack/RequestsPage.vue'),
  },

  //user routes
  {
    path: RouterLinks.ID_ROOT_STACK,
    name: RouterNames.ID_ROOT_STACK,
    redirect: { name: RouterNames.USER_REQUESTS_PAGE },
    component: () => import('src/components/stacks/UserStack.vue'),
    children: [
      {
        path: RouterLinks.CREATE_PAGE,
        name: RouterNames.CREATE_PAGE,
        component: () => import('src/pages/RootStack/CreateHomePage.vue'),
      },
      {
        path: RouterLinks.CREATE_ORDER_PAGE,
        name: RouterNames.CREATE_ORDER_PAGE,
        component: () => import('src/pages/RootStack/CreateOrderPage.vue'),
      },
      {
        path: RouterLinks.CREATE_DELIVERY_PAGE,
        name: RouterNames.CREATE_DELIVERY_PAGE,
        component: () => import('src/pages/RootStack/CreateOrderPage.vue'),
      },
      {
        path: RouterLinks.USER_REQUESTS_PAGE,
        name: RouterNames.USER_REQUESTS_PAGE,
        component: () => import('src/pages/RootStack/UserRequestsPage.vue'),
      },
    ],
  },
];
