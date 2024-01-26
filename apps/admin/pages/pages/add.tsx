import { useRouter } from 'next/router'
import AdminLayout from '../../modules/admin/components/layout/layout';
import PageForm from '../../modules/admin/forms/pageForm';

const AddPage = () => {
    const meta = {
        title: 'NFT2.0 | Admin Add Page',
        description: 'Admin Add Page'
    };

    const router = useRouter();
    const { key } = router.query;

    return (
        <AdminLayout meta={meta} pageTitle={`${key ? 'Edit' : 'Add'} Pages`}>
            <PageForm
                editData={router.query}
            />
        </AdminLayout>
    )
}

export default AddPage;
