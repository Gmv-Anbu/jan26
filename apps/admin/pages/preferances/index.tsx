import type { NextPage } from 'next'

import AdminLayout from '../../modules/admin/components/layout/layout';
import PreferanceForm from '../../modules/admin/forms/preferanceForm';

const Preferances: NextPage = () => {

    const meta = {
        title: 'NFT | Admin Preferances',
        description: 'Admin Add Preferances'
    };

    return (
        <AdminLayout meta={meta} pageTitle={`Preferances`}>
            <PreferanceForm />
        </AdminLayout>
    )
}

export default Preferances;
