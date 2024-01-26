import { useCallback, useEffect, useState } from "react";
import { EditSeperator, ImageUploadHeader } from "./index.styled";
import CustomFileUpload from "@apps/admin/modules/shared/components/formInputs/CustomFileUpload";
import {
    handleApiImage,
} from '@apps/admin/utils/helper';
import API from '@apps/admin/api/admin'

const fileUploadContent = {
    label: 'Upload image',
    btnLabel: 'Change Image',
}

function UpdatePopUpImages(props: any) {
    const { Data, callback, sectionName, PageName } = props
    const [popUpImages, setPopUpImagesImages] = useState(Data?.images);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedKey, setSelectedKey] = useState(null);

    const sendUpdatedData = useCallback(() => {
        callback(themeData => ({
            ...themeData,
            sections: {
                ...themeData.sections,
                [PageName]: {
                    ...themeData.sections[PageName],
                    [sectionName]: {
                        ...themeData.sections[PageName][sectionName],
                        ...({ images: popUpImages }),
                    }
                }
            }
        }))
    }, [callback, popUpImages])

    useEffect(() => {
        sendUpdatedData()
    }, [sendUpdatedData])

    const handleOnChnage = (key) => {
        setSelectedKey(key)
    };

    const handleChangeImage = async (file: File) => {
        setIsLoading(true);
        API.uploadThemeImage(file)
            .then((response) => {
                setIsLoading(false);
                if (response) {
                    const url = response?.data?.data?.url;
                    let image = { ...popUpImages }
                    image[selectedKey] = url
                    setPopUpImagesImages(image);
                }
            })
            .catch((error) => {
                setIsLoading(false);
            });
    }

    const handleFileUpload = async (fileUrl: Blob, fileBlob: File) => {
        if (fileBlob) handleChangeImage(fileBlob);
    };

    const handleImageDelete = (value) => {
        let images = { ...popUpImages }
        images[selectedKey] = ''
        setPopUpImagesImages(images)
    };

    return (
        <>
            <EditSeperator>
                <h3>Edit the {sectionName} section</h3>
            </EditSeperator>
            <EditSeperator>
                <ImageUploadHeader>
                    <label>Images</label>
                </ImageUploadHeader>
                {
                    Object.entries(popUpImages).map(([key, value]) => (
                        <div key={key} onClick={() => handleOnChnage(key)}>
                            <div>{key}</div>
                            <CustomFileUpload
                                key={key}
                                validExtensions={[
                                    'image/jpeg',
                                    'image/jpg',
                                    'image/png',
                                ]}
                                value={handleApiImage(value)}
                                onChange={handleFileUpload}
                                loader={selectedKey === key ? isLoading : false}
                                disable={isLoading}
                                onDelete={handleImageDelete}
                                content={fileUploadContent}
                            />
                            <br />
                        </div>
                    ))
                }
            </EditSeperator>
        </>
    )
}



export default UpdatePopUpImages





