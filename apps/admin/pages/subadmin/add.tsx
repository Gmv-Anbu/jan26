import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import AddArtwork from '../../modules/admin/artwork/addArtwork'
import AddSubAdmin from '../../modules/admin/subadmin/addSubadmin'
import AdminLayout from '../../modules/admin/components/layout/layout'

const AddSubAdminComponent: NextPage = () => {
  const router = useRouter()
  const meta = {
    title: 'NFT2.0 | Admin Add Subadmin',
    description: 'Admin Add Subadmin',
  }

  const onBackClick = () => {
    router.push('/subadmin')
  }

  return (
    <AdminLayout meta={meta} pageTitle={`Add Subadmin`}>
      <AddSubAdmin admin={true} onBackClick={onBackClick} />
    </AdminLayout>
  )
}

export default AddSubAdminComponent
