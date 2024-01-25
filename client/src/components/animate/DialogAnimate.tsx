import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { m, AnimatePresence } from 'framer-motion';
import { Dialog, Box, Paper } from '@mui/material';
import { varFade } from './variants';

interface DialogAnimateProps {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  sx?: React.CSSProperties;
  variants?: Record<string, any>;
}

const DialogAnimate: FC<DialogAnimateProps> = ({
  open = false,
  variants,
  onClose,
  children,
  sx,
  ...other
}) => {
  return (
    <AnimatePresence>
      {open && (
        <Dialog
          fullWidth
          maxWidth='xs'
          open={open}
          onClose={onClose}
          PaperComponent={(props) => (
            <Box
              component={m.div}
              {...(variants ||
                varFade({
                  distance: 120,
                  durationIn: 0.32,
                  durationOut: 0.24,
                  easeIn: 'easeInOut',
                }).inUp)}
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                onClick={onClose}
                sx={{ width: '100%', height: '100%', position: 'fixed' }}
              />
              <Paper sx={sx} {...props}>
                {props.children}
              </Paper>
            </Box>
          )}
          {...other}
        >
          {children}
        </Dialog>
      )}
    </AnimatePresence>
  );
};

DialogAnimate.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  sx: PropTypes.object,
  variants: PropTypes.object,
};

export default DialogAnimate;
