
import { handleApiImage } from "@apps/admin/utils/helper";
import CustomFileUpload from "@apps/admin/modules/shared/components/formInputs/CustomFileUpload";
import Image from "next/image";
import Router from 'next/router';
import { useCallback, useEffect, useState } from "react";
import API from '../../../../../../api/admin/index';
import { EditSeperator, StatsContainer, StatsItem } from "./UpdateHeader.styled";



// this function will call when we need to delete the logo


function UpdateHeaderComponent(props: any) {

    //Data contains all the data regardning user side header
    //callback function is a function used to call to update the data in form
    const { Data, callback, flag, setFlag, sectionName, logoDimensions } = props

    //to set the url of the logo   

    const [LogoUrl, setLogoUrl] = useState(Data?.appLogo);

    // const [errors, setErrors] = useState<any>({});
    const obj = sectionName == 'richText' ? Data?.name : Data?.search
    const [searchText, setSearchtText] = useState(obj)
    const [socialLinks, setSocialLinks] = useState(Data?.socialLinks)//[{link:'',name:''}]
    const [initailImageUrl, setIntialImageUrl] = useState(Data?.appLogo)
    const [copyrightText, setCopyrightText] = useState(Data?.copyrightText)
    const [email, setEmail] = useState(Data?.email)
    const [statsData, setStatsData] = useState(Data?.stats)

    const [loader, setLoader] = useState(false)
    const handleChangeLogo = (file: File) => {
        setLoader(true);

        API.uploadThemeImage(file)
            .then((res) => {
                setLoader(false);

                if (res) {
                    const temp = handleApiImage(res?.data?.data?.url)


                    setLogoUrl(temp)

                    setFlag(flag => ({
                        ...flag,
                        ...((sectionName == 'header') && ({ header: true })),
                        ...((sectionName == 'footer') && ({ footer: true })),
                        ...((sectionName == 'richText') && ({ richText: true })),
                    }))

                }
            })
            .catch((err) => {
                setLoader(false);
                console.log(err);
            });
    };

    const DeleteLogo = () => {

        setLogoUrl(initailImageUrl)
        setFlag(flag => ({
            ...flag,
            ...((sectionName == 'header') && ({ header: false })),
            ...((sectionName == 'footer') && ({ footer: false })),
            ...((sectionName == 'richText') && ({ richText: false })),
        }))
    }

    const handleFileUpload = async (fileUrl: Blob, fileBlob: File) => {
        if (fileBlob) handleChangeLogo(fileBlob);
    };

    const handleEdit = (e) => {
        setSearchtText(e.target.value)
    }

    const handleSocialLink = (key, value, id) => {
        if (key == 'name') {
            const name = value;
            setSocialLinks(currentLinks => currentLinks.map((x, key) => key === id ? { ...x, name } : x
            ))
        } else {
            const link = value
            setSocialLinks(currentLinks => currentLinks.map((x, key) => key === id ? { ...x, link } : x
            ))
        }

    }

    const handleStatsChange = (e, key) => {

        setStatsData(statsData => ({
            ...statsData,
            [key]: e.target.value
        }))
    }

    const handleCopyrightTextChange = (e) => {
        setCopyrightText(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const sendUpdatedData = useCallback(() => {

        callback(themeData => ({
            ...themeData,
            sections: {
                ...themeData.sections,
                home: {
                    ...themeData.sections.home,
                    [sectionName]: {
                        ...themeData.sections.home[sectionName],
                        appLogo: LogoUrl,
                        ...((sectionName == 'richText') && ({ name: searchText })),
                        ...((sectionName == 'richText') && ({ stats: statsData })),
                        ...((sectionName == 'header') && ({ search: searchText })),
                        ...((sectionName == 'footer') && ({ socialLinks: [...socialLinks], copyrightText: copyrightText, email: email })),
                        // here need to integrate menu's part whenever implemented
                        // or according to requirement need to update from other component
                    }
                }
            }
        }))
    }, [callback, sectionName, LogoUrl, searchText, statsData, socialLinks, copyrightText, email])



    useEffect(() => {
        if (LogoUrl !== undefined) {
            sendUpdatedData()
        }

    }, [LogoUrl, searchText, sendUpdatedData, statsData])


    const fileUploadContent = {
        label: 'Upload your logo image',
        btnLabel: 'Change Logo',
    }

    //used to redirect to menu page 
    const handleMenuClicked = () => {
        Router.push('/navigation/' + sectionName)
    }

    return (

        <>
            <EditSeperator>
                <h3>Edit the header section</h3>
            </EditSeperator>
            <EditSeperator>
                <label>Logo</label>

                <CustomFileUpload
                    validExtensions={[
                        'image/jpeg',
                        'image/jpg',
                        'image/png',
                    ]}
                    value={flag[sectionName] == true && LogoUrl}
                    onChange={handleFileUpload}
                    loader={loader}
                    onDelete={DeleteLogo}
                    content={fileUploadContent}
                    imageDimensions={logoDimensions}
                />

            </EditSeperator>
            {
                sectionName !== 'richText' ?
                    <EditSeperator>
                        <div className='d-flex-aic'>
                            <p className='redirect-text'>
                                <span className='mr-2'>Go to Menu </span>
                                <Image src={'/svgs/info.svg'} width={14} height={14} alt={"info"} className='pointer' />
                            </p>
                            <a className='ml-auto d-flex-aic' onClick={handleMenuClicked}>
                                <Image src={'/svgs/redirect.svg'} width={18} height={18} alt={"redirect"} className='pointer' />
                            </a>
                        </div>
                    </EditSeperator>
                    :
                    // need to implement the stats section for richText
                    <EditSeperator>
                        <p>Stats</p>
                        <StatsContainer >
                            {Object?.entries(statsData).map(([key, value]) => {
                                // Pretty straightforward - use key for the key and value for the value.
                                // Just to clarify: unlike object destructuring, the parameter names don't matter here.

                                return (

                                    <StatsItem key={key}>
                                        {/* <span>{key}</span>
                                        <span>{value.toString()}</span> */}
                                        <input
                                            type='text'
                                            name="key"
                                            value={key}
                                            disabled />
                                        <input
                                            type='text'
                                            name={key}
                                            value={value.toString()}
                                            onChange={(e) => handleStatsChange(e, key)} />

                                    </StatsItem>

                                )
                            })
                            }
                        </StatsContainer>
                    </EditSeperator>

            }
            {
                sectionName == 'footer' &&
                <EditSeperator>
                    <label>Copyright Text </label>
                    <input
                        type='text'
                        name="copyrightText"
                        value={copyrightText}
                        onChange={(e) => handleCopyrightTextChange(e)} />
                </EditSeperator>
            }
            {
                sectionName == 'footer' &&
                <EditSeperator>
                    <label>Email </label>
                    <input
                        type='text'
                        name="email"
                        value={email}
                        onChange={(e) => handleEmailChange(e)} />
                </EditSeperator>
            }
            {
                sectionName == 'footer' &&

                <EditSeperator>
                    <label>Social Links</label>
                    {
                        socialLinks?.map((i, index) => {
                            return (
                                <div key={index} className="sociallink">
                                    <input
                                        type='text'
                                        name="name"
                                        value={i.name}
                                        onChange={(e) => {
                                            const name = e.target.value;
                                            handleSocialLink('name', name, index)
                                        }}
                                        disabled
                                    />
                                    <input
                                        type='text'
                                        name="link"
                                        value={i.link}
                                        onChange={(e) => {
                                            const link = e.target.value;
                                            handleSocialLink('link', link, index)
                                        }} />
                                </div>
                            )
                        })
                    }

                </EditSeperator>
            }
            {
                sectionName == 'header' &&
                <EditSeperator>
                    <label>Searchbar </label>
                    <input
                        type='text'
                        name="searchbar"
                        value={searchText}
                        onChange={(e) => handleEdit(e)} />
                </EditSeperator>
            }
            {
                sectionName == 'richText' &&
                <EditSeperator>
                    <label>Name</label>
                    <input
                        type='text'
                        name="searchbar"
                        value={searchText}
                        onChange={(e) => handleEdit(e)} />
                </EditSeperator>
            }
        </>
    )
}



export default UpdateHeaderComponent





