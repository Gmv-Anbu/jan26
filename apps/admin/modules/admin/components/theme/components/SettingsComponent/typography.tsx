import React, { useContext, useEffect, useState } from 'react';
import ThemeContext from '@apps/admin/context/themeContext';
import CustomFileUpload from '@apps/admin/modules/shared/components/formInputs/CustomFileUpload';
import { handleApiImage } from '@apps/admin/utils/helper';
import { EditSeperator } from '../header/UpdateHeader.styled';
import API from '../../../../../../api/admin/index';

interface UploadFaviconProps {
  selectedKey: string;
}

const Typography = ({ selectedKey }: UploadFaviconProps) => {
    const SettingsData = useContext<any>(ThemeContext);
    const [typoData, setTypoData] = useState<any>({

    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

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

    const handleInput = (e) => {
        const { name, value } = e?.target
        SettingsData?.setThemeData((themeData) => ({
            ...themeData,
            setting: {
                ...themeData.setting,
                typography: {
                    ...themeData.setting.typography,
                    [name]: value,
                },
            },
        }));
    }

    const renderInputFields = () => {
        return (
            <>
            {Object.keys(typoData).map(function(key, index) {
                if(key) {
                    return (
                        <EditSeperator>
                        <label>{key}</label>
                        <input
                            type='text'
                            name={key}
                            value={typoData?.[key]}
                            onChange={(e) => handleInput(e)} 
                        />
                        </EditSeperator>
                    )
                }
            })}
            </>
        )
    }

    useEffect(() => {
        if(SettingsData?.themeData?.setting?.typography) {
            setTypoData(SettingsData?.themeData?.setting?.typography)
        }
    },[SettingsData])

    return (
        <div>
            <EditSeperator>
                <h3>Typography</h3>
            </EditSeperator>
            {renderInputFields()}
        </div>
    );
};

export default Typography;
