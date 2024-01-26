import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import AddArtwork from '../../modules/admin/artwork/addArtwork';
import AdminLayout from '../../modules/admin/components/layout/layout';

const AddArtWorkPage: NextPage = () => {

    const router = useRouter();
    const meta = {
        title: 'NFT2.0 | Admin Add Artwork',
        description: 'Admin Add Artwork'
    };

    const onBackClick = () => {
        router.push('/artwork')
    }

    return (
        <AdminLayout meta={meta} pageTitle={`Add Asset`}>
            <AddArtwork 
                admin={true}
                onBackClick={onBackClick} 
            />
        </AdminLayout>
    )
}

export default AddArtWorkPage;
