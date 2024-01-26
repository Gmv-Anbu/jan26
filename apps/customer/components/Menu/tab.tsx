import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

const TabWrapper = styled.article`
    padding-bottom: 16px;
    border-bottom: 1.5px solid #D1E0E2;
    display: flex;
    gap: 4rem;
    
    [type='radio']:checked + label {
        color: #2A7575;
        font-weight: 600;
        border-bottom: 4px solid #2A7575;
        padding-bottom: 16px;
    }
    @media screen and (max-width: 549px){
        /* width: 125%; */
        gap: 26px;
        overflow-x: auto;
        overflow-y: clip;
        [type='radio']:checked + label {
            padding-bottom: 10px;
        }
        .each-tab{
            flex-shrink: 0;
            padding-bottom: 5px;
        }
        ::-webkit-scrollbar {
            width: 1em;
            height: 3px;
        }
        ::-webkit-scrollbar-track {
            box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        }
        ::-webkit-scrollbar-thumb {
            background-color: #F4F9F9;
            outline: 1px solid slategrey;
        }
    }
`

const Tab = ({tabs, handleTabChange, selectedTab}) => {

    const router = useRouter()

    const renderTabs = useMemo(() => {
        return tabs?.map((each,index) => (
                 <div key={each.id} className='each-tab'>
                     <input
                         id={each.name}
                         type="radio"
                         value={each.name}
                         checked={selectedTab.name === each.name}
                         onChange={() => {
                            if(router?.asPath.includes('/base/museum')) {
                                localStorage.setItem('museumIndex', index+1)
                            } else {
                                localStorage.removeItem('museumIndex')
                            }
                            handleTabChange(each.id, each.name, each.assetCount)
                         }}
                     />
                     <label htmlFor={each.name}>
                     {each.name} ({each.assetCount || 0})
                     </label>
                 </div>
         ))
     },[selectedTab,tabs])

  return (
    <TabWrapper>
        {renderTabs}
    </TabWrapper>
  )
}

export default Tab