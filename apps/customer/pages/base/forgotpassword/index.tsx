import type { NextPage } from 'next'

import Forgotpassword from '../../../modules/customer/Authentication/forgotpassword'
import Meta from '../../../modules/shared/components/meta'
const ForgotPassword: NextPage = () => {
  return (
    <>
      <Meta />
      <Forgotpassword />
    </>
  )
}

export default ForgotPassword
