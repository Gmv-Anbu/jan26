
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { EditSeperator, ImageUploadHeader } from "./index.styled";
import CustomFileUpload from "@apps/admin/modules/shared/components/formInputs/CustomFileUpload";
import { ButtonGradientPrimary } from "@apps/admin/modules/shared/components/button/button";
import API from '@apps/admin/api/admin'
import {
    handleApiImage,
} from '@apps/admin/utils/helper';

function EditSupporters(props: any) {
    const { Data, callback, sectionName, PageName } = props
    const [name, setName] = useState(Data?.name)
    const [isEnable, setEnable] = useState(Data?.isEnable)
    const [description, setDescription] = useState(Data?.description)
    const [supporterImages, setSupporterImages] = useState(Data?.images);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [addImage, setAddImage] = useState<boolean>(false);

    const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value)
    }

    const handleAddImage = () => {
        setAddImage(true)
    }

    const sendUpdatedData = useCallback(() => {
        callback(themeData => ({
            ...themeData,
            sections: {
                ...themeData.sections,
                [PageName]: {
                    ...themeData.sections[PageName],
                    [sectionName]: {
                        ...themeData.sections[PageName][sectionName],
                        ...({ isEnable: isEnable }),
                        ...(({ name: name })),
                        ...({ description: description }),
                        ...({ images: supporterImages }),
                    }
                }
            }
        }))
    }, [callback, isEnable, name, description, supporterImages])

    useEffect(() => {
        sendUpdatedData()
    }, [name, isEnable, sendUpdatedData, PageName])

    const handleEnableClick = () => {
        setEnable(!isEnable)
    }

    const fileUploadContent = {
        label: 'Upload supporter image',
        btnLabel: 'Change Image',
    }

    const handleChangeImage = async (file: File) => {
        setIsLoading(true);
        API.uploadThemeImage(file)
            .then((response) => {
                setIsLoading(false);
                if (response) {
                    const url = response?.data?.data?.url;
                    setSupporterImages([...supporterImages, url]);
                }
                setAddImage(false)
            })
            .catch((error) => {
                setIsLoading(false);
            });
    }

    const handleFileUpload = async (fileUrl: Blob, fileBlob: File) => {
        if (fileBlob) handleChangeImage(fileBlob);
    };

    const handleImageDelete = (value) => {
        const images = supporterImages.filter(image => !value.includes(image));
        setSupporterImages(images)
    };

    return (
        <>
            <EditSeperator>
                <h3>Edit the {sectionName} section</h3>
            </EditSeperator>
            <EditSeperator>
                <label>Enable/disable</label>
                <div className='enable-section'>
                    <p>{sectionName}</p>
                    <Image src={isEnable == true ? '/svgs/eye-open.svg' : '/svgs/eye-closed.svg'} width={14} height={14} alt={"info"} className='pointer' onClick={() => handleEnableClick()} />
                </div>
            </EditSeperator>
            <EditSeperator>
                <label>Edit {sectionName} text </label>
                <input
                    type='text'
                    name="searchbar"
                    value={name}
                    onChange={(e) => handleEdit(e)}
                />
            </EditSeperator>
            <EditSeperator>
                <label>Edit {sectionName} description </label>
                <textarea
                    name="description"
                    value={description}
                    onChange={(e) => handleDescriptionChange(e)}
                    rows={8}
                    cols={15}
                />
            </EditSeperator>
            <EditSeperator>
                <ImageUploadHeader>
                    <label>Images</label>
                    <ButtonGradientPrimary fs="1.4" size="sm" onClick={handleAddImage}>
                        Add Images
                    </ButtonGradientPrimary>
                </ImageUploadHeader>
                {
                    supporterImages.map((image) => {
                        return (
                            <CustomFileUpload
                                key={image}
                                validExtensions={[
                                    'image/jpeg',
                                    'image/jpg',
                                    'image/png',
                                ]}
                                value={handleApiImage(image)}
                                onChange={handleFileUpload}
                                onDelete={handleImageDelete}
                                content={fileUploadContent}
                            />
                        )
                    }
                    )
                }
                {
                    addImage ?

                        <CustomFileUpload
                            validExtensions={[
                                'image/jpeg',
                                'image/jpg',
                                'image/png',
                            ]}
                            value={''}
                            onChange={handleFileUpload}
                            loader={isLoading}
                            onDelete={handleImageDelete}
                            content={fileUploadContent}
                        /> : null}

            </EditSeperator>
        </>
    )
}

export default EditSupporters