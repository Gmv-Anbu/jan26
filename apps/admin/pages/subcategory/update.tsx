import type { NextPage } from 'next'
import AdminLayout from '../../modules/admin/components/layout/layout';
import SubCategoryForm from '../../modules/admin/forms/subCategoryForm';

const UpdateSubCategoryPage: NextPage = () => {

    const meta = {
        title: 'NFT| Admin Update Category',
        description: 'Admin Update Category'
    };

    return (
        <AdminLayout meta={meta} pageTitle={`Edit Sub Category`}>
            <SubCategoryForm isEdit={true} />
        </AdminLayout>
    )
}

export default UpdateSubCategoryPage;
