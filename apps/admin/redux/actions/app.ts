import TYPES from "../types/types"
import API from '../../api/admin'
import { getFieldValue } from '@apps/admin/utils/helper'

const updateDeviceType = (value: any) => {
    return (dispatch: any) => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: TYPES.UPDATE_DEVICE_TYPE,
                payload: value
            })
            resolve(true)
        })
    }
}

const storeThemeData = (value: any) => {
    return {
        type: TYPES.THEME_DATA,
        payload: value,
    }
}

const storePreferanceData = (value: any) => {
    return {
        type: TYPES.PREFERANCE_DATA,
        payload: value,
    }
}

const refreshThemeDataApi = (value: boolean) => {
    return {
        type: TYPES.REFRESH_API,
        payload: value,
    }
}

const getTemeDetails = () => {
    return (dispatch: any) => {
        return new Promise((resolve, reject) => {
            API.getTheme().then((response: any) => {
                if (response?.data?.data) {
                    dispatch(storeThemeData(response?.data?.data));
                }
                resolve(response);
            })
                .catch((error) => {
                    reject(error);
                });
        });
    };
};

const getPreferenceData = () => {
    const params: any = {
        page: 1,
        items: 10,
    }
    return (dispatch: any) => {
        return new Promise((resolve, reject) => {
            API.getPreferances(params).then((response: any) => {
                const data = response?.data?.data
                if (data) {
                    const preferenceData = {
                        meta_title: getFieldValue(data, "meta_title"),
                        meta_description: getFieldValue(data, "meta_description"),
                        google_analytics: getFieldValue(data, "google_analytics"),
                    }
                    dispatch(storePreferanceData(preferenceData));
                }
                resolve(response);
            })
                .catch((error) => {
                    reject(error);
                });
        });
    };
};

const getConfigData = () => {
    return (dispatch: any) => {
        return new Promise((resolve, reject) => {
            API.getAdminConfig()
            .then((response: any) => {
                if (response?.data?.data) {
                    dispatch({
                        type: TYPES.ADMIN_CONFIG,
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

export default {
    updateDeviceType,
    storeThemeData,
    refreshThemeDataApi,
    storePreferanceData,
    getTemeDetails,
    getPreferenceData,
    getConfigData
}
