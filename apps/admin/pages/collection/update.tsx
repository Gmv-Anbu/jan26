import type { NextPage } from 'next'

import AdminLayout from '../../modules/admin/components/layout/layout';
import CollectionForm from '../../modules/admin/forms/collectionForm';

const UpdateCollectionPage: NextPage = () => {

    const meta = {
        title: 'NFT2.0 | Admin Update Collection',
        description: 'Admin Update Collection'
    };

    return (
        <AdminLayout meta={meta} pageTitle={`Edit Collection`}>
            <CollectionForm isEdit={true} />
        </AdminLayout>
    )
}

export default UpdateCollectionPage;
