import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import AddArtwork from '../../modules/admin/artwork/addArtwork';
import AdminLayout from '../../modules/admin/components/layout/layout';

import API from '../../api/admin/index';

const UpdateArtworkPage: NextPage = () => {
  const router = useRouter();
  const [assetId, setAssetId] = useState<any>(null);
  const [assetData, setAssetData] = useState<any>([]);
  const meta = {
    title: 'NFT2.0 | Admin Edit Artwork',
    description: 'Admin Edit Artwork',
  };

  const goToArtworkList = () => {
    router.push('/artwork');
  };

  const getAssetDataById = () => {
    API.getAssetById(assetId)
    
      .then((res) => {
        if (res?.data?.data) {
          const data = res?.data?.data;
          if (data) {
            setAssetData(data);
          }
        } else {
          goToArtworkList();
        }
      })
      .catch((err) => {
        goToArtworkList();
      });
  };

  useEffect(() => {
    if (router?.query?.id && Number(router?.query?.id)) {
      const id = Number(router?.query?.id);
      setAssetId(id);
    } else {
      goToArtworkList();
    }
  }, [router]);

  useEffect(() => {
    if (assetId) {
      getAssetDataById();
    }
  }, [assetId]);

  return (
    <AdminLayout meta={meta} pageTitle={`Edit Asset`}>
      <AddArtwork
        admin={true}
        isEdit={true}
        assetData={assetData}
        onBackClick={goToArtworkList}
      />
    </AdminLayout>
  );
};

export default UpdateArtworkPage;
