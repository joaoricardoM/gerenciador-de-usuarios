import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import * as PropTypes  from 'prop-types'

Notify.propTypes = {
  position: PropTypes.string,
  autoClose: PropTypes.number,
  hideProgressBar: PropTypes.bool,
  newestOnTop: PropTypes.bool,
  closeOnClick: PropTypes.bool,
  rtl: PropTypes.bool,
  pauseOnFocusLoss: PropTypes.bool,
  draggable: PropTypes.bool,
  pauseOnHover: PropTypes.bool,
  theme: PropTypes.string
}

export default function Notify({
  position = 'top-right',
  autoClose = 5000,
  hideProgressBar = false,
  newestOnTop = false,
  closeOnClick = true,
  rtl = false,
  pauseOnFocusLoss = true,
  draggable = true,
  pauseOnHover = true,
  theme = 'light'
}) {
  return (
    <ToastContainer
      position='top-right'
      autoClose={autoClose}
      hideProgressBar={hideProgressBar}
      newestOnTop={newestOnTop}
      closeOnClick={closeOnClick}
      rtl={rtl}
      pauseOnFocusLoss={pauseOnFocusLoss}
      draggable={draggable}
      pauseOnHover={pauseOnHover}
      theme={theme}
    />
  )
}