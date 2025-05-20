import React, { useState, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  IconButton,
  Avatar,
  Chip,
  Grid,
  styled,
  alpha,
  useMediaQuery,
  useTheme
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PublicIcon from '@mui/icons-material/Public';
import PeopleIcon from '@mui/icons-material/People';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import LockIcon from '@mui/icons-material/Lock';
import GroupIcon from '@mui/icons-material/Group';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import EventIcon from '@mui/icons-material/Event';

// Estilização
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const ImagePreviewContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: 200,
  borderRadius: theme.spacing(1),
  overflow: 'hidden',
  backgroundColor: alpha(theme.palette.primary.main, 0.05),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  border: `1px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  }
}));

const CreateEventButton = styled(Button)(({ theme }) => ({
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

const FormField = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const FormLabel = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
  color: alpha(theme.palette.text.primary, 0.8),
  fontWeight: 500,
  '& svg': {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
  }
}));

const CreateEventModal = ({ open, onClose, onSave }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const infoUsuario = JSON.parse(localStorage.getItem('infoUsuario'));
  
  // Estados para os dados do evento
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [dateTime, setDateTime] = useState(new Date());
  const [eventImage, setEventImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Lista fictícia de amigos (pode ser substituída por dados reais)
  const friendsList = [
    { id: 1, name: 'Ana Silva', avatar: 'https://via.placeholder.com/40' },
    { id: 2, name: 'Carlos Oliveira', avatar: 'https://via.placeholder.com/40' },
    { id: 3, name: 'Mariana Costa', avatar: 'https://via.placeholder.com/40' },
    { id: 4, name: 'Lucas Santos', avatar: 'https://via.placeholder.com/40' },
  ];

  // Handler para upload de imagem
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setEventImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handler para usar localização atual
  const handleUseCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`Lat: ${position.coords.latitude.toFixed(4)}, Long: ${position.coords.longitude.toFixed(4)}`);
        },
        (error) => {
          console.error('Erro ao obter localização:', error);
          alert('Não foi possível obter sua localização atual.');
        }
      );
    } else {
      alert('Geolocalização não é suportada pelo seu navegador.');
    }
  }, []);

  // Handler para salvar o evento
  const handleSaveEvent = () => {
    // Criar objeto com os dados do evento
    const formData ={
      UsuarioId: infoUsuario.id,
      Nome: eventName,
      Data: dateTime,
      Descricao: description,
      Foto: eventImage,
      Endereco: location,
      QuantidadeMaximaInscritos: 50,
      PreferenciasId: [1, 2]
    }

    onSave(formData);
    
    resetForm();
    
    onClose();
  };

  // Resetar formulário
  const resetForm = () => {
    setEventName('');
    setDescription('');
    setLocation('');
    setDateTime(new Date());
    setEventImage(null);
    setImagePreview('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      fullScreen={fullScreen}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }
      }}
    >
      <DialogTitle sx={{ 
        background: 'linear-gradient(90deg, #253b6e, #324f94)',
        color: '#ffffff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(2, 3),
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <EventIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Criar Novo Evento
          </Typography>
        </Box>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <FormField>
            <FormLabel variant="subtitle2">
              <PhotoCameraIcon fontSize="small" />
              Foto do Evento
            </FormLabel>
            <ImagePreviewContainer>
              {imagePreview ? (
                <>
                  <img 
                    src={imagePreview} 
                    alt="Preview do evento" 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover' 
                    }} 
                  />
                  <IconButton 
                    sx={{ 
                      position: 'absolute', 
                      top: 8, 
                      right: 8,
                      backgroundColor: alpha('#ffffff', 0.8),
                      '&:hover': {
                        backgroundColor: alpha('#ffffff', 0.9),
                      }
                    }}
                    onClick={() => {
                      setEventImage(null);
                      setImagePreview('');
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </>
              ) : (
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  sx={{
                    borderColor: alpha(theme.palette.primary.main, 0.5),
                    color: theme.palette.primary.main,
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    }
                  }}
                >
                  Selecionar Imagem
                  <VisuallyHiddenInput 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                  />
                </Button>
              )}
            </ImagePreviewContainer>
          </FormField>

          <FormField>
            <TextField
              fullWidth
              label="Nome do Evento"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              variant="outlined"
              sx={{ mb: 3 }}
            />
          </FormField>

          <FormField>
            <FormLabel variant="subtitle2">
              <LocationOnIcon fontSize="small" />
              Localização
            </FormLabel>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField
                fullWidth
                placeholder="Digite a localização ou use sua localização atual"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <IconButton 
                      color="primary" 
                      onClick={handleUseCurrentLocation}
                      title="Usar minha localização atual"
                    >
                      <MyLocationIcon />
                    </IconButton>
                  ),
                }}
              />
            </Box>
          </FormField>

          <FormField>
            <FormLabel variant="subtitle2">
              <DescriptionIcon fontSize="small" />
              Descrição
            </FormLabel>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Descreva seu evento..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
            />
          </FormField>

          <FormField>
            <FormLabel variant="subtitle2">
              <EventIcon fontSize="small" />
              Data e Hora
            </FormLabel>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Data"
                  type="date"
                  value={dateTime ? dateTime.toISOString().split('T')[0] : ''}
                  onChange={(e) => {
                    const newDate = new Date(e.target.value);
                    if (!isNaN(newDate)) {
                      const currentTime = dateTime || new Date();
                      newDate.setHours(currentTime.getHours(), currentTime.getMinutes());
                      setDateTime(newDate);
                    }
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Hora"
                  type="time"
                  value={dateTime ? 
                    `${String(dateTime.getHours()).padStart(2, '0')}:${String(dateTime.getMinutes()).padStart(2, '0')}` 
                    : ''}
                  onChange={(e) => {
                    const [hours, minutes] = e.target.value.split(':').map(Number);
                    const newDateTime = new Date(dateTime || new Date());
                    newDateTime.setHours(hours, minutes);
                    setDateTime(newDateTime);
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </FormField>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, py: 2, justifyContent: 'space-between' }}>
        <Button 
          onClick={handleClose}
          variant="outlined"
          sx={{ 
            borderRadius: 10,
            textTransform: 'none',
            fontWeight: 600,  
          }}
        >
          Cancelar
        </Button>
        <CreateEventButton 
          onClick={handleSaveEvent}
          variant="contained"
          disabled={!eventName.trim()}
        >
          Criar Evento
        </CreateEventButton>
      </DialogActions>
    </Dialog>
  );
};

export default CreateEventModal;