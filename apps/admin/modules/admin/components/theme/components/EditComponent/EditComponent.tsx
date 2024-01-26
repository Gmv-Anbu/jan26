
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Counter, EditSeperator } from "./index.styled";


function EditComponent(props: any) {


    const { Data, callback, sectionName, PageName } = props

    const temp = sectionName == 'collection' ? Data?.noOfCollections : Data?.noOfNFTs
    const [counter, setCounter] = useState(temp)
    const [name, setName] = useState(Data?.name)
    const [isEnable, setEnable] = useState(Data?.isEnable)
    const [description, setDescription] = useState(Data?.description)

    const handleEdit = (e) => {
        setName(e.target.value)
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
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
                        ...((sectionName !== 'basicSetting') && ({ isEnable: isEnable })),
                        ...((sectionName == 'collection') ? { noOfCollections: counter } : (sectionName !== 'newsletterSubscription') && ({ noOfNFTs: counter })),
                        ...(({ name: name })),
                        ...((sectionName == 'newsletterSubscription') && { description: description }),
                    }
                }
            }
        }))
    }, [callback, isEnable, counter, name, description])

    useEffect(() => {

        sendUpdatedData()


    }, [counter, name, isEnable, sendUpdatedData, PageName])


    const increment = () => {
        if (counter < 20) {
            setCounter(counter + 1)
        }
    }


    const decrement = () => {
        if (counter > 0) {
            setCounter(counter - 1)
        }
    }
    const handleChange = (event) => {
        if (event.type === 'keydown' && event.key === 'Backspace' && event.target.value === '') {
            event.preventDefault();
            setCounter(0);
        } else if (event.type === 'input' && event.target.value === '') {
            setCounter(0);
        } else if (event.key === 'ArrowUp') {
            if (event.target.value < 20) {
                setCounter(parseInt(event.target.value, 10) + 1);
            }
        } else if (event.key === 'ArrowDown') {
            if (event.target.value > 0) {
                setCounter(parseInt(event.target.value, 10) - 1);
            }
        } else {
            const newValue = parseInt(event.target.value, 10);
            if (!Number.isNaN(newValue) && newValue >= 0 && newValue <= 20) {
                setCounter(newValue);
            }
        }
    }
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
            <EditSeperator>
                <label>Edit {sectionName} text </label>
                <input
                    type='text'
                    name="searchbar"
                    value={name}
                    onChange={(e) => handleEdit(e)}
                />
            </EditSeperator>
            {
                sectionName === 'newsletterSubscription' ?
                    <EditSeperator>
                        <label>Edit {sectionName} description </label>
                        <textarea
                            name="description"
                            value={description}
                            onChange={(e) => handleDescriptionChange(e)}
                            rows={20}
                            cols={15}
                        />
                    </EditSeperator> : null
            }
            {
                sectionName !== 'newsletterSubscription' ?
                    <EditSeperator>
                        <div className="pad">Set {sectionName == 'collection' ? 'Collection' : 'NFT'} Count
                            <Image src={'/svgs/info.svg'} width={14} height={14} alt={"info"} className='pointer' />
                        </div>
                        <Counter>
                            <span className="minus" onClick={() => decrement()}>-</span>

                            <input type="text" value={counter} pattern="[0-9]*" onChange={(e) => handleChange(e)} onInput={(e) => handleChange(e)} onKeyDown={(e) => handleChange(e)} />
                            <span className="plus" onClick={() => increment()}>+</span>
                        </Counter>
                    </EditSeperator> : null
            }
        </>
    )
}



export default EditComponent





