import React, { useState, useEffect } from 'react';
import useTimeLeftHook from '../../../../hooks/useTimeLeftHook';
import styled from 'styled-components';

const FLexSpaceBetween = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6rem;
    padding-top: 2rem;
    color: ${({ theme }) => theme.colors.white};
    @media (min-width: 315px) and (max-width: 395px) {
        gap: 3rem;
}
    @media (min-width: 280px) and (max-width: 314px) {
            gap: 2rem;
    }
    @media (min-width: 260px) and (max-width: 279px) {
            gap: 1rem;
    }
`
const AuctionBoxMainText = styled.p`
    font-family: ${({ theme }) => theme.fontsFamily.primary};
    font-size: 3.6rem;
    font-weight: 600;
    line-height: 4.2rem;
    min-width: 6.5rem;
    letter-spacing: 0.02em;
    margin: 0;
    margin-bottom: 0.5rem;
`
const AuctionBoxSubText = styled.span`
    font-family: ${({ theme }) => theme.fontsFamily.primary};
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 2.3rem;
    letter-spacing: 0.02em;
    color: ${({ theme }) => theme.colors.pink};
`

const TimeLeftCard = (props: any) => {
    const { time } = props
    // const [daysLeft, hoursLeft, minutesLeft, secondsLeft, timeUp] = useTimeLeftHook(props.time)
    // days, hours, mins, secs 

    // const { time } = props

    // const [countdownInterval, setCountdownInterval] = useState<any>(null)
    // const [mainTime, setMainTime] = useState(null)
    // const [timeElement, setTimeElement] = useState<any>(null)
    // const [daysLeft, setDays] = useState<any>(null)
    // const [hoursLeft, setHours] = useState<any>(null)
    // const [minutesLeft, setMinutes] = useState<any>(null)
    // const [secondsLeft, setSeconds] = useState<any>(null)
    // const [timeUp, setTimeUp] = useState(false)

    // const formatTime = () => {
    //     let timeInterval: any
    //     clearInterval(timeInterval)
    //     clearInterval(countdownInterval)
    //     if (mainTime) {
    //         let countDownDate = new Date(mainTime).getTime()
    //         timeInterval = setInterval(() => {
    //             const now = new Date().getTime()
    //             const timeleft = countDownDate - now

    //             const days = Math.floor(timeleft / (1000 * 60 * 60 * 24))
    //             const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    //             const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60))
    //             const seconds = Math.floor((timeleft % (1000 * 60)) / 1000)

    //             setDays(days < 10 ? '0'+days : days)
    //             setHours(hours < 10 ? '0'+hours : hours)
    //             setMinutes(minutes < 10 ? '0'+minutes : minutes)
    //             setSeconds(seconds < 10 ? '0'+seconds : seconds)
    //             if (timeleft < 0) {
    //                 clearInterval(timeInterval)
    //                 setTimeUp(true)
    //                 // window.location.reload()
    //             }
    //         }, 1000)
    //         setCountdownInterval(timeInterval)
    //     } else {
    //         clearInterval(timeInterval)
    //     }

    //     return () => {
    //         clearInterval(timeInterval)
    //         clearInterval(countdownInterval)            
    //     }
    // }

    // useEffect(() => {
    //     if(time && window) {
    //         setMainTime(time)
    //         let element = document?.getElementById('time')
    //         if(element) setTimeElement(element)
    //     }
    // }, [time])

    // useEffect(() => {
    //     if(mainTime) {
    //         formatTime()
    //     }
    // }, [mainTime])

    return (
        <FLexSpaceBetween>
            {time?.timeUp
                ? <div><AuctionBoxMainText>Expired !!!</AuctionBoxMainText></div>
                : <>
                    <div>
                        <AuctionBoxMainText>{time?.daysLeft}</AuctionBoxMainText>
                        <AuctionBoxSubText>days</AuctionBoxSubText>
                    </div>
                    <div>
                        <AuctionBoxMainText>{time?.hoursLeft}</AuctionBoxMainText>
                        <AuctionBoxSubText>Hrs</AuctionBoxSubText>
                    </div>
                    <div>
                        <AuctionBoxMainText>{time?.minutesLeft}</AuctionBoxMainText>
                        <AuctionBoxSubText>Mins</AuctionBoxSubText>
                    </div>
                    <div>
                        <AuctionBoxMainText>{time?.secondsLeft}</AuctionBoxMainText>
                        <AuctionBoxSubText>Sec</AuctionBoxSubText>
                    </div>
                </>}
        </FLexSpaceBetween>

    )
}

export default TimeLeftCard