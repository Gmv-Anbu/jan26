import config from '../apiConfig'
import UserService from '@apps/customer/api/customer/UserService'
import { APP_ENV } from '@apps/customer/config'

export function handleApiImage(str) {
  if (str?.includes('https://')) {
    return str
  } else if(str) {
    return config?.S3_URL + str
  }
  return null
}

export function prependZero(val) {
  if (val) {
    return (Number(val)).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
  }
  return null
}

export function validateImage(str) {
  if(str?.length) {
    if (!str?.includes('\\')) {
      if (str.includes('http')) {
        return str
      } else {
        return handleApiImage(str)
      }
    }
    return '/images/shared/placeholder-image-2.jpg'
  }
  return '/images/shared/placeholder-image-2.jpg'
}

export function acceptOnlyNumbers(str) {
  if (str) {
    return str.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1')
  }
  return null
}

export function acceptNumbersWithDecimal(str) {
  if (str) {
    return str.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')
  }
  return null
}

export function acceptAlphaNumericWithHyphenSpace(str) {
  let pattern = /^[a-z\d\-_\s]+$/i
  return pattern.test(str) || str==='';
}

export function acceptOnlyNumbersAndDecimals(str) {
  let pattern = /^\d*\.?\d*$/
  return pattern.test(str)
}

export const acceptOnlyAlphabets = (str) => {
  let pattern = /^[a-zA-Z]+$/
  if (str && pattern.test(str)) {
    return str
  }
  return null
}

export const truncateEllipsisMiddle = (str) => {
  if(str) {
    return `${str.slice(0, 5)}...${str.slice(-5)}`
  }
  return 'NA'
}

export const formatToUSD = (str, frac) => {
  if(str) {
    let nf = new Intl.NumberFormat("en-US", {style: "currency",currency: "USD", maximumFractionDigits: frac || 0,});
    return nf.format(str) || '$0'
  }
  return '$0'
}

export function objectDeepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

export const unSlugify = (slug) => {
  if (slug.includes('-') || slug.includes('_')) {
    var words = slug.split(/-|_/)
    return words
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
      })
      .join(' ')
  } else {
    const str = slug.replace(/([A-Z])/g, ' $1')
    const finalStr = str.charAt(0).toUpperCase() + str.slice(1)
    return finalStr
  }
}

export const isImage = (url) => {
  return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url)
}

export const formatAPIError = (err) => {
  let errMsg = 'Something went wrong !'
  if (err) {
    if (err?.error?.message) {
      return err?.error?.message?.toString()
    }
    return errMsg
  }
  return errMsg
}

export const validateForm = async (obj, objValidation, notRequired) => {
  let errors = {}
  if (notRequired !== undefined) {
    for (const [key, value] of Object.entries(obj)) {
      if (value === null || value === '' || value?.length === 0) {
        if (!notRequired.includes(key)) {
          errors[key] = unSlugify(key) + ' is required'
        }
      } else {
        for (const [key, value] of Object.entries(obj)) {
          if (value === null || value === '' || value?.length === 0) {
            if (!notRequired.includes(key)) errors[key] = unSlugify(key) + ' is required'
          } else {
            // console.log(key, value)
            let err = await customValidate(key, objValidation[key], value)
            if (err !== true) {
              errors[key] = err
            }
            // console.log('customValidate final eroororo',err)
          }
        }
        // console.log(err)
      }
    }
  } else {
    for (const [key, value] of Object.entries(obj)) {
      if (key === 'supportingAssetMediaFiles') continue
      // console.log({ value, key });
      // console.log(objValidation, objValidation[key])
      if (value === null || value === '' || value?.length === 0) {
        errors[key] = key === 'primarySalePrice' ? unSlugify('basePrice') : unSlugify(key)
        errors[key] = errors[key] + ' is required'
      } else {
        // console.log(key, value)
        let err = await customValidate(key, objValidation[key], value)
        if (err !== true) {
          errors[key] = err
        }
        // console.log('customValidate final eroororo',err)
      }
    }
  }
  if (Object.keys(errors).length) {
    return errors
  } else {
    return true
  }
}

