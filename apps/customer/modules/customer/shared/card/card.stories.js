import Card from './card'
import CollectionCard from '../collectionCard/index'
import BidsCard from '../nftDetails/CardBids'

const profileData = {
    "id": 1,
    "name": "CoinList Mina Token Sale",
    "price": "1.1818 ETH",
    "userName": "jonraf_wavakazi",
    "image": "/images/customer/sample-avatar.png",
    "NFT": "/images/customer/demo-preview.png",
    "isVerified": true,
    "convertedPrice": "$ 124"
}

const collectionData = {
    "id": 1,
    "coverImg": "/images/customer/collections/collection-cover-1.png",
    "title": "The Beholders",
    "totalNFTs": "5nfts",
    "userImg": "/images/customer/collections/avatar-1.png",
    "userName": "Theresa Webb",
    "isVerified": true
}

export default {
    title: 'Cards',
    component: Card
}

export const Basic = () => {
    return (
        <Card 
            id={profileData?.id}
            NFT={profileData?.NFT}
            image={profileData?.image}
            name={profileData?.name}
            userName={profileData?.userName}
            isVerified={profileData?.isVerified}
            price={profileData?.price}
            convertedPrice={profileData?.convertedPrice}
        />
    )
}

export const Collection = () => {
    return (
        <CollectionCard
            id={collectionData?.id} 
            coverImg={collectionData?.coverImg} 
            title={collectionData?.title} 
            totalNFTs={collectionData?.totalNFTs} 
            userImg={collectionData?.userImg} 
            userName={collectionData?.userName} 
            isVerified={collectionData?.isVerified}
        />
    )
}

export const Bids = () => <BidsCard />