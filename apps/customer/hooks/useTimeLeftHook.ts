import React, { useState, useEffect } from 'react'

const useTimeLeftHook = (initialValue: string) => {
    // const { time } = props  // pass Time in milliseconds
    const [countdownInterval, setCountdownInterval] = useState<any>(null)
    const [mainTime, setMainTime] = useState<any>(initialValue)
    const [timeElement, setTimeElement] = useState<any>(null)
    const [daysLeft, setDays] = useState<any>(null)
    const [hoursLeft, setHours] = useState<any>(null)
    const [minutesLeft, setMinutes] = useState<any>(null)
    const [secondsLeft, setSeconds] = useState<any>(null)
    const [timeUp, setTimeUp] = useState<boolean>(false)

    const formatTime = () => {
        let timeInterval: any
        clearInterval(timeInterval)
        clearInterval(countdownInterval)
        if (mainTime) {
            const countDownDate = new Date(mainTime).getTime()

            timeInterval = setInterval(() => {
                const now = new Date().getTime()

                const timeleft = countDownDate - now

                const days = Math.floor(timeleft / (1000 * 60 * 60 * 24))
                const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60))
                const seconds = Math.floor((timeleft % (1000 * 60)) / 1000)

                setDays(days < 10 ? '0' + days : days)
                setHours(hours < 10 ? '0' + hours : hours)
                setMinutes(minutes < 10 ? '0' + minutes : minutes)
                setSeconds(seconds < 10 ? '0' + seconds : seconds)
                if (timeleft < 0) {
                    setDays('00')
                    setHours('00')
                    setMinutes('00')
                    setSeconds('00')
                    clearInterval(timeInterval)
                    setTimeUp(true)
                    // window.location.reload()
                }
            }, 1000)
            setCountdownInterval(timeInterval)
        } else {
            clearInterval(timeInterval)
        }
        return () => {
            clearInterval(timeInterval)
            clearInterval(countdownInterval)

        }
    }

    useEffect(() => {
        if (initialValue && window) {
            setMainTime(initialValue)
        }
    }, [initialValue])

    useEffect(() => {
        if (mainTime) {
            formatTime()
        }
    }, [mainTime])

    return [daysLeft, hoursLeft, minutesLeft, secondsLeft, timeUp,setTimeUp]

}

export default useTimeLeftHook;