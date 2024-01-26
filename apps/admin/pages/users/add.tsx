import type { NextPage } from 'next'

import AdminLayout from '../../modules/admin/components/layout/layout'
import UserForm from '../../modules/admin/forms/userForm'

const AddCollectionPage: NextPage = () => {
  const meta = {
    title: 'NFT2.0 | Admin Add User',
    description: 'Admin Add User',
  }

  return (
    <AdminLayout meta={meta} pageTitle={`Add User`}>
      <UserForm />
    </AdminLayout>
  )
}

export default AddCollectionPage
