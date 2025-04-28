// src/pages/Register.jsx
import React, { useState } from 'react';
import { 
  Box, Typography, Container, Paper, Grid, Link, Chip, IconButton,
  TextField, FormControlLabel, Checkbox, Button, Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import AddIcon from '@mui/icons-material/Add';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MyLocationIcon from '@mui/icons-material/MyLocation';

// Logo do SociAll como componente SVG
const SociAllLogo = () => (
  <svg viewBox="0 0 200 200" width="120" height="120">
    <g>
      <circle cx="100" cy="70" r="50" fill="#ffffff"/>
      <circle cx="80" cy="60" r="7" fill="#253b6e"/>
      <circle cx="120" cy="60" r="7" fill="#253b6e"/>
      <path d="M130,85 C130,95 115,110 100,110 C85,110 70,95 70,85" fill="#253b6e"/>
      <path d="M100,120 L150,170 C160,180 170,160 155,145 L130,120 C130,120 115,100 100,120Z" fill="#ffffff"/>
    </g>
  </svg>
);

// Estilos customizados
const StyledPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  borderRadius: 16,
  boxShadow: '0 10px 30px rgba(37, 59, 110, 0.1)',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

const LeftPanel = styled(Box)(({ theme }) => ({
  width: '40%',
  backgroundColor: '#253b6e',
  padding: theme.spacing(5),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    padding: theme.spacing(4),
  },
}));

const RightPanel = styled(Box)(({ theme }) => ({
  width: '60%',
  padding: theme.spacing(5),
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

const PreferenceChip = styled(Chip)(({ theme }) => ({
  backgroundColor: '#f0f8ff',
  margin: theme.spacing(0.5),
  '&:hover': {
    backgroundColor: '#d2ecf9',
  },
  '& .MuiChip-label': {
    color: '#324f94',
  },
}));

const LocationButton = styled(Button)(({ theme, current }) => ({
  flex: 1,
  padding: theme.spacing(1.5),
  backgroundColor: current ? '#324f94' : '#f0f8ff',
  color: current ? '#ffffff' : '#324f94',
  border: `1px solid ${current ? '#324f94' : '#a5d9f3'}`,
  '&:hover': {
    backgroundColor: current ? '#253b6e' : '#d2ecf9',
  },
}));

const Register = () => {
  const [newPreference, setNewPreference] = useState('');
  const [preferences, setPreferences] = useState([
    'Futebol', 'Jogos', 'Filmes', 'Praias', 'Comida', 'Música'
  ]);
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [location, setLocation] = useState('');

  const handleAddPreference = () => {
    if (newPreference && !preferences.includes(newPreference)) {
      setPreferences([...preferences, newPreference]);
      setSelectedPreferences([...selectedPreferences, newPreference]);
      setNewPreference('');
    }
  };

  const handlePreferenceToggle = (preference) => {
    const currentIndex = selectedPreferences.indexOf(preference);
    const newSelected = [...selectedPreferences];

    if (currentIndex === -1) {
      newSelected.push(preference);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setSelectedPreferences(newSelected);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica de cadastro
  };

  const handleUseCurrentLocation = () => {
    // Simulação de obtenção da localização atual
    setLocation('Obtenção de localização...');
    // Aqui você implementaria a lógica real para obter a localização do usuário
  };

  return (
    <Container maxWidth="lg" sx={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#d2ecf9',
      padding: 3
    }}>
      <StyledPaper>
        <LeftPanel>
          <Box sx={{ 
            position: 'absolute',
            bottom: -100,
            right: -100,
            width: 250,
            height: 250,
            backgroundColor: '#324f94',
            borderRadius: '50%',
            opacity: 0.6,
            display: { xs: 'none', md: 'block' }
          }} />
          
          <Box sx={{ position: 'relative', zIndex: 2 }}>
            <SociAllLogo />
            <Typography variant="h4" sx={{ color: '#ffffff', mb: 2, textAlign: 'center' }}>
              Junte-se à SociAll
            </Typography>
            <Typography variant="body1" sx={{ color: '#a5d9f3', textAlign: 'center', lineHeight: 1.7 }}>
              Conecte-se com pessoas que compartilham seus interesses e expanda sua rede social.
            </Typography>
          </Box>
        </LeftPanel>
        
        <RightPanel>
          <Typography component="h1" variant="h5" sx={{ mb: 4, color: '#253b6e', textAlign: 'center' }}>
            Crie sua conta
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormInput
                  id="fullName"
                  label="Nome e Sobrenome"
                  name="fullName"
                  autoComplete="name"
                  placeholder="Seu nome completo"
                  required
                  fullWidth
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormInput
                  id="email"
                  label="E-mail"
                  name="email"
                  autoComplete="email"
                  placeholder="Seu melhor e-mail"
                  required
                  fullWidth
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormInput
                  id="password"
                  label="Senha"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Crie uma senha segura"
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 4, mb: 3 }}>
              <Typography variant="h6" sx={{ color: '#253b6e', mb: 2 }}>
                Suas preferências
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
                {preferences.map((pref) => (
                  <FormControlLabel
                    key={pref}
                    control={
                      <Checkbox
                        checked={selectedPreferences.includes(pref)}
                        onChange={() => handlePreferenceToggle(pref)}
                        sx={{ 
                          color: '#324f94',
                          '&.Mui-checked': {
                            color: '#253b6e',
                          }
                        }}
                      />
                    }
                    label={
                      <PreferenceChip
                        label={pref}
                        clickable
                      />
                    }
                  />
                ))}
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <TextField
                  placeholder="Adicione suas preferências"
                  variant="outlined"
                  size="small"
                  value={newPreference}
                  onChange={(e) => setNewPreference(e.target.value)}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#a5d9f3',
                      },
                      '&:hover fieldset': {
                        borderColor: '#324f94',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#324f94',
                      },
                    },
                  }}
                />
                <IconButton 
                  onClick={handleAddPreference}
                  sx={{ 
                    ml: 1, 
                    backgroundColor: '#324f94',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#182794',
                    }
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ color: '#253b6e', mb: 2 }}>
                Sua localização
              </Typography>
              
              <TextField
                placeholder="Digite sua localização"
                variant="outlined"
                fullWidth
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#a5d9f3',
                    },
                    '&:hover fieldset': {
                      borderColor: '#324f94',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#324f94',
                    },
                  },
                }}
              />
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <LocationButton
                    variant="outlined"
                    startIcon={<LocationOnIcon />}
                    fullWidth
                  >
                    Digite manualmente
                  </LocationButton>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LocationButton
                    variant="contained"
                    startIcon={<MyLocationIcon />}
                    onClick={handleUseCurrentLocation}
                    current="true"
                    fullWidth
                  >
                    Usar localização atual
                  </LocationButton>
                </Grid>
              </Grid>
            </Box>
            
            <FormButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: '#253b6e',
                padding: '14px',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: '#182794',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
                mt: 2
              }}
            >
              Cadastrar-se
            </FormButton>
            
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="body2" sx={{ color: '#324f94' }}>
                Já tem uma conta?{' '}
                <Link href="/login" variant="body2" sx={{ 
                  color: '#253b6e', 
                  fontWeight: 600,
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#182794',
                    textDecoration: 'underline',
                  }
                }}>
                  Faça login
                </Link>
              </Typography>
            </Box>
          </Box>
        </RightPanel>
      </StyledPaper>
    </Container>
  );
};

export default Register;