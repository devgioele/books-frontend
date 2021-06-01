import Landing from 'screens/Landing';
import Explore from 'screens/Explore';
import Sell from 'screens/Sell';
import Profile from 'screens/Profile';
import Book from 'screens/Book';
import Dashboard from 'screens/Dashboard';
import Authorization from 'screens/Authorization';
import BookEditSellDialog from 'components/BookEditSellDialog';
import { BookRemoveDialog } from 'screens/Sell/Sell.jsx';
import Confirm from 'screens/Confirm';
import BookLinkDialog from 'components/BookLinkDialog';
import EditProfilePictureDialog from 'components/profile/EditProfilePictureDialog';
import EditProfileDialog from 'components/profile/EditProfileDialog';
import {
  AUTH_ROUTE,
  BOOK_ROUTE,
  CONFIRM_ROUTE,
  DASHBOARD_ROUTE,
  EDIT_PROFILE_PICTURE_ROUTE,
  EDIT_PROFILE_ROUTE,
  EDIT_SELL_ROUTE,
  EXPLORE_ROUTE,
  LANDING_ROUTE,
  LINK_SELL_ROUTE,
  NEW_SELL_ROUTE,
  PROFILE_ROUTE,
  REMOVE_SELL_ROUTE,
  SELL_ROUTE,
} from './helpers';
import RoutePrivilege from './privileges';

const routes = [
  {
    path: LANDING_ROUTE,
    isExact: true,
    privilege: RoutePrivilege.ANYONE,
    component: Landing,
  },
  {
    path: CONFIRM_ROUTE,
    isExact: true,
    privilege: RoutePrivilege.AUTHENTICATED,
    component: Confirm,
  },
  {
    path: AUTH_ROUTE,
    isExact: true,
    privilege: RoutePrivilege.GUEST,
    component: Authorization,
  },
  {
    path: BOOK_ROUTE,
    isExact: true,
    privilege: RoutePrivilege.AUTHENTICATED,
    component: Book,
  },
  {
    path: DASHBOARD_ROUTE,
    isExact: false,
    privilege: RoutePrivilege.AUTHENTICATED,
    component: Dashboard,
    routes: [
      {
        path: EXPLORE_ROUTE,
        isExact: false,
        privilege: RoutePrivilege.AUTHENTICATED,
        component: Explore,
      },
      {
        path: SELL_ROUTE,
        isExact: false,
        privilege: RoutePrivilege.AUTHENTICATED,
        component: Sell,
        routes: [
          {
            path: NEW_SELL_ROUTE,
            isExact: false,
            privilege: RoutePrivilege.AUTHENTICATED,
            component: BookEditSellDialog,
          },
          {
            path: EDIT_SELL_ROUTE,
            isExact: false,
            privilege: RoutePrivilege.AUTHENTICATED,
            component: BookEditSellDialog,
          },
          {
            path: REMOVE_SELL_ROUTE,
            isExact: false,
            privilege: RoutePrivilege.AUTHENTICATED,
            component: BookRemoveDialog,
          },
          {
            path: LINK_SELL_ROUTE,
            isExact: false,
            privilege: RoutePrivilege.AUTHENTICATED,
            component: BookLinkDialog,
          },
        ],
      },
      {
        path: PROFILE_ROUTE,
        isExact: false,
        privilege: RoutePrivilege.AUTHENTICATED,
        component: Profile,
        routes: [
          {
            path: EDIT_PROFILE_ROUTE,
            isExact: false,
            isProtected: true,
            component: EditProfileDialog,
          },
          {
            path: EDIT_PROFILE_PICTURE_ROUTE,
            isExact: false,
            isProtected: true,
            component: EditProfilePictureDialog,
          },
        ],
      },
    ],
  },
];

export default routes;