export const validateBazForm = async (obj, objValidation, notRequired) => {
  let errors = {}
  if (notRequired !== undefined) {
    for (const [key, value] of Object.entries(obj)) {
      if (value === null || value === '' || value?.length === 0) {
        if (!notRequired.includes(key)) {
          errors[key] = unSlugify(key) + ' is required'
        }
      } else {
        // console.log(key, value)
        let err = await customValidate(key, value)
        if (err !== true) {
          errors[key] = err
        }
        // console.log(err)
      }
    }
  } else {
    for (const [key, value] of Object.entries(obj)) {
      // console.log(objValidation, objValidation[key])
      if (value === null || value === '' || value?.length === 0) {
        errors[key] = unSlugify(key) + ' is required'
      } else {
        // console.log(key, value)
        let err = await customValidate(key, objValidation[key], value)
        if (err !== true) {
          errors[key] = err
        }
        // console.log('customValidate final eroororo',err)
      }
    }
  }
  if (Object.keys(errors).length) {
    return errors
  } else {
    return true
  }
}

// extra validation
const customValidate = async (key, keyValidation, value) => {
  // console.log('customValidate', key, keyValidation, value)
  if (keyValidation === 'email') {
    let res = await ValidateEmail(value)
    if (res) return true
    if (!res) return 'Enter a valid email address'
    // console.log('customValidate res', res)
  } else if (keyValidation === 'password') {
    let res = await checkPassword(value)
    if (res) return true
    if (!res) return 'Password length must be atleast 8 characters with uppercase, lowercase, number and special characters'
  } if (keyValidation?.toString()?.includes('min') && !keyValidation?.toString()?.includes('max') && acceptOnlyNumbers(keyValidation) && key !== 'rsvpUrl') {
    let minVal = keyValidation?.split('|')
    let limit = minVal.find(el => el?.includes('min'))
    let res = await ValidateMinLength(key, acceptOnlyNumbers(limit), value)
    // console.log('validate min here', limit, res, keyValidation, keyValidation?.includes('min') , acceptOnlyNumbers(keyValidation))
    if (res) return true
    if (!res) return `The ${key} field requires ${acceptOnlyNumbers(limit)} min characters.`
  } else if (keyValidation?.toString()?.includes('max') && acceptOnlyNumbers(keyValidation) && key !== 'rsvpUrl') {
    let maxVal = keyValidation?.split('|')
    let limit = maxVal.find(el => el?.includes('max'))
    let res = await ValidateMaxLength(key, acceptOnlyNumbers(limit), value)
    // console.log('validate max here', limit, res, keyValidation, keyValidation?.includes('max') , acceptOnlyNumbers(keyValidation))
    if (res) return true
    if (!res) return `The ${key} field can have ${acceptOnlyNumbers(limit)} max characters.`
  } else if (key === 'royaltyPercentage') {

    let roundedPercentage = Number(Number(value).toFixed(2))
    if (roundedPercentage === 0.0) {
      return `Royalty percentage can't be 0.`
    } else if (roundedPercentage > 20.0) {
      return `Royalty percentage greater than 20 is not allowed.`
    } else {
      return true
    }
    
  } else if (key==='totalEditionCount'){
    if(value=== '0'){
      return `Total edition count can't be 0`;
    }else if(Number(value) && !Number.isInteger(Number(value))){
      return `Total edition count must be an integer value`;
    }else{
      return true;
    }
  }else {
    return true
  }
}

export function checkPassword(str) {
  if(str) {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(str);
  }
  return null
}

// specific validation
function ValidateEmail(value) {
  var pattern = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/
  return pattern.test(value)
}
function ValidateMinLength(key, validate, value) {
  if (validate && value?.length >= validate) {
    return true
  } else {
    return false
  }
}
function ValidateMaxLength(key, validate, value) {
  if (validate && value?.length <= validate) {
    return true
  } else {
    return false
  }
}

