import { ReactNode, useState } from "react";
import TabSection from './tabSection'

interface ISection {
    id: number | string;
    name: string
}
interface ITab {
    selectedSection: ISection[];
    changeSection: (id: string|number, name: string) => void;
    render?:(tabList:Array<any>)=>ReactNode
}

const useTabSection = (initialValue:ISection[]): ITab => {
    const [selectedSection, setSelectedSection] = useState<ISection[]>(initialValue);
    const changeSection = (id,name) => {
        const isChecked = selectedSection.find(section => section.id === id)
        if(isChecked){
            setSelectedSection(selectedSection.filter(section => section.id !== id))
            return
        }
        setSelectedSection(current => {
            return [...current.filter(each => each.id !== 0), {id, name}]
        })
        if(id === 0){
            setSelectedSection([{id,name}])
        } 
    } ;
    return { selectedSection, changeSection, render:(tabList)=><TabSection tabs={tabList} handleSectionChange={changeSection} selectedSection={selectedSection} />};
}

export default useTabSection;