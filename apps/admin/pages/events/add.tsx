import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import AdminLayout from '../../modules/admin/components/layout/layout';
import EventsForm from '@apps/admin/modules/admin/events/eventsForm';

const AddArtWorkPage: NextPage = () => {

    const router = useRouter();
    const meta = {
        title: 'NFT2.0 | Admin Add Event',
        description: 'Admin Add Event'
    };

    const onBackClick = () => {
        router.push('/events')
    }

    return (
        <AdminLayout meta={meta} pageTitle={`Add Event`}>
            <EventsForm 
                admin={true}
                onBackClick={onBackClick} 
            />
        </AdminLayout>
    )
}

export default AddArtWorkPage;
