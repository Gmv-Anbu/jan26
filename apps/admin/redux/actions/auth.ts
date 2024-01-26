import TYPE from '../types/types';
import { KEYS } from '../../utils/storage';
import ADMIN_API from '../../api/admin/auth';
import { removeCookie, setCookie } from '@nft-marketplace/js-cookie';

const loginUser = (value: any) => {
  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      ADMIN_API.login(value)
        .then((res: any) => {
          if (res?.data?.data?.accessToken?.length) {
            initHeaders(res.data.data.accessToken);
            setCookie(KEYS.ADMIN_TOKEN, res.data.data.accessToken);
            setCookie(KEYS.ADMIN_ID, res.data.data.id);
            // setCookie(KEYS.ADMIN_USER, res.data.data)
            dispatch({
              type: TYPE.LOGIN_USER,
              payload: 'admin',
            });
            dispatch({
              type: TYPE.USER_DETAILS,
              payload: res.data.data,
            });
          } else if (res?.data?.data) {
            dispatch({
              type: TYPE.USER_DETAILS,
              payload: res.data.data,
            });
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

const reauthenticate = (cookie: any, adminId: any) => {
  return (dispatch: any, getState: any) => {
    return new Promise((resolve, reject) => {
      // if(cookie && adminId) { 
      //   ADMIN_API.getAdminDetails(adminId, cookie+'asdasd')
      //   .then(res => {
      //     console.log('getAdminDetails', res)
      //     if(res?.data?.data) {
      //       initHeaders(cookie);
      //       resolve(true);
      //       dispatch({
      //         type: TYPE.USER_DETAILS,
      //         payload: res?.data?.data,
      //       });
      //     } else {
      //       console.log('getAdminDetails err else', res)
      //       logOutUser(dispatch, true, getState())
      //     }
      //   })
      //   .catch(err => {
      //     console.log('getAdminDetails err', err)
      //     logOutUser(dispatch, true, getState())
      //     reject(err);
      //   })
      // } else {
      //   logOutUser(dispatch, true, getState())
      //   reject('Token missing in reauthenticate');
      // }
      if (cookie && adminId) {
        // getAdminDetials(adminId)
        resolve(true);
        dispatch({
          type: TYPE.LOGIN_USER,
          payload: 'admin',
        });
      } else {
        reject(false);
      }
      initHeaders(cookie);
    });
  };
};

const getAdminDetials = (id: any) => {
  return (dispatch: any) => {
      return new Promise((resolve, reject) => {
          ADMIN_API.getAdminDetails(id)
          .then((response: any) => {
              if (response?.data?.data) {
                  dispatch({
                      type: TYPE.USER_DETAILS,
                      payload: response?.data?.data
                  })
              }
              resolve(response);
          })
          .catch((error) => {
              reject(error);
          });
      });
  };
};

const deauthenticate = (isServer: any) => {
  return (dispatch: any, getState: any) => {
    return new Promise((resolve, reject) => {
      logOutUser(dispatch, isServer, getState());
      resolve(true);
    });
  };
};

const initHeaders = (token: any) => {
  ADMIN_API.initHeaders(token);
};

const logOutUser = (dispatch?: any, isServer?: any, states?: any) => {
  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      ADMIN_API.logoutAdmin()
      .then((response: any) => {
          removeCookie(KEYS.CUSTOMER_TOKEN);
          removeCookie(KEYS.ADMIN_TOKEN);
          removeCookie(KEYS.ADMIN_ID);
          removeCookie(KEYS.CURRENT_PROVIDER_NAME);
          resolve(true);
      })
      .catch((error) => {
          reject(error);
      });
      dispatch({
        type: TYPE.LOGOUT_USER,
        payload: null,
      });
    });
  };
};

const twoFactorLogin = (value: any) => {
  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      ADMIN_API.twoFactorAuthentication(value)
        .then((res: any) => {
          if (res?.data?.data?.accessToken?.length) {
            initHeaders(res.data.data.accessToken);
            setCookie(KEYS.ADMIN_TOKEN, res.data.data.accessToken);
            setCookie(KEYS.ADMIN_ID, res.data.data.id);
            // setCookie(KEYS.ADMIN_USER, res.data.data)
            dispatch({
              type: TYPE.LOGIN_USER,
              payload: 'admin',
            });
            dispatch({
              type: TYPE.USER_DETAILS,
              payload: res.data.data,
            });
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};

export default {
  loginUser, // admin
  twoFactorLogin, //admin
  reauthenticate, // admin
  getAdminDetials, // admin
  deauthenticate, // common
  logOutUser, // common
};
