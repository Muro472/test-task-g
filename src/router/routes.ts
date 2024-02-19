import { RouteRecordRaw } from 'vue-router';
import { RouterLinks } from 'src/utils/enums/RouterLinks';
import { RouterNames } from 'src/utils/enums/RouterNames';
import { rootStackRoutes } from 'src/router/RootStackRoutes';

const routes: RouteRecordRaw[] = [
  {
    path: RouterLinks.HOME_PAGE,
    name: RouterNames.HOME_PAGE,
    redirect: { name: RouterNames.REQUESTS_PAGE },
    component: () => import('src/components/stacks/RootStack.vue'),
    children: rootStackRoutes,
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
