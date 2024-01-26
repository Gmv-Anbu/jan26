import { toast } from 'react-toastify'

const defaultConfig = {
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  prgress: undefined,
}

const success = (message) => {
  toast.success(message, {
    ...defaultConfig,
    position: 'top-right',
    toastId: '1',
    style: {
      fontSize: '1.6rem',
    },
  })
}

const error = (message) => {
  toast.error(message, {
    ...defaultConfig,
    position: 'top-right',
    toastId: '1',
    style: {
      fontSize: '1.6rem',
    },
  })
}

const info = (message) => {
  toast.info(message, {
    ...defaultConfig,
    position: 'top-right',
    toastId: '1',
    style: {
      fontSize: '1.6rem',
    },
  })
}

const Toast = {
  success,
  error,
  info
}

export default Toast
