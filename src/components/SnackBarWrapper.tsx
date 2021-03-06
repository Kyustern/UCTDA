import React from 'react'
import styled from 'styled-components';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

interface Props {
    isOpen: boolean
    text: string
    close: () => void
}

export const SnackBarWrapper: React.FC<Props> = ({isOpen, text, close}) => {
    
    // const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => close();

    return(
        <CustomSnackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        color="red"
        open={isOpen}
        autoHideDuration={6000}
        // onClose={close}
        message={text}
        action={
            <IconButton 
                size="small" 
                aria-label="close" 
                color="inherit"
                onClick={close}
                >
              <CloseIcon fontSize="small" />
            </IconButton>
        }
      />
    )
}

const CustomSnackbar = styled(Snackbar)`
    background-color: var(--primary);
`;