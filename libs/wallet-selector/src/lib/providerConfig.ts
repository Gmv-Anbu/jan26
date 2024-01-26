interface IproviderNames {
  [index: string]: any
}
export const providerNames: IproviderNames = {
  metaMask: {
    id: 'metaMask',
    label: 'Metamask',
    icon: '/svgs/metamask.svg',
    iconWidth: 30,
    iconHeight: 30,
  },
  walletConnect: {
    id: 'walletConnect',
    label: 'Wallet Connect',
    icon: '/svgs/walletConnect.svg',
    iconWidth: 30,
    iconHeight: 30,
  },
}

export const hederaProviderNames: IproviderNames = {
  metaMask: {
    id: 'hashPack',
    label: 'HashPack',
    icon: '/svgs/walletConnect.svg',
    iconWidth: 30,
    iconHeight: 30,
  },
}

export const magicLinkProviderNames: IproviderNames = {
  google: {
    id: 'google',
    label: 'Connect with Google',
    icon: '/svgs/googleIcon.svg',
    iconWidth: 30,
    iconHeight: 30,
  },
  facebook: {
    id: 'facebook',
    label: 'Connect with Facebook',
    icon: '/svgs/facebookIcon.svg',
    iconWidth: 30,
    iconHeight: 30,
  },
}

export const magicLinkEmailProvider: IproviderNames = {
  email: {
    id: 'email',
  },
}
export default providerNames
