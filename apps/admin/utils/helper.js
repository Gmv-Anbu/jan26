import moment from 'moment'
import config from '../apiConfig'
import { APP_ENV } from '../config'

export function handleApiImage(str) {
  if (str?.includes('https://')) {
    return str
  } else if(str) {
    return config?.S3_URL + str
  }
  return null
}
export function handleApiDeleteImage(str) {
  if (str) {
    return str.replace(config.S3_URL, '')
  }
  return null
}
export function appendS3url(str) {
  if (str) {
    return config.S3_URL + str
  }
  return null
}

export const formatToUSD = (str, frac) => {
  if(str) {
    let nf = new Intl.NumberFormat("en-US", {style: "currency",currency: "USD",maximumFractionDigits: frac || 0});
    return nf.format(str) || '$0'
  }
  return '$0'
}

export function validateImage(str) {
  if (!str.includes('\\')) {
    if (str.includes('http')) {
      return str
    } else {
      return handleApiImage(str)
    }
  }
  return '/images/shared/placeholder-image-2.jpg'
}

export function acceptOnlyNumbers(str) {
  if (str) {
    return str.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1')
  }
  return null
}

export function acceptOnlyNumbersWithDecimals(str) {
  if (str) {
    var validNumber = new RegExp(/^\d*\.?\d*$/)
    return validNumber.test(str)
  } else {
    return false
  }
}

export function acceptNumbersWithDecimal(str) {
  if (str) {
    return str.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')
  }
  return null
}

export function objectDeepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
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

// for asset date
export function localToServer(dateTime) {  
  const timezoneOffset = new Date().getTimezoneOffset();  
  return new Date(new Date(dateTime).getTime() - (timezoneOffset + 480) * 60000).toISOString();
}
export function serverToLocal(dateTime) {  
  const timezoneOffset = 0 - new Date().getTimezoneOffset();  
  return new Date(new Date(dateTime).getTime() - (timezoneOffset - 480) * 60000);
}

