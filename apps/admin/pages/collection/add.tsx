import type { NextPage } from 'next'

import AdminLayout from '../../modules/admin/components/layout/layout';
import CollectionForm from '../../modules/admin/forms/collectionForm';

const AddCollectionPage: NextPage = () => {

    const meta = {
        title: 'NFT2.0 | Admin Add Collection',
        description: 'Admin Add Collection'
    };

    return (
        <AdminLayout meta={meta} pageTitle={`Add Collection`}>
            <CollectionForm isEdit={false} />
        </AdminLayout>
    )
}

export default AddCollectionPage;
