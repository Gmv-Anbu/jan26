import type { NextPage } from 'next'

import AdminLayout from '../../modules/admin/components/layout/layout'
import AddUserForm from '@apps/admin/modules/admin/forms/addUserNew'

const UpdateUserPage: NextPage = () => {
  const meta = {
    title: 'NFT2.0 | Admin Update User',
    description: 'Admin Update User',
  }

  return (
    <AdminLayout meta={meta} pageTitle={`Update User`}>
      <AddUserForm isEdit={true} />
    </AdminLayout>
  )
}

export default UpdateUserPage
