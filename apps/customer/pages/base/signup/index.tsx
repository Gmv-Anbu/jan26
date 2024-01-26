import type { NextPage } from 'next'

import Signup from '../../../modules/customer/Authentication/signup'
import Meta from '../../../modules/shared/components/meta'
const SignUp: NextPage = () => {
  return (
    <>
      <Meta />
      <Signup />
    </>
  )
}

export default SignUp