export const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',')
  // const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename)
  // return new File([u8arr], filename, {type:mime});
}

// export const processCardData = (assetList, exchangeRate) => {
//   const assetFinalList = [];
//   assetList.forEach((el) => {
//     let user = el?.userAssetEdition;
//     assetFinalList.push({
//       id: el.id,
//       name: el?.assetsData?.name,
//       price: `${el.assetsData?.primarySalePrice} ${APP_ENV.BASE_CRYPTO_CURRENCY}`, // eth value need to be integrated
//       userName: user?.firstName + ' ' + user?.lastName,
//       image: handleApiImage(user?.profilePicUrl),
//       NFT: el?.assetsData?.mainAssetUrl,
//       convertedPrice: `$ ${(
//         parseFloat(el.assetsData?.primarySalePrice) *
//         parseFloat(
//           APP_ENV.NEXT_PUBLIC_NETWORK_TYPE == 'HEDERA'
//             ? exchangeRate?.HBAR?.USD
//             : exchangeRate?.ETH?.USD
//             ? exchangeRate?.ETH?.USD
//             : 1
//         )
//       )?.toFixed(5)} `,
//       isVerified: user?.emailVerified,
//     });
//   });
// };

export const processCardData = (assetList, exchangeRate) => {
  const assetFinalList = []
  assetList.forEach((el) => {
    let user = el?.userAssetEdition
    assetFinalList.push({
      id: el.id,
      name: el?.assetsData?.name,
      price: `${el.assetsData?.primarySalePrice} ${APP_ENV.BASE_CRYPTO_CURRENCY}`, // eth value need to be integrated
      userName: user?.firstName + ' ' + user?.lastName,
      image: handleApiImage(user?.profilePicUrl),
      NFT: el?.assetsData?.mainAssetUrl,
      convertedPrice: `$ ${(parseFloat(el.assetsData?.primarySalePrice) * parseFloat(APP_ENV.NEXT_PUBLIC_NETWORK_TYPE == 'HEDERA' ? exchangeRate?.HBAR?.USD : exchangeRate?.ETH?.USD ? exchangeRate?.ETH?.USD : 1))?.toFixed(5)} `,
      isVerified: user?.emailVerified,
      isFavorite: el?.isFavorite,
      assetId: el?.assetId,
      favoriteBtnAction: async () => {
        const res = await UserService.handlefavourite({
          userId: el?.assetId,
          editionId: el?.id,
        })
        if (res.status === 200) {
          // await getFilteredNfts(scrollData?.page, 9, makeSearchFilter);
          // ModalService.open((modalProps) => <SuccessModal close={modalProps.close} desc="Updated to the favorite list" />)
        }
      },
    })
  })

  //modified list return
  return assetFinalList
}

export const processCollectionData = (collections) => {
  const collectionList = []
  collections.forEach((collection) => {
    collectionList.push({
      id: collection?.id,
      coverImg: collection?.bannerImage,
      title: collection?.name,
      totalNFTs: collection?.assetCount,
      userImg: handleApiImage(collection?.collectionCreator?.profilePicUrl), //To Do : Need to show some default image here
      userName: `${collection?.collectionCreator?.firstName || ''} ${collection?.collectionCreator?.lastName || ''}`,
      isVerified: collection?.collectionCreator?.role === 'creator' || collection?.collectionCreator?.role === 'admin' || collection?.collectionCreator?.role === 'subAdmin',
      // convertedbidAmount: `$ ${(parseFloat(auctionsData?.[0]?.bidAmount) * parseFloat(APP_ENV.NEXT_PUBLIC_NETWORK_TYPE == 'HEDERA' ? data?.data?.exchangeRates?.HBAR?.USD : data?.data?.exchangeRates?.ETH?.USD))?.toFixed(3)}`,
      //           convertedPrice: `$ ${(parseFloat(newData?.resellPrice) * parseFloat(APP_ENV.NEXT_PUBLIC_NETWORK_TYPE == 'HEDERA' ? data?.data?.exchangeRates?.HBAR?.USD : data?.data?.exchangeRates?.ETH?.USD))?.toFixed(3)}`,
    })
  })

  return collectionList
}

