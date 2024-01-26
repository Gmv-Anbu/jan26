import { ReactNode, useEffect, useState } from "react";
import Tab from './tab'
interface ITab {
    selectedTab: Record<string,any>;
    changeTab: (id: string|number, name: string, assetCount: number | string) => void;
    render?:(tabList:Array<any>)=>ReactNode
}

const useTab = (initialValue:Record<string,any>): ITab => {
    const [selectedTab, setSelectedTab] = useState(initialValue);
    const changeTab = (id,name,assetCount) => setSelectedTab({id, name, assetCount});
    
    useEffect(() => {
        setSelectedTab(initialValue)
    },[initialValue])

    return { selectedTab, changeTab, render:(tabList)=><Tab tabs={tabList} handleTabChange={changeTab} selectedTab={selectedTab} />};
}

export default useTab;