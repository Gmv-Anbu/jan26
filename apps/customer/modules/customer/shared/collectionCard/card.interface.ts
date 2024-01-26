interface ICollectionCard {
    id: number;
    coverImg: string;
    title: string;
    totalNFTs?: string;
    userImg: string;
    userName: string;
    isVerified: boolean;
    onClick ?:()=> void;
}

export default ICollectionCard;