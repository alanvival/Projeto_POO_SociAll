import React, { useState, useEffect } from 'react';
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
  Paper,
  Fade,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventCard from '../components/Events/EventCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// ... (SociAllLogo, EventListRoot, FloatingShape, StyledAppBar, NavButton, SearchField, StyledContainer, TitleCard, StyledFooter - permanecem os mesmos)
// Logo original com estilo atualizado
const SociAllLogo = () => (
  <svg viewBox="0 0 200 200" width="60" height="60">
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

// Container principal com reset de margens
const EventListRoot = styled(Box)(({ theme }) => ({
  margin: 0,
  padding: 0,
  minHeight: '100vh',
  width: '100vw',
  position: 'relative',
  top: 0,
  left: 0,
  display: 'flex',
  flexDirection: 'column',
  background: 'linear-gradient(135deg, #f5f5f5 0%, #e8f4fa 100%)',
  overflow: 'hidden',
}));

// Decoração de formas flutuantes para o background
const FloatingShape = styled(Box)(({ theme, position }) => ({
  position: 'absolute',
  width: position === 'top' ? 300 : 200,
  height: position === 'top' ? 300 : 200,
  background: position === 'top' ? 'linear-gradient(135deg, rgba(37, 59, 110, 0.05), rgba(50, 79, 148, 0.05))' : 'linear-gradient(135deg, rgba(50, 79, 148, 0.05), rgba(24, 39, 148, 0.05))',
  borderRadius: '50%',
  zIndex: 0,
  top: position === 'top' ? '10%' : 'auto',
  right: position === 'top' ? '5%' : 'auto',
  bottom: position === 'top' ? 'auto' : '10%',
  left: position === 'top' ? 'auto' : '5%',
  animation: position === 'top' ? 'float 8s ease-in-out infinite' : 'float 10s ease-in-out infinite reverse',
  '@keyframes float': {
    '0%': { transform: 'translateY(0px) rotate(0deg)' },
    '50%': { transform: 'translateY(-20px) rotate(5deg)' },
    '100%': { transform: 'translateY(0px) rotate(0deg)' },
  },
}));

// AppBar modernizado
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(90deg, #253b6e, #324f94)',
  boxShadow: '0 4px 20px rgba(37, 59, 110, 0.15)',
  position: 'sticky',
  top: 0,
  zIndex: 10,
  width: '100%',
  left: 0,
  right: 0,
  margin: 0,
  padding: 0,
}));

// Botão de navegação estilizado
const NavButton = styled(Button)(({ theme }) => ({
  borderRadius: 10,
  padding: '8px 16px',
  textTransform: 'none',
  fontWeight: 600,
  transition: 'all 0.3s ease',
  backgroundColor: alpha('#d2ecf9', 0.9),
  color: '#253b6e',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: alpha('#a5d9f3', 0.9),
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  }
}));

// Campo de pesquisa estilizado
const SearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 10,
    backgroundColor: alpha('#ffffff', 0.95),
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
    },
    '&.Mui-focused': {
      boxShadow: '0 4px 15px rgba(37, 59, 110, 0.15)',
    }
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: alpha('#d2ecf9', 0.5),
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: alpha('#a5d9f3', 0.7),
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#324f94',
  }
}));

// Container de conteúdo estilizado
const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(6),
  position: 'relative',
  zIndex: 1,
}));

// Card de título estilizado
const TitleCard = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))',
  backdropFilter: 'blur(10px)',
  borderRadius: 15,
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '5px',
    height: '100%',
    background: 'linear-gradient(to bottom, #253b6e, #324f94)',
  }
}));

// Footer estilizado
const StyledFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(180deg, rgba(242, 242, 242, 0) 0%, rgba(210, 236, 249, 0.3) 100%)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80%',
    height: '1px',
    background: 'radial-gradient(circle, rgba(37, 59, 110, 0.2) 0%, rgba(255, 255, 255, 0) 70%)',
  }
}));


