import action from '../redux/actions'
import { KEYS } from "./storage";
import { getCookie, removeCookie, setCookie } from '@nft-marketplace/js-cookie'

const { updateDeviceType, reauthenticate, deauthenticate } = action

export const initialize = async(ctx, store) => {
    const { req } = ctx
    const state = store?.getState()
    if (!state.app.isMobile) {
        const isMobile = Boolean(
            (ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent).match(
                /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
            ),
        )
        await store.dispatch(updateDeviceType(isMobile))
    }

    if (!process.browser) {
        if (req.headers.cookie && req.headers.cookie.includes('admin') && getCookie(KEYS?.ADMIN_TOKEN, req) && getCookie(KEYS?.ADMIN_ID, req)) {
            const response = await store.dispatch(reauthenticate(getCookie(KEYS?.ADMIN_TOKEN, req), getCookie(KEYS?.ADMIN_ID, req))).catch(err => onUnauthorize(err, ctx, store))
        }
    }
}

async function onUnauthorize(err, ctx, store) {
    console.log(err)
    console.log('--------------------- onUnauthorize ---------------------')
    if (err.response && err.response.status && (err.response.status === 401 || err.response.status === 403)) {
        //Logout logic
        await store.dispatch(deauthenticate(ctx.isServer))
        if(ctx?.req?.headers?.cookie?.includes('admin')) {
            removeCookie(KEYS?.ADMIN_TOKEN)
            // ctx.res?.clearCookie(KEYS?.ADMIN_TOKEN, {path:''})
        } else{
            removeCookie(KEYS?.CUSTOMER_TOKEN)
        }
        // ctx.res?.clearCookie(KEYS?.ADMIN_TOKEN)
        
    }
}