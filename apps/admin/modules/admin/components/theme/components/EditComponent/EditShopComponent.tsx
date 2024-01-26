import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { EditSeperator } from "./index.styled";


function EditShopComponent(props: any) {


    const { Data, callback, sectionName, PageName } = props


    const [isEnable, setEnable] = useState(Data?.isEnable)



    const sendUpdatedData = useCallback(() => {
        callback(themeData => ({
            ...themeData,
            sections: {
                ...themeData.sections,
                shop: {
                    ...themeData.sections.shop,
                    [sectionName]: {
                        ...themeData.sections.shop[sectionName],
                        isEnable: isEnable
                    }



                }
            }
        }))
    }, [callback, isEnable])

    useEffect(() => {

        sendUpdatedData()


    }, [isEnable, sendUpdatedData])

    const handleEnableClick = () => {
        setEnable(!isEnable)
    }

    return (

        <>
            <EditSeperator>
                <h3>Edit the {sectionName} section</h3>
            </EditSeperator>

            {
                sectionName !== 'basicSetting' &&
                <EditSeperator>
                    <label>Enable/disable</label>
                    <div className='enable-section'>
                        <p>{`${sectionName == 'bannerCarousel' ? 'banner' : sectionName}`}</p>
                        <Image src={isEnable == true ? '/svgs/eye-open.svg' : '/svgs/eye-closed.svg'} width={14} height={14} alt={"info"} className='pointer' onClick={() => handleEnableClick()} />
                    </div>
                </EditSeperator>
            }
        </>
    )
}



export default EditShopComponent





