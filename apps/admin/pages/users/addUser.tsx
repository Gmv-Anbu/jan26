import type { NextPage } from 'next'

import AdminLayout from '../../modules/admin/components/layout/layout'
import AddUserForm from '@apps/admin/modules/admin/forms/addUserNew'

const AddUserPage: NextPage = () => {
  const meta = {
    title: 'NFT2.0 | Admin Add User',
    description: 'Admin Add User',
  }

  return (
    <AdminLayout meta={meta} pageTitle={`Add User`}>
      <AddUserForm />
    </AdminLayout>
  )
}

export default AddUserPage
