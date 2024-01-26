import type { NextPage } from 'next'

import Account from '../../../modules/customer/account';
import Meta from '../../../modules/shared/components/meta';
const Profile: NextPage = () => {

    return (
        <>
            <Meta />
            <Account.Profile />
        </>
    )
}

export default Profile;
