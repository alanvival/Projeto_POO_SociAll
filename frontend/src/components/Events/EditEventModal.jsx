// EditEventModal.js

import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Button, Box, Typography, IconButton, Grid, styled, useTheme,
  alpha
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

// Reutilizando alguns estilos que você já tem
const SaveButton = styled(Button)(({ theme }) => ({
    borderRadius: 10,
    padding: '10px 20px',
    textTransform: 'none',
    fontWeight: 600,
    transition: 'all 0.3s ease',
    background: 'linear-gradient(90deg, #253b6e, #324f94)',
    color: '#ffffff',
    boxShadow: '0 4px 15px rgba(37, 59, 110, 0.2)',
    '&:hover': {
      background: 'linear-gradient(90deg, #324f94, #3a5db3)',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(37, 59, 110, 0.25)',
    }
}));

// O modal recebe o evento a ser editado como 'event'
export default function EditEventModal({ open, onClose, onSave, event }) {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    nome: '',
    data: new Date(),
    descricao: '',
    foto: '',
    endereco: ''
  });

  // Este useEffect preenche o formulário quando um evento é selecionado
  useEffect(() => {
    if (event) {
      setFormData({
        nome: event.nome || '',
        // Garante que a data seja um objeto Date válido
        data: event.data ? new Date(event.data) : new Date(),
        descricao: event.descricao || '',
        foto: event.imagem || '', // Note que o card usa 'imagem', o DTO usa 'Foto'
        endereco: event.endereco || ''
      });
    }
  }, [event]); // Executa sempre que o 'event' mudar

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value);
    if (!isNaN(newDate)) {
      const currentTime = formData.data || new Date();
      newDate.setHours(currentTime.getHours(), currentTime.getMinutes());
      setFormData(prev => ({...prev, data: newDate}));
    }
  };

  const handleTimeChange = (e) => {
    const [hours, minutes] = e.target.value.split(':').map(Number);
    const newDateTime = new Date(formData.data || new Date());
    newDateTime.setHours(hours, minutes);
    setFormData(prev => ({...prev, data: newDateTime}));
  };

  const handleSave = () => {
    // A função onSave recebe o ID e os dados do formulário
    onSave(event.id, formData);
  };

  if (!event) return null; // Não renderiza o modal se nenhum evento foi passado

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ 
        background: 'linear-gradient(90deg, #253b6e, #324f94)', color: '#ffffff',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EditIcon />
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                Editar Evento
            </Typography>
        </Box>
        <IconButton edge="end" color="inherit" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <TextField name="nome" label="Nome do Evento" value={formData.nome} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
        <TextField name="descricao" label="Descrição" value={formData.descricao} onChange={handleChange} multiline rows={4} fullWidth sx={{ mb: 2 }} />
        <TextField name="endereco" label="Endereço" value={formData.endereco} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
        <TextField name="foto" label="URL da Foto" value={formData.foto} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField name="data" label="Data" type="date" fullWidth
                    value={formData.data.toISOString().split('T')[0]}
                    onChange={handleDateChange}
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField name="hora" label="Hora" type="time" fullWidth
                    value={`${String(formData.data.getHours()).padStart(2, '0')}:${String(formData.data.getMinutes()).padStart(2, '0')}`}
                    onChange={handleTimeChange}
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose}>Cancelar</Button>
        <SaveButton onClick={handleSave}>Salvar Alterações</SaveButton>
      </DialogActions>
    </Dialog>
  );
}