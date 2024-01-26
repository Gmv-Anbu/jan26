import type { NextPage } from 'next'

import AdminLayout from '../../modules/admin/components/layout/layout';
import CategoryForm from '../../modules/admin/forms/categoryForm';

const AddCategoryPage: NextPage = () => {
    
    const meta = {
        title: 'NFT | Admin Add Category',
        description: 'Admin Add Category'
    };

    return (
        <AdminLayout meta={meta} pageTitle={`Add Category`}>
            <CategoryForm isEdit={false} />
        </AdminLayout>
    )
}

export default AddCategoryPage;
