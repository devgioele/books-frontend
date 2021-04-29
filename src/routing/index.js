import Landing from 'screens/Landing';
import Login from 'screens/Login';
import Explore from 'screens/Explore';
import Sell from 'screens/Sell';
import Profile from 'screens/Profile';
import Book from 'screens/Book';
import Dashboard from 'screens/Dashboard';
import {
  BOOK_ROUTE,
  DASHBOARD_ROUTE,
  EDIT_SELL_ROUTE,
  EXPLORE_ROUTE,
  LANDING_ROUTE,
  LOGIN_ROUTE,
  NEW_SELL_ROUTE,
  PROFILE_ROUTE,
  SELL_ROUTE,
} from './helpers';
import SellBookDialog from '../components/SellBookDialog';

const routes = [
  {
    path: LANDING_ROUTE,
    isExact: true,
    isProtected: false,
    component: Landing,
  },
  {
    path: LOGIN_ROUTE,
    isExact: true,
    isProtected: false,
    component: Login,
  },
  {
    path: BOOK_ROUTE,
    isExact: false,
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
        routes: [
          {
            path: NEW_SELL_ROUTE,
            isExact: false,
            isProtected: true,
            component: SellBookDialog,
          },
          {
            path: EDIT_SELL_ROUTE,
            isExact: false,
            isProtected: true,
            component: SellBookDialog,
          },
        ],
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
