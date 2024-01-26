import type { NextPage } from 'next';
import styled from 'styled-components';
import DashBoard from '../modules/admin/dashboard/dashboard';

import AdminLayout from '../modules/admin/components/layout/layout';
import AssetListing from './artwork';

const AssetHome: NextPage = () => {
  const meta = {
    title: 'NFT2.0 | Admin Artwork Listing',
    description: 'Admin Artwork Listing for NFT',
  };

  return (
    
      <AssetListing />
  
  );
};

export default AssetHome;