export const validateForm = async (obj, objValidation, notRequired) => {
  // console.log('obj, objValidation, notRequired', obj, objValidation, notRequired)
  let errors = {}
  if (notRequired !== undefined) {
    for (const [key, value] of Object.entries(obj)) {
      if (value === null || value === '' || value?.length === 0) {
        if (!notRequired.includes(key)) {
          errors[key] = unSlugify(key) + ' is required'
          if(key === 'prize') errors[key] = 'Price is required'
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
      // if (key === 'creatorId') continue
      if (value === null || value === '' || value?.length === 0) {
        errors[key] = unSlugify(key) + ' is required'
        if(key === 'prize') errors[key] = 'Price is required'
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
    // console.log('>>> errors', errors)
    return errors
  } else {
    return true
  }
}
// extra validation

let unlimitedText = ['rsvpUrl', 'description', 'shortDescription', 'lotAssay', 'biography', 'conditionalReportUrl']
const customValidate = async (key, keyValidation, value) => {
  // console.log('customValidate', key, keyValidation, value)
  if(keyValidation) keyValidation = keyValidation.toString()
  if (keyValidation === 'email') {
    let res = await ValidateEmail(value)
    if (res) return true
    if (!res) return 'Enter a valid email address'
    // console.log('customValidate res', res)
  } else if (keyValidation === 'password') {
    let res = await checkPassword(value)
    if (res) return true
    if (!res) return 'Password length must be atleast 8 characters with uppercase, lowercase, number and special characters'
  } if (keyValidation?.toString()?.includes('min') && !keyValidation?.toString()?.includes('max') && acceptOnlyNumbers(keyValidation) && !unlimitedText.includes(key)) {
    let minVal = keyValidation?.split('|')
    let limit = minVal.find(el => el?.includes('min'))
    let res = await ValidateMinLength(key, acceptOnlyNumbers(limit), value)
    // console.log('validate min here', limit, res, keyValidation, keyValidation?.includes('min') , acceptOnlyNumbers(keyValidation))
    if (res) return true
    if (!res) return `The ${key} field requires ${acceptOnlyNumbers(limit)} min characters.`
  } else if (keyValidation?.toString()?.includes('max') && acceptOnlyNumbers(keyValidation) && !unlimitedText.includes(key)) {
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
  } else if (key === 'totalEditionCount') {
    if (value === '0') {
      return `Total edition count can't be 0`
    } else if (Number(value) && !Number.isInteger(Number(value))) {
      return `Total edition count must be an integer value`
    } else {
      return true
    }
  } else if (key === 'refNo') {
    const regex = /^[A-Za-z0-9., ]+$/
    if (!regex.test(value)) {
      return `RefNo only allowed letters dot numbers commas and space.`
    } else if (Number(value) === 0) {
      return `RefNo can't be empty.`
    } else {
      return true
    }
  } else if (key === 'refName') {
    if (value === '0') {
      return `RefName can't be empty`
    } else if (!/^[A-Za-z'&", ]+$/.test(value)) {
      return `RefName must be an alphanumeric value with space, comma, ampersand, double quotes or single quotes allowed.`
    } else {
      return true
    }
  } else if (key === 'rsvpUrl') {
    if (keyValidation?.length) {
      let url = isValidUrl(keyValidation)
      if(url) {
        return true
      } else {
        return `Enter a valid url`
      }
    } else {
      return true
    }
  } else {
    return true
  }
}
// specific validation
function ValidateEmail(value) {
  var pattern = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/
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

export const processCardData = (assetList, exchangeRate) => {
  const assetFinalList = []
  assetList.forEach((el) => {
    let user = el?.userAssetEdition
    assetFinalList.push({
      id: el.id,
      name: el?.assetsData?.name,
      price: `${(parseFloat(el.assetsData?.primarySalePrice) / parseFloat(exchangeRate?.HBAR?.USD || 1))?.toFixed(6)} ${APP_ENV.BASE_CRYPTO_CURRENCY}`, // eth value need to be integrated
      userName: user?.userName || user?.firstName + ' ' + user?.lastName || user?.email,
      image: handleApiImage(user?.profilePicUrl),
      NFT: el?.assetsData?.mainAssetUrl,
      convertedPrice: `$ ${el.assetsData?.primarySalePrice}`,
      isVerified: user?.emailVerified,
    })
  })

  return assetFinalList
}

export const processCollectionData = (collections) => {
  const collectionList = []
  collections.forEach((collection) => {
    collectionList.push({
      id: collection?.id,
      coverImg: collection?.bannerImage,
      title: collection?.name,
      totalNFTs: '5nfts',
      userImg: handleApiImage(collection?.collectionCreator?.profilePicUrl), //To Do : Need to show some default image here
      userName: `${collection?.collectionCreator?.firstName || ''} ${collection?.collectionCreator?.lastName || ''}`,
      isVerified: collection?.collectionCreator?.emailVerified,
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
      price: `${(parseFloat(asset?.assetsData?.primarySalePrice) / parseFloat(exchangeRates?.ETH?.USD))?.toFixed(6)} ${APP_ENV.BASE_CRYPTO_CURRENCY}`, //eth value need to be integrated
      image: handleApiImage(asset?.userAssetEdition?.profilePicUrl),
      NFT: asset?.assetsData?.mainAssetUrl,
      convertedPrice: `$ ${asset?.assetsData?.primarySalePrice}`,
      userName: `${asset?.userAssetEdition?.firstName || ''} ${asset?.userAssetEdition?.lastName || ''}`,
      isVerified: asset?.userAssetEdition?.emailVerified,
      description: asset?.assetsData?.shortDescription,
    })
  })

  return featuredNFTList
}

export const CharacterCount = (value) => {
  let minCount = value.length
  return minCount
}

export const IsImage = (NFT) => {
  if (/\.(jpg|jpeg|png|svg)$/.test(NFT)) {
    return true
  }
  return false
}

export function trimString(str, numChars) {
  return str?.substr(0, numChars)
}

export const getFieldValue = (data, key) => {
  const field = data.list.find((item) => item.preferanceKey == key)
  if (field) {
    return field.preferanceValue
  }
  return ''
}

export function isFileImage(file) {
  const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif']
  return file && acceptedImageTypes.includes(file.type)
}

export function blockSpecialChar(str) {
  let regex = /^[A-Za-z0-9 ]+$/
  if (str && regex.test(str)) {
    return str
  }
  return null
}

export function refRegex(str) {
  let regex = /^(?!\s+$)[^<>?{}[\]\\|+=^$@!#]*$/
  if (str && regex.test(str)) {
    return str
  }
  return null
}

export function checkPassword(str) {
  if(str) {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(str);
  }
  return null
}

export function isValidUrl(str) {
  const pattern = new RegExp(
    '^([a-zA-Z]+:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i'
  );
  return pattern.test(str);
}

export const localDateToUTC = (date) => {
  if(date) {
    return new Date(date).toISOString()
  }
  return null
}

export const localDateToUTCFilter = (date) => {
  if(date) {
    return moment(new Date(date)).startOf('day').toISOString()
  }
  return null
}

// export const localDateToUTC = (date) => {
//   console.log('date', date)
//   if(date) {
//       let dates = new Date(date).toISOString();
//       console.log('dates', dates)
//       dates.setMinutes(dates.getMinutes() + new Date().getTimezoneOffset());
//       console.log('dates', dates, dates?.toISOString())
//       return dates.toISOString()
//   }
//   return null
// }

export const UTCtoLocalDate = (date) => {
  if(date) {
    return new Date(new Date(date).toISOString())
  }
  return null
}

export const acceptOnlyAlphabets = (str) => {
  let regex = /^[a-zA-Z]+$/
  console.log('str && regex.test(str)', str && regex.test(str))
  if (str && regex.test(str)) {
    return str
  }
  return null
}