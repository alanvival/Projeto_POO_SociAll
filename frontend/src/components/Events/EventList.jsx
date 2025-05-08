import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  InputAdornment,
  Grid,
  Button,
  AppBar,
  Toolbar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import EventCard from './EventCard';


const SociAllLogo = () => (
  <svg viewBox="0 0 200 200" width="100" height="100">
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#253b6e" />
        <stop offset="100%" stopColor="#324f94" />
      </linearGradient>
    </defs>
    <g>
      <circle cx="100" cy="70" r="50" fill="url(#logoGradient)" />
      <circle cx="80" cy="60" r="7" fill="#ffffff" />
      <circle cx="120" cy="60" r="7" fill="#ffffff" />
      <path d="M130,85 C130,95 115,110 100,110 C85,110 70,95 70,85" fill="#ffffff" />
      <path d="M100,120 L150,170 C160,180 170,160 155,145 L130,120 C130,120 115,100 100,120Z" fill="url(#logoGradient)" />
    </g>
  </svg>
);

const eventsData = [
    {
      id: 1,
      title: 'Workshop de React',
      date: '2025-05-10',
      time: '14:00',
      location: 'São Paulo, SP',
      description: 'Aprenda os fundamentos do React em um workshop prático.',
      confirmedPeople: 25,
      organizer: {
        name: 'João Silva',
        avatar: '',
        id: 101,
      },
      image: '',
    },
    {
      id: 2,
      title: 'Hackathon de Inovação',
      date: '2025-05-15',
      time: '10:00',
      location: 'Rio de Janeiro, RJ',
      description: 'Participe de um hackathon para criar soluções inovadoras.',
      confirmedPeople: 50,
      organizer: {
        name: 'Maria Oliveira',
        avatar: '',
        id: 102,
      },
      image: '',
    },
    {
      id: 3,
      title: 'Conferência de Tecnologia',
      date: '2025-05-20',
      time: '09:00',
      location: 'Belo Horizonte, MG',
      description: 'Explore as tendências mais recentes em tecnologia.',
      confirmedPeople: 100,
      organizer: {
        name: 'Carlos Souza',
        avatar: '',
        id: 103,
      },
      image: '',
    },
  ];

const EventList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleConfirmPresence = (eventId) => {
    console.log(`Presença confirmada no evento ${eventId}`);
  };

  const handleAddEvent = (organizerId) => {
    console.log(`Adicionando evento do organizador ${organizerId}`);
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static" sx={{ bgcolor: '#253b6e' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <SociAllLogo /> {/* Substituindo o Logo */}
          </Box>
          
          <TextField
            placeholder="Pesquisar eventos..."
            variant="outlined"
            size="small"
            sx={{ 
              flexGrow: 1,
              bgcolor: 'white',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#253b6e' }} />
                </InputAdornment>
              ),
            }}
            value={searchTerm}
            onChange={handleSearchChange}
          />
          
          <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
            <Button 
              color="inherit"
              startIcon={<PersonIcon />}
              sx={{ textTransform: 'none', mr: 2 }}
            >
              Meu Perfil
            </Button>
            
            <Button 
              variant="contained" 
              color="secondary"
              sx={{ 
                bgcolor: '#d2ecf9', 
                color: '#253b6e', 
                '&:hover': { bgcolor: '#a5d9f3' },
                textTransform: 'none'
              }}
            >
              Meus eventos Confirmados
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'medium' }}>
          Listagem eventos
        </Typography>

        <Grid container spacing={3}>
          {eventsData.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <EventCard 
                event={event} 
                onConfirmPresence={handleConfirmPresence}
                onAddEvent={handleAddEvent}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      
      {/* Footer com logo */}
      <Box
        sx={{
          p: 2,
          bgcolor: '#f5f5f5',
          display: 'flex',
          justifyContent: 'center',
          mt: 'auto'
        }}
      >
        <SociAllLogo /> {/* Substituindo o Logo */}
      </Box>
    </Box>
  );
};

export default EventList;