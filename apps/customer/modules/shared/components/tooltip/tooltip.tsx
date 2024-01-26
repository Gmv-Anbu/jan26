import styled from "styled-components";

const TooltipWrapper = styled.div`
    position: relative;
    display: inline-block;
    
    &:hover .tooltipText {
        visibility: visible;
    }
    .tooltipText {
        visibility: hidden;
        background-color: ${({ theme }) => theme.colors.secondary};
        color: ${({ theme }) => theme.colors.white};
        text-align: center;
        border-radius: 6px;
        padding: 5px 12px;
        white-space: nowrap;

        /* Position the tooltip */
        position: absolute;
        z-index: 1;
        top: -3.5rem;
        left: 50%;
        margin-left: -90px;
    }
`

const Tooltip = (props: any) => {

    const { children, tooltipText } = props
    return (
        <TooltipWrapper>
            {children}
            <span className="tooltipText">{tooltipText}</span>
        </TooltipWrapper>
    )
}

export default Tooltip