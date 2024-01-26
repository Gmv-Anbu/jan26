import { ReactNode, useState } from "react";
import Tab from './tab'
interface ITab {
    selectedTab: string;
    changeTab: (val: string) => void;
    render?:(tabList:Array<any>)=>ReactNode
}

const useTab = (initialValue:string): ITab => {
    const [selectedTab, setSelectedTab] = useState(initialValue);
    const changeTab = (tabValue: string) => setSelectedTab(tabValue);
    return { selectedTab, changeTab, render:(tabList)=><Tab data={tabList} onChange={changeTab} selectedTab={selectedTab} /> };
}

export default useTab;