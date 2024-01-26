import Router from 'next/router';
import { ThemeProvider } from 'styled-components';
import React, { useEffect } from 'react'
import GlobalStyle from '../styles/globalstyle';
import { adminTheme } from '../styles/themes/admin';
import { ToastContainer } from 'react-toastify';

import '../styles/globals.css';

import { wrapper } from '../redux/store';
import { initialize } from '../utils/utils';
import { ModalRoot } from '@nft-marketplace/modal';
import actions from '@apps/admin/redux/actions'
import { Provider } from 'react-redux'
import { getCookie } from '@nft-marketplace/js-cookie'
import { KEYS } from '../utils/storage'
import { APP_ENV } from '../config';

const NFTAlpha = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest)
  const token = getCookie(KEYS.ADMIN_TOKEN)

  useEffect(() => {
    const adminId = getCookie(KEYS.ADMIN_ID);
    if(adminId) {
      store?.dispatch(actions.getAdminDetials(adminId))
    }
    if(token){
      // store?.dispatch(actions.getConfigData())
      // store?.dispatch(actions.getTemeDetails())
      // store.dispatch(actions.getPreferenceData())
    }
  }, [token])

  return (
    <Provider store={store}>
      <ToastContainer limit={1} autoClose={3000} />
      <ThemeProvider theme={adminTheme}>
        <GlobalStyle />
        <ModalRoot />
        <Component {...props.pageProps} />
      </ThemeProvider>
    </Provider>
  )
}
NFTAlpha.getInitialProps = wrapper.getInitialAppProps(
  (store) =>
    async ({ Component, ctx }) => {
      await initialize(ctx, store);

      const { isAuthenticated, userType, userDetails } =
        store.getState().userData;
      const { res, pathname } = ctx;
      const PUBLIC_ROUTES = [
        '/auth/login',
        '/auth/forgot-password',
        '/auth/verification',
        '/auth/change-password',
        '/linkExpired',
      ];
      const RESTRICTED_ROUTES = [
        '/theme',
        '/theme/ThemeCustomization',
        '/navigation',
        '/navigation/[menuId]',
        '/pages',
        '/preferances',
        '/subscribers'
      ];

      const commonRedirect = (redirect: any) => {
        if (typeof window === 'undefined') {
          res?.writeHead(302, { Location: redirect });
          res?.end();
        } else {
          Router.push(redirect);
        }
      };
      
      if (APP_ENV.SHOW_THEME == 'false' && RESTRICTED_ROUTES.indexOf(pathname) !== -1) {
        
        commonRedirect('/')
      }
      if (isAuthenticated && PUBLIC_ROUTES.indexOf(pathname) !== -1) {
        commonRedirect('/');
      } else if (PUBLIC_ROUTES.indexOf(pathname) === 2) {
        if (userDetails === null) {
          commonRedirect('/auth/login');
        }
      } else if (
        isAuthenticated === false &&
        PUBLIC_ROUTES.indexOf(pathname) === -1
      ) {
        commonRedirect('/auth/login');
      }

      return {
        pageProps: {
          ...(Component.getInitialProps
            ? await Component.getInitialProps({
              ...ctx,
              store,
            })
            : {}),
        },
      };
    }
);
export default NFTAlpha
