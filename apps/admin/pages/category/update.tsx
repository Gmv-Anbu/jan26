import type { NextPage } from 'next'
import AdminLayout from '../../modules/admin/components/layout/layout';
import CategoryForm from '../../modules/admin/forms/categoryForm';

const UpdateCategoryPage: NextPage = () => {

    const meta = {
        title: 'NFT| Admin Update Category',
        description: 'Admin Update Category'
    };

    return (
        <AdminLayout meta={meta} pageTitle={`Edit Category`}>
            <CategoryForm isEdit={true} />
        </AdminLayout>
    )
}

export default UpdateCategoryPage;
