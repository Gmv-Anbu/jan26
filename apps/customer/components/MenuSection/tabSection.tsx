import React, { useMemo } from 'react'
import styled from 'styled-components'

const SectionWrapper = styled.article`
    height: 90px;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: clip;
    gap: 1.6rem;
    align-items: center;
    label{
        font-size: 1.6rem;
        line-height: 104%;
        padding: 1.7rem 2.1rem;
        border-radius: 59px;
        border: 1px solid #D1E0E2;
        color: ${({theme}) => theme.colors.primary};
        background-color: #F4F9F9;
    }
    [type='checkbox']:checked + label {
        background-color: #2A7575;
        color: white;
        border: 0;
    }
    .each-section{
        /* flex-grow: 1; */
        flex-shrink: 0;
    }
    ::-webkit-scrollbar {
        height: 0em;
    }
`

const TabSection = ({tabs, handleSectionChange, selectedSection}) => {
    const renderSections = useMemo(() => {
        return tabs?.map(el => (
            <div key={el.id} className='each-section'>
                <input
                    id={el.id}
                    type="checkbox"
                    value={el.id}
                    checked={selectedSection.find(section => section.id === el.id)}
                    onChange={() => handleSectionChange(el.id, el.name)}
                />
                <label htmlFor={el.id}>
                    {el.name} ({el.assetCount || 0})
                </label>
            </div>
        ))
    },[selectedSection,tabs])

  return (
    <SectionWrapper>
        {renderSections}
    </SectionWrapper>
  )
}

export default TabSection