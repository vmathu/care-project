import { IconButton, Alert, AlertTitle, Theme }  from '@mui/material'
import { makeStyles } from "@mui/styles"
import CloseIcon from '@mui/icons-material/Close';

import color from '../color';
import { ReactNode } from 'react';

const useStyles: any = makeStyles((theme: Theme) => ({
  success: {
    backgroundColor: color.success
  },
  error: {
    backgroundColor: color.error
  },
  warning: {
    backgroundColor: color.warning
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: '1px'
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
}))

interface ToastMessageWrapperProps {
    className?: string;
    message: ReactNode;
    onClose: () =>  void;
    variant: 'success' | 'info' | 'warning' | 'error';
    title: string;
  }

const ToastMessageWrapper: React.FC<ToastMessageWrapperProps> = props => {
  const classes = useStyles()
  const { className, message, onClose, variant, title, ...other } = props

  return (
    <>
        <Alert
            severity={variant}
            action={[
                <IconButton key="close" aria-label="Close" color="inherit" className={classes.close} onClick={onClose} size="medium">
                  <CloseIcon className={classes.icon} />
                </IconButton>
            ]}
            {...other}>
            <AlertTitle>{title === '' ? `${variant.charAt(0).toUpperCase() + variant.slice(1)}!` : title}</AlertTitle>
            {message}
        </Alert>
    </>
  )
}


export default ToastMessageWrapper
