import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components';

const TablePagination = (props: any) => {

    const { total, limit, currentPage, setCurrentPage } = props

    let maxPages = 10;
    // if(window.innerWidth >= 540) {
    //     maxPages = 10
    // } else {
    //     maxPages = 6
    // }
    const [currentSet, setCurrentSet] = useState(1)
    const lastPage = Math.ceil(total / limit);
    const nextActive = (currentPage * limit) <= total

    // const offsetValue = (currentPage - 1) * paging?.limit + 1
    
    let elements = [];

    for (let number = 1; number <= lastPage; number++) {
        if(number <= currentSet * maxPages && number > (currentSet-1) * maxPages) {
            elements.push(<PaginationItem key={'cardpage' + number} onClick={() => setCurrentPage(number)} className={`table-pagination-btn ${Number(currentPage) === number ? 'active' : ''}`}>{number}</PaginationItem>)
        }
        if(number === (currentSet-1) * maxPages) {
            elements.push(<PaginationItem key={'cardpage' + number} onClick={() => setCurrentPage(number)} className={`table-pagination-btn ${Number(currentPage) === number ? 'active' : ''}`}>{number}</PaginationItem>)
        }
        if(number === (maxPages * currentSet) + 1) {
            elements.push(<PaginationItem key={'cardpage' + number} onClick={() => setCurrentPage(number)} className={`table-pagination-btn ${Number(currentPage) === number ? 'active' : ''}`}>{number}+</PaginationItem>)
        }
    }

    const onNext = () => {
        if(nextActive){
            let page = currentPage
            page++
            setCurrentPage(page)
        }
    }

    const onPrev = () => {
        if(currentPage !== 1){
            let page = currentPage
            page--
            setCurrentPage(page)
        }
    }

    useEffect(() => {
        if(currentPage <= maxPages) {
            setCurrentSet(1)
        } else {
            if(maxPages * currentSet <= currentPage && maxPages * (currentSet+1) >= currentPage) {
                setCurrentSet(c => c+1)
            } else if (maxPages * (currentSet-1)+1 <= currentPage && maxPages * (currentSet) >= currentPage) {
                setCurrentSet(c => c)
            } else {
                setCurrentSet(c => c-1)
            }
        }
    }, [currentPage, currentSet, maxPages])

    const into = total > limit ? limit : total
    let outof = (currentPage * limit)
    if(total <= limit) outof = total;
    return (
        <PaginationContainer>
            <PaginationText className='pagination-showing'>Showing {currentPage === 1 ? 1 : ((currentPage - 1)*into + 1)} - {outof > total ? total : outof} of total {total} {`record${total >1 ? `s` : ''}`}</PaginationText>
            <PaginationList className="table-pagination">
                <PaginationItem className={`table-prev-btn table-btn ${currentPage === 1 ? 'btn-disabled' : ''}`} onClick={onPrev}>
                    <div className="arrow left" />
                </PaginationItem>
                <PaginationList className="table-pagination-btn-listing">
                    {elements}
                </PaginationList>
                <PaginationItem className={`table-next-btn table-btn ${lastPage === currentPage ? 'btn-disabled': ''}`} onClick={onNext}>
                    <div className="arrow right" />
                </PaginationItem>
            </PaginationList>
        </PaginationContainer>
    )
}

export default TablePagination

interface PaginationItemProps {
    readonly disabled?: boolean,
    readonly selected?: boolean
}

const Page = styled.div`
    margin: 15px;
    display: flex;
    justify-content: end;
    align-items: center;
    color:#23487B;
    font-size:12px;
    margin-top: 15px 0 0 0 ;
 

   span{
    border: 1px solid #23487B;
    border-radius:5px;
    margin:10px;
    padding:2.5px;
    
   }
    
 `;

const LinkS = styled.a`
    text-decoration: none;
 
    min-width: 100%;
    padding:5px 5px;
   
    svg{
        height:10px;
        width:10px;
    }
   
`;

const Pages = styled.div``;

const One = styled.span` border: 1px solid #23487B;
    border-radius:5px;
    margin:10px;
    color:#ffffff;
    background:#23487B;
    font-size:12px`;

const PaginationContainer = styled.div`
    padding: 3.1rem 2rem;
    display: grid;
    justify-content: flex-end;
`;
const PaginationList = styled.div`
    display: flex;
    list-style-type: none;
    align-items: center;
    justify-content: flex-end;
`;

const PaginationText = styled.div`
    font-size: 1.5rem;
    text-align: right;
    margin-bottom: 1rem;
    color: #B4B6BA
`

const PaginationItem = styled.a<PaginationItemProps>`
    padding: 0 12px;
    height: 22px;
    width: 22px;
    cursor: pointer;
    text-align: center;
    font-family: Inter;
    font-size: 12px;
    font-weight: 400;
    line-height: 15px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0 4px;
    border-radius: 5px;
    color: #B4B6BA;
    &.table-btn {
        border: 0.603597px solid #B4B6BA;
        height: 22px;
        width: 22px;
    }
    .arrow {
        height: 10px;
        position: relative;
        top: 0px;
        &::before {
            position: relative;
            /* top: 3pt; Uncomment this to lower the icons as requested in comments*/
            content: '';
            /* By using an em scale, the arrows will size with the font */
            display: inline-block;
            width: 0.4em;
            height: 0.4em;
            border-right: 0.12em solid #B4B6BA;
            border-top: 0.12em solid #B4B6BA;
        }

        &.left {
            transform: rotate(-135deg) translate(-50%);
            right: 5px;
            top: 1px;
        }
        &.right {
            transform: rotate(45deg);
            top: -3px;
            right: -1px;
        }
    }
    &.active {
        background: #23487B;
        color: white;
        border: 1px solid #23487B;
    }
    &.btn-disabled {
        pointer-events: none;
        &:hover {
            background-color: transparent;
            cursor: not-allowed;
        }
        .arrow::before {
            border-right: 0.12em solid #B4B6BA;
            border-top: 0.12em solid #B4B6BA;
        }
    }

    ${props => props.disabled && css`
        pointer-events: none;
        &:hover {
            background-color: transparent;
            cursor: not-allowed;
        }
        .arrow::before {
            border-right: 0.12em solid rgba(0, 0, 0, 0.43);
            border-top: 0.12em solid rgba(0, 0, 0, 0.43);
        }
    `}
`;