import ThemeContext from '@apps/admin/context/themeContext';
import ThemeCustomization from '@apps/admin/modules/admin/components/theme/components/ThemeCustomization/ThemeCustomization';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import AdminLayout from '../../modules/admin/components/layout/layout';
import API from '../../api/admin';
const ThemeCustomizationPage: NextPage = () => {

    const [themeData, setThemeData] = useState<any>()
    const obj = {
        header: 'false',
        footer: 'false',
        richText: 'false',
        reload: 0
    }
    const [flag, setFlag] = useState(obj)
    const meta = {
        title: 'NFT2.0 | Admin Update Category',
        description: 'Admin Update Category'
    };

    const getTheme = () => {
        API.getTheme()
            .then((res) => {
                if (res?.data?.data) {
                    const data = res?.data?.data;
                    setThemeData(data)
                }
            })
            .catch((err) => {
                console.log(err);

            });
    };
    useEffect(() => {
        getTheme();
        // dispatch(getThemeData())
    }, [])


    return (
        <>
            {/* need to use setThemeData to update the form from different components */}
            <ThemeContext.Provider value={{ themeData, setThemeData, flag, setFlag }}>
                <AdminLayout
                    meta={meta}
                    pageTitle={`Themes`}
                    sideMenuCollapse={true}
                    customHeader={true}
                >
                    <ThemeCustomization />
                </AdminLayout>
            </ThemeContext.Provider>
        </>

    )
}

export default ThemeCustomizationPage;
