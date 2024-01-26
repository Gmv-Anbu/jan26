import type { NextPage } from 'next'

import Signin from '../../../modules/customer/Authentication/signin'
import Meta from '../../../modules/shared/components/meta'
const SignIn: NextPage = () => {
  return (
    <>
      <Meta />
      <Signin />
    </>
  )
}

export default SignIn
