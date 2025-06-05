import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Box, IconButton, Fade, Typography, Chip
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const SaveButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: '10px 28px',
  textTransform: 'none',
  fontWeight: 700,
  fontSize: '1rem',
  background: 'linear-gradient(90deg, #253b6e, #324f94)',
  color: '#fff',
  boxShadow: '0 2px 8px rgba(37, 59, 110, 0.10)',
  letterSpacing: 0.5,
  '&:hover': {
    background: 'linear-gradient(90deg, #324f94, #253b6e)',
    transform: 'translateY(-2px) scale(1.03)',
    boxShadow: '0 4px 16px rgba(37, 59, 110, 0.15)',
  }
}));

const ModalTitle = styled(DialogTitle)(({ theme }) => ({
  fontWeight: 800,
  background: 'linear-gradient(90deg, #253b6e, #324f94)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontSize: '1.7rem',
  display: 'flex',
  alignItems: 'center',
  gap: 1,
}));

const SectionLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: '#253b6e',
  fontSize: '1.08rem',
  letterSpacing: 0.2,
  mt: 2,
  mb: 0.5,
}));

export default function EditProfileModal({ open, onClose, user, onSave }) {
  const [form, setForm] = useState({
    name: user.name,
    bio: user.bio,
    street: user.address.street,
    neighborhood: user.address.neighborhood,
    city: user.address.city,
    interests: user.interests.map(i => i.text),
    favoritePlaces: user.favoritePlaces.map(i => i.text),
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (arrayName, idx, value) => {
    setForm({
      ...form,
      [arrayName]: form[arrayName].map((item, i) => i === idx ? value : item)
    });
  };

  const handleAddArrayItem = (arrayName) => {
    setForm({
      ...form,
      [arrayName]: [...form[arrayName], '']
    });
  };

  const handleRemoveArrayItem = (arrayName, idx) => {
    setForm({
      ...form,
      [arrayName]: form[arrayName].filter((_, i) => i !== idx)
    });
  };

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{
      sx: {
        borderRadius: 4,
        boxShadow: '0 8px 32px rgba(37, 59, 110, 0.10)',
        background: 'rgba(255,255,255,0.98)'
      }
    }}>
      <Fade in={open}>
        <Box>
          <ModalTitle>
            <EditIcon sx={{ fontSize: 28, color: '#253b6e' }} />
            Editar Perfil
          </ModalTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
              <TextField
                label="Nome"
                name="name"
                value={form.name}
                onChange={handleChange}
                fullWidth
                variant="filled"
                sx={{ borderRadius: 2, background: alpha('#d2ecf9', 0.13) }}
              />
              <TextField
                label="Bio"
                name="bio"
                value={form.bio}
                onChange={handleChange}
                fullWidth
                multiline
                minRows={2}
                variant="filled"
                sx={{ borderRadius: 2, background: alpha('#d2ecf9', 0.13) }}
              />

              <SectionLabel>Interesses</SectionLabel>
              {form.interests.map((interest, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TextField
                    label={`Interesse ${idx + 1}`}
                    value={interest}
                    onChange={e => handleArrayChange('interests', idx, e.target.value)}
                    fullWidth
                    variant="filled"
                    sx={{ borderRadius: 2, background: alpha('#d2ecf9', 0.13) }}
                  />
                  <IconButton onClick={() => handleRemoveArrayItem('interests', idx)} disabled={form.interests.length <= 1}>
                    <DeleteIcon sx={{ color: '#d32f2f' }} />
                  </IconButton>
                </Box>
              ))}
              <Button
                startIcon={<AddIcon />}
                onClick={() => handleAddArrayItem('interests')}
                sx={{
                  alignSelf: 'flex-start',
                  mb: 1,
                  color: '#253b6e',
                  fontWeight: 600,
                  textTransform: 'none'
                }}
              >
                Adicionar Interesse
              </Button>

              <SectionLabel>Lugares Favoritos</SectionLabel>
              {form.favoritePlaces.map((place, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TextField
                    label={`Lugar ${idx + 1}`}
                    value={place}
                    onChange={e => handleArrayChange('favoritePlaces', idx, e.target.value)}
                    fullWidth
                    variant="filled"
                    sx={{ borderRadius: 2, background: alpha('#d2ecf9', 0.13) }}
                  />
                  <IconButton onClick={() => handleRemoveArrayItem('favoritePlaces', idx)} disabled={form.favoritePlaces.length <= 1}>
                    <DeleteIcon sx={{ color: '#d32f2f' }} />
                  </IconButton>
                </Box>
              ))}
              <Button
                startIcon={<AddIcon />}
                onClick={() => handleAddArrayItem('favoritePlaces')}
                sx={{
                  alignSelf: 'flex-start',
                  mb: 1,
                  color: '#253b6e',
                  fontWeight: 600,
                  textTransform: 'none'
                }}
              >
                Adicionar Lugar
              </Button>

              <SectionLabel>Endereço</SectionLabel>
              <TextField
                label="Rua"
                name="street"
                value={form.street}
                onChange={handleChange}
                fullWidth
                variant="filled"
                sx={{ borderRadius: 2, background: alpha('#d2ecf9', 0.13) }}
              />
              <TextField
                label="Bairro"
                name="neighborhood"
                value={form.neighborhood}
                onChange={handleChange}
                fullWidth
                variant="filled"
                sx={{ borderRadius: 2, background: alpha('#d2ecf9', 0.13) }}
              />
              <TextField
                label="Cidade"
                name="city"
                value={form.city}
                onChange={handleChange}
                fullWidth
                variant="filled"
                sx={{ borderRadius: 2, background: alpha('#d2ecf9', 0.13) }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={onClose} variant="outlined" sx={{
              borderRadius: 10,
              textTransform: 'none',
              fontWeight: 600,
              color: '#253b6e',
              borderColor: '#253b6e',
              background: alpha('#253b6e', 0.03),
              '&:hover': {
                background: alpha('#253b6e', 0.08)
              }
            }}>
              Cancelar
            </Button>
            <SaveButton onClick={handleSave} variant="contained">
              Salvar
            </SaveButton>
          </DialogActions>
        </Box>
      </Fade>
    </Dialog>
  );
}