import React from 'react'
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

interface Props {
    isOpen: boolean
    text: string
    close: (bool: boolean) => void
}

export const SnackBarWrapper: React.FC<Props> = ({isOpen, text, close}) => {
    
    const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => close(false);

    return(
        <CustomSnackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        color="red"
        open={isOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message={text}
        action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
        }
      />
    )
}

const CustomSnackbar = styled(Snackbar)`
    background-color: var(--primary);
`;