import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';

interface UpdatePasswordModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (currentPassword: string, newPassword: string) => void;
}

const UpdatePasswordModal: React.FC<UpdatePasswordModalProps> = ({ open, onClose, onSubmit }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    onSubmit(currentPassword, newPassword);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="update-password-modal-title"
      aria-describedby="update-password-modal-description"
    >
      <Box
        sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="update-password-modal-title" variant="h6" component="h2">
          Update Password
        </Typography>
        <TextField
          fullWidth
          label="Current Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <TextField
          fullWidth
          label="New Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          fullWidth
          label="Confirm New Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default UpdatePasswordModal;