const EventList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // const theme = useTheme(); // Removido se não usado diretamente aqui
  const infoUsuario = JSON.parse(localStorage.getItem('infoUsuario'));

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);

      const requestParams = {
        NomeEvento: searchTerm,
        CategoriaEventoIds: [],
        NomeCriador: "",
        Pg: 1,
        Qt: 100,
      };

      try {
        const response = await axios.get('http://localhost:5173/api/eventos', { params: requestParams });
        
        const eventosFormatados = response.data.registros.map(evento => ({
          ...evento
        }));

        const eventosFiltrados = eventosFormatados.filter(
          evento => evento.usuario.id !== infoUsuario.id
        );
      
        setEventsData(eventosFiltrados);
      } catch (err) {
        console.error('Erro ao buscar eventos:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (infoUsuario && infoUsuario.id) {
        fetchEvents();
    } else {
        console.warn('Informações do usuário não encontradas no localStorage.');
    }
  }, [searchTerm, infoUsuario?.id]); // Adiciona infoUsuario.id para refazer a busca se o usuário mudar

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // Se precisar buscar ao digitar, chame a função fetchEvents aqui ou ajuste o useEffect
  };

  const handleConfirmPresence = async (eventId) => {
    if (!infoUsuario || !infoUsuario.id) {
      console.error('Usuário não logado. Impossível confirmar presença.');
      
      setError({ message: 'Você precisa estar logado para confirmar presença.' });
      return;
    }

    const request = {
      EventoId: eventId,
      UsuarioId: infoUsuario.id
    };

    try {
      const response = await axios.post('http://localhost:5173/api/inscricoes', request);
      console.log('Inscrição realizada com sucesso:', response.data);

      setEventsData(prevEventsData =>
        prevEventsData.map(event => {
          if (event.id === eventId) {
            return {
              ...event,
              quantidadeConfirmados: (event.quantidadeConfirmados || 0) + 1,
              usuarioConfirmou: true
            };
          }
          return event;
        })
      );
      setError(null);

    } catch (err) {
      console.error('Erro ao confirmar presença:', err);
      if (err.response && err.response.data && err.response.data.message === 'Usuário já inscrito neste evento') {
        setError({ message: 'Você já está inscrito neste evento.' });
        setEventsData(prevEventsData =>
            prevEventsData.map(event => 
                event.id === eventId ? { ...event, usuarioConfirmou: true } : event
            )
        );
      } else {
        setError(err);
      }
    }
  };

  const handleAddEvent = (organizerId) => {
    console.log(`Adicionando evento do organizador ${organizerId}`);
    // Implementar lógica de adicionar evento
  };

  const handleNavigateToMyEvents = () => {
    navigate('/meus-eventos');
  };

  const handleNavigateToConfirmed = () => {
    navigate('/eventos-confirmados');
  };

  // ***** FUNÇÃO PARA NAVEGAR PARA O PERFIL *****
  const handleNavigateToProfile = () => {
    navigate('/perfil');
  };

  if (!infoUsuario) {
    return (
      <EventListRoot>

        <StyledAppBar>
        </StyledAppBar>
        <StyledContainer maxWidth="lg">
            <Typography variant="h6" sx={{ textAlign: 'center', mt: 5 }}>
                Por favor, faça login para ver os eventos.
            </Typography>
        </StyledContainer>
      </EventListRoot>
    );
  }

  return (
    <EventListRoot>
      <FloatingShape position="top" />
      <FloatingShape />

      <StyledAppBar>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <SociAllLogo />
          </Box>

          <SearchField
            placeholder="Pesquisar eventos..."
            variant="outlined"
            size="small"
            sx={{ flexGrow: 1 }}
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

          <Box sx={{ ml: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              color="inherit"
              startIcon={<PersonIcon />}
              sx={{
                textTransform: 'none',
                borderRadius: 10,
                color: '#ffffff',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: alpha('#ffffff', 0.1)
                }
              }}
              onClick={handleNavigateToProfile} // <--- ONCLICK ADICIONADO AQUI
            >
              {infoUsuario.nome || 'Meu Perfil'}
            </Button>

            <NavButton
              variant="contained"
              startIcon={<CalendarMonthIcon />}
              onClick={handleNavigateToMyEvents}
            >
              Meus Eventos
            </NavButton>

            <NavButton
              variant="contained"
              startIcon={<CheckCircleIcon />}
              onClick={handleNavigateToConfirmed}
            >
              Confirmados
            </NavButton>
          </Box>
        </Toolbar>
      </StyledAppBar>

      <Fade in={true} timeout={800}>
        <StyledContainer maxWidth="lg">
          <TitleCard elevation={0}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(90deg, #253b6e, #324f94)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.5px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <CalendarMonthIcon sx={{
                color: '#253b6e',
                fontSize: '1.5rem',
                verticalAlign: 'middle'
              }} />
              Descubra Eventos
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: 1,
                color: alpha('#324f94', 0.8),
                maxWidth: '80%'
              }}
            >
              Explore e encontre os melhores eventos para participar
            </Typography>
          </TitleCard>

          {loading && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" sx={{ color: alpha('#324f94', 0.8) }}>
                Carregando eventos...
              </Typography>
            </Box>
          )}

          {error && (
            <Box sx={{ textAlign: 'center', py: 4, backgroundColor: alpha('#ffd9d9', 0.5), borderRadius: 2, border: '1px solid #d32f2f', marginX: 'auto', maxWidth: '600px' }}>
              <Typography variant="h6" sx={{ color: '#d32f2f' }}>
                {error.message || 'Falha ao processar a solicitação.'}
              </Typography>
            </Box>
          )}

          <Grid container spacing={3}>
            {!loading && eventsData && eventsData.length > 0 ? (
              eventsData.map((event) => (
                <Grid item xs={12} sm={6} md={4} key={event.id}>
                  <EventCard
                    event={event}
                    onConfirmPresence={handleConfirmPresence}
                    onAddEvent={handleAddEvent}
                  />
                </Grid>
              ))
            ) : (
              !loading && (
                <Grid item xs={12}>
                  <Typography sx={{ textAlign: 'center', color: alpha('#324f94', 0.8), py: 8 }}>
                    Nenhum evento encontrado.
                  </Typography>
                </Grid>
              )
            )}
          </Grid>
        </StyledContainer>
      </Fade>

      {/* Footer */}

      <StyledFooter>
        <SociAllLogo />
        <Typography
          variant="body2"
          sx={{
            mt: 1,
            color: alpha('#324f94', 0.7),
            fontWeight: 500
          }}
        >
          SociAll © {new Date().getFullYear()}
        </Typography>
      </StyledFooter>
    </EventListRoot>
  );
};

export default EventList;
