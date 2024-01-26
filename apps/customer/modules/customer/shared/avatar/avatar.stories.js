import Avatar from './avatar'
import CreatorCollectionsCard from '../infoCard/creatorCollectionInfo'

export default {
    title: 'Avatar',
}

export const Basic = () => <Avatar image={`/images/customer/sample-avatar.png`} userName={`jonraf_wavakazi`} isVerified={true} />

export const Collection = () => <Avatar collection={true} withBG={true} atTheRate={false} image={userImg} userName={userName} isVerified={isVerified} />

// export const Creator = () => <CreatorCollectionsCard size="md" type={`Creator`} verified={true} name={`@jonraf_wavakazi`} imgSrc={`/images/creator-img.png`} />

// export const Collection = () => <CreatorCollectionsCard size="md" type={`Collection`} name={`Petronas Sepang`} imgSrc={`/images/customer/collection-img.png`} />

                    