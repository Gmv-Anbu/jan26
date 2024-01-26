import Avatar from './avatar'

export default {
    title: 'Avatar',
}

export const Basic = () => <Avatar image={`/images/customer/sample-avatar.png`} userName={`jonraf_wavakazi`} isVerified={true} />

export const Collection = () => <Avatar collection={true} withBG={true} atTheRate={false} image={userImg} userName={userName} isVerified={isVerified} />

                    