import { RootState } from '@apps/customer/redux/store';
import { objectDeepClone } from '@apps/customer/utils/helper';
import config from '../../apiConfig'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const useAuctionSocket = (auctionId) => {

    const router = useRouter()
    const { API_URL } = config
    const [wsBidHistory, setWSBidHistory] = useState(null)
    const [wsAuctionDetails, setWSAuctionDetails] = useState(null)
    const profileData = useSelector<RootState, any>((state) => state?.userData?.userDetails)
    const isBrowser = typeof window !== "undefined";
    const [wsInstance, setWsInstance] = useState(null);

    const initalizeWS = () => {
        const socket = new WebSocket(`wss://${API_URL.split('//')[1]}?token=${profileData?.accessToken}`);
        console.log('socket', socket)
        socket.addEventListener("open", (event) => {
            console.log('Connected to WebSocket server'); 
            const subscriptionData = {
                action: 'subscribe',
                subscriptionType: 'auction',
                subscriptionId: auctionId 
            }
            socket.send(JSON.stringify(subscriptionData));
        });

        socket.addEventListener("message", (event: any) => {
            console.log('Received update:', event?.data);
            let data = objectDeepClone(JSON.parse(event?.data))
            if(data?.type === 'auctionData' && data?.data) {
                if(data?.data?.bidIncrements?.length) {
                    let arr = []
                    data?.data?.bidIncrements.map(el => {
                        arr.push({ value: el, label: el })
                    })
                    data.data.bidIncrements = arr
                }
                setWSAuctionDetails(data?.data)
            } else {
                if(data?.data?.bidHistory?.rows?.length) {
                    setWSBidHistory(data?.data?.bidHistory)
                }
            }
            console.log('data', data?.data)
        });

        socket.addEventListener("error", (error: any) => {
            console.log('Socket error :-',error)
        })

        socket.addEventListener("close", (data: any) => {
            console.log('Connection closed', data)
            if(router.asPath.includes('/auctions/bid-now')) {
                setTimeout(() => initalizeWS(), 3000)
            }
        })
    }

    useEffect(() => {
        console.log('isBrowser, profileData', isBrowser, profileData, router)
       if(isBrowser && profileData?.accessToken && API_URL) initalizeWS()    
    },[isBrowser, profileData?.accessToken, API_URL])
    
    return { wsBidHistory, wsAuctionDetails }
}

export default useAuctionSocket 