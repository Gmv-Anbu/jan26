import { getCookie, removeCookie } from '@nft-marketplace/js-cookie';
import { updateDeviceType } from '../redux/reducer/appSlice';
import { hydrateAuthentication } from '../redux/reducer/authSlice';
import { getProfile } from '../redux/reducer/userSlice';
import { KEYS } from "./storage";

// const { updateDeviceType, reauthenticateCustomer, deauthenticate } = action

export const initialize = async (ctx, store) => {
    const { req } = ctx
    const state = store?.getState()
    // await store.dispatch(getThemeDetails());
    if (!state?.app?.isMobile) {
        const isMobile = Boolean(
            (ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent)?.match(
                /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
            ),
        )
        await store.dispatch(updateDeviceType(isMobile))
    }
    if (!process.browser) {
        if (req.headers.cookie && getCookie(KEYS?.CUSTOMER_TOKEN, req)) {
            await store.dispatch(hydrateAuthentication(getCookie(KEYS?.CUSTOMER_TOKEN, req)))
            await store.dispatch(getProfile(getCookie(KEYS?.CUSTOMER_TOKEN, req)));
            // await store.dispatch(reauthenticateCustomer(getCookie(KEYS?.CUSTOMER_TOKEN, req), 'customer')).catch(err => onUnauthorize(err, ctx, store))
        }
    }
}

async function onUnauthorize(err, ctx, store) {
    console.log(err)
    console.log('--------------------- onUnauthorize ---------------------')
    if (err.response && err.response.status && (err.response.status === 401 || err.response.status === 403)) {
        // await store.dispatch(deauthenticate(ctx.isServer))
        removeCookie(KEYS?.CUSTOMER_TOKEN)
    }
}