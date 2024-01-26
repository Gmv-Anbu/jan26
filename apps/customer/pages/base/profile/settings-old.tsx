import React from 'react'
import type { NextPage } from 'next'

import Account from '../../../modules/customer/account';
import Meta from '../../../modules/shared/components/meta';

const Settings: NextPage = () => {
    return (
        <>
            <Meta />
            <Account.Settings />
        </>
    )
}
export default Settings;