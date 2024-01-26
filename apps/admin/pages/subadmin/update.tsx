import type { NextPage } from 'next'

import AdminLayout from '../../modules/admin/components/layout/layout';
import SubAdminForm from '../../modules/admin/subadmin/addSubadmin'

const UpdateCollectionPage: NextPage = () => {

    const meta = {
        title: 'NFT2.0 | Admin Update Collection',
        description: 'Admin Update Collection'
    };

    return (
        <AdminLayout meta={meta} pageTitle={`Edit Collection`}>
            <SubAdminForm isEdit={true}/>
        </AdminLayout>
    )
}

export default UpdateCollectionPage;
