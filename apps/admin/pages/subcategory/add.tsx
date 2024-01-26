import type { NextPage } from 'next'

import AdminLayout from '../../modules/admin/components/layout/layout';
import SubCategoryForm from '../../modules/admin/forms/subCategoryForm';

const AddSubCategoryPage: NextPage = () => {
    
    const meta = {
        title: 'NFT | Admin Add SubCategory',
        description: 'Admin Add SubCategory'
    };

    return (
        <AdminLayout meta={meta} pageTitle={`Add SubCategory`}>
            <SubCategoryForm isEdit={false} />
        </AdminLayout>
    )
}

export default AddSubCategoryPage;
