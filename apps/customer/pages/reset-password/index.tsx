import type { NextPage } from 'next'

import Resetpassword from '../../modules/customer/Authentication/resetpassword'
import Meta from '../../modules/shared/components/meta'
const ResetPassword: NextPage = () => {
  return (
    <>
      <Meta />
      <Resetpassword />
    </>
  )
}

export default ResetPassword
