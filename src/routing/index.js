import Landing from 'screens/Landing';
import Login from 'screens/Login';
import Explore from 'screens/Explore';
import Sell from 'screens/Sell';
import Profile from 'screens/Profile';
import Book from 'screens/Book';
import Dashboard from 'screens/Dashboard';
import {
  BOOK_ROUTE,
  CONFIRM_ROUTE,
  DASHBOARD_ROUTE,
  EXPLORE_ROUTE,
  LANDING_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  SELL_ROUTE,
} from './helpers';
import Confirm from '../screens/Confirm';

const routes = [
  {
    path: LANDING_ROUTE,
    isExact: true,
    isProtected: false,
    component: Landing,
  },
  {
    path: CONFIRM_ROUTE,
    isExact: true,
    isProtected: true,
    component: Confirm,
  },
  {
    path: LOGIN_ROUTE,
    isExact: true,
    isProtected: false,
    component: Login,
  },
  {
    path: BOOK_ROUTE,
    isExact: true,
    isProtected: true,
    component: Book,
  },
  {
    path: DASHBOARD_ROUTE,
    isExact: false,
    isProtected: true,
    component: Dashboard,
    routes: [
      {
        path: EXPLORE_ROUTE,
        isExact: false,
        isProtected: true,
        component: Explore,
      },
      {
        path: SELL_ROUTE,
        isExact: false,
        isProtected: true,
        component: Sell,
      },
      {
        path: PROFILE_ROUTE,
        isExact: false,
        isProtected: true,
        component: Profile,
      },
    ],
  },
];

export default routes;