export const processFeaturedNFTData = (featuredNFTS, exchangeRates) => {
  const featuredNFTList = []
  featuredNFTS.forEach((asset) => {
    featuredNFTList.push({
      id: asset?.id,
      name: asset?.assetsData?.name,
      price: `${asset?.assetsData?.primarySalePrice} ${APP_ENV.BASE_CRYPTO_CURRENCY}`,
      image: handleApiImage(asset?.userAssetEdition?.profilePicUrl),
      NFT: asset?.assetsData?.mainAssetUrl,
      mediaType: asset?.assetsData?.mainAssetType,
      convertedPrice: `$ ${(parseFloat(asset?.assetsData?.primarySalePrice) * parseFloat(exchangeRates?.HBAR?.USD))?.toFixed(2)}`,
      userName: asset?.userAssetEdition?.userName,
      isVerified: asset?.userAssetEdition?.role === 'creator' || asset?.userAssetEdition?.role === 'admin',
      description: asset?.assetsData?.shortDescription,
      isFavorite: asset?.isFavorite,
      firstName: asset?.userAssetEdition?.firstName,
      lastName: asset?.userAssetEdition?.lastName,
      walletAddress: asset?.userAssetEdition?.walletAddress,
    })
  })

  return featuredNFTList
}

export const CharacterCount = (value) => {
  let minCount = value.length
  return minCount
}

export const IsImage = (NFT) => {
  if (/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(NFT)) {
    return true
  }
  return false
}

const ActivityType = {
  BUY: 'buyNFT',
  SOLD: 'soldNFT',
  RESALE: 'listResale',
  CANCEL: 'cancelBuyNFT',
  DELISTED_BY: `cancelSale`
}

export const handleActivityType = (type) => {
  switch (type) {
    case ActivityType.BUY:
      return 'Bought by'
    case ActivityType.SOLD:
      return 'Sold to'
    case ActivityType.RESALE:
      return 'Listed for resale by'
    case ActivityType.CANCEL:
      return 'Sale cancelled by'
    case ActivityType.DELISTED_BY:
      return 'Delisted by'
    default:
      return 'Bid by'
  }
}

export const handleNaming = (firstName, lastName, username, walletAddress) => {
  if (firstName && lastName !== null && firstName && lastName !== undefined) {
    return `${firstName} ${lastName}`
  } else {
    if (username !== null && username !== undefined) {
      return `@${username}`
    }

    if (walletAddress !== null && walletAddress !== undefined) {
      return `${walletAddress.substring(0, 5)}...`
    }
  }
  return null
}

export const getConfig = (userConfig, configKey) => {
  let permission = false
  let fiatMode = ''

  userConfig?.forEach((item) => {
    if (item.config === configKey && item.value === 'true') permission = true
    if (configKey === 'fiatPurchase') {
      if (item.config === 'fiat.gateway.transark' && item.value === 'true') fiatMode = 'transak'
      if (item.config === 'fiat.gateway.crossmint' && item.value === 'true') fiatMode = 'crossmint'
    }
  })
  return { permission, fiatMode }
}

export const blockInvalidChar = (e) => ['ArrowUp','ArrowDown','e', 'E', '+', '-'].includes(e.key) && e.preventDefault()

export const getFiatAmount = (cryptoAmount, exchangeRates) => {
  return `${(parseFloat(cryptoAmount) * parseFloat(APP_ENV.NEXT_PUBLIC_NETWORK_TYPE == 'HEDERA' ? exchangeRates?.HBAR?.USD : exchangeRates?.ETH?.USD))?.toFixed(4)} $`
}
export const formatInputError = (str) => {
  if (str) {
    return str.replace(/#|_|&|Id /g, '') // add multiple words using | ex. #|_|&|Id
  }
  return str
} 
export function properCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
