import React, { useContext, useState } from 'react';
import ThemeContext from '@apps/admin/context/themeContext';
import CustomFileUpload from '@apps/admin/modules/shared/components/formInputs/CustomFileUpload';
import { handleApiImage } from '@apps/admin/utils/helper';
import { EditSeperator } from '../header/UpdateHeader.styled';
import API from '../../../../../../api/admin/index';

interface UploadFaviconProps {
  selectedKey: string;
}

const UploadFavicon = ({ selectedKey }: UploadFaviconProps) => {
  const SettingsData = useContext<any>(ThemeContext);
  const [favIcon, setFavIcon] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChangeFavicon = async (file: File) => {
    setIsLoading(true);
    API.uploadThemeImage(file)
      .then((response) => {
        setIsLoading(false);
        if (response) {
          const url = response?.data?.data?.url;
          const apiImage = handleApiImage(url);
          setFavIcon(apiImage);
          updateObject(apiImage);
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const handleFileUpload = async (fileUrl: Blob, fileBlob: File) => {
    if (fileBlob) handleChangeFavicon(fileBlob);
  };

  const deleteFavIcon = () => {
    setFavIcon('');
    updateObject('');
  };

  const fileUploadContent = {
    label: 'Upload your favicon image',
    btnLabel: 'Change Favicon',
  };

  const updateObject = (url: string) => {
    SettingsData?.setThemeData((themeData) => ({
      ...themeData,
      setting: {
        ...themeData.setting,
        [selectedKey]: url,
      },
    }));
  };

  return (
    <>
      <EditSeperator>
        <h3>Upload favicon</h3>
      </EditSeperator>
      <EditSeperator>
        <label>Favicon</label>

        <CustomFileUpload
          validExtensions={['image/x-icon']}
          value={favIcon}
          onChange={handleFileUpload}
          loader={isLoading}
          onDelete={deleteFavIcon}
          content={fileUploadContent}
        />
      </EditSeperator>
    </>
  );
};

export default UploadFavicon;
