const STORAGE_KEY_PREFFIX = 'nft&v_sys:';

export const KEYS = {
  TOKEN: 'TOKEN',
  CUSTOMER_USER: 'CUSTOMER_USER',
  CUSTOMER_TOKEN: 'nft_customer_token',
  ADMIN_USER: 'ADMIN_USER',
  CURRENT_PROVIDER_NAME: 'CURRENT_PROVIDER_NAME',
  REMEMBER_ME: 'REMEMBER_ME',
};

const MAP_KEYS_NAMES = {
  [KEYS.TOKEN]: `${STORAGE_KEY_PREFFIX}token`,
  [KEYS.CUSTOMER_USER]: `${STORAGE_KEY_PREFFIX}user`,
};

export const REQUIRED_KEYS = [
  KEYS.TOKEN,
];


export const setItem = (key:string, value:any):void =>{
  if(typeof window !== 'undefined'){
    localStorage.setItem(MAP_KEYS_NAMES[key] || key, JSON.stringify(value??null))
  }
};

export const getItem = (key:string):any => {
  if(typeof window !== 'undefined'){
    const data = localStorage.getItem(MAP_KEYS_NAMES[key] || key);
    try{
      return (typeof data === 'string')?JSON.parse(data):undefined
    }
    catch(e){
      console.log('invalid json from localstorage');  
    }
  }
  return undefined;
}

export const removeItem = (key:string):void =>{
  if(typeof window !== 'undefined')
    localStorage.removeItem(MAP_KEYS_NAMES[key]);
}
export const removeAllItemForcely = ():void=>{
if(typeof window !== 'undefined')
  localStorage.clear();
}
export const clear = () => {
  const lsKeys = Object.keys(localStorage);
  lsKeys.forEach(key => {
    if (key.indexOf(STORAGE_KEY_PREFFIX) !== -1) {
      if(typeof window !== 'undefined')
        localStorage.removeItem(key);
    }
  });
};
