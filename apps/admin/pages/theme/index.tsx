import ThemePageContent from '@apps/admin/modules/admin/components/theme';
import type { NextPage } from 'next';
import AdminLayout from '../../modules/admin/components/layout/layout';

const ThemePage: NextPage = () => {

    const meta = {
        title: 'NFT2.0 | Admin Update Category',
        description: 'Admin Update Category'
    };

    return (
        <>
            <AdminLayout meta={meta} pageTitle={`Themes`} sideMenuCollapse={false}>
                <ThemePageContent />
            </AdminLayout>
        </>
    )
}

export default ThemePage;
