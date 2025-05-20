import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid,
  Button,
  AppBar,
  Toolbar,
  Chip,
  Paper,
  Fade,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
      <circle cx="100" cy="70" r="50" fill="url(#logoGradient)"/>
      <circle cx="80" cy="60" r="7" fill="#ffffff"/>
      <circle cx="120" cy="60" r="7" fill="#ffffff"/>
      <path d="M130,85 C130,95 115,110 100,110 C85,110 70,95 70,85" fill="#ffffff"/>
      <path d="M100,120 L150,170 C160,180 170,160 155,145 L130,120 C130,120 115,100 100,120Z" fill="url(#logoGradient)"/>
    </g>
  </svg>
);

// Container principal com reset de margens
const ConfirmedEventsRoot = styled(Box)(({ theme }) => ({
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

// Estilo para os cards de evento
const EventCard = styled(Paper)(({ theme }) => ({
  borderRadius: 15,
  overflow: 'hidden',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.07)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 30px rgba(37, 59, 110, 0.12)',
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

// Botão de cancelamento estilizado
const CancelButton = styled(Button)(({ theme }) => ({
  borderRadius: 10,
  padding: '8px 16px',
  textTransform: 'none',
  fontWeight: 600,
  transition: 'all 0.3s ease',
  borderColor: '#ff3d00',
  color: '#ff3d00',
  '&:hover': {
    borderColor: '#d32f2f',
    backgroundColor: alpha('#ffe0de', 0.2),
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(211, 47, 47, 0.1)',
  }
}));

// Chip estilizado
const StyledChip = styled(Chip)(({ theme }) => ({
  borderRadius: 8,
  fontWeight: 600,
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08)',
  background: 'linear-gradient(90deg, #4caf50, #81c784)',
  '& .MuiChip-icon': {
    color: '#ffffff',
  }
}));

const ConfirmedEvents = () => {
  const [confirmedEventsData, setConfirmedEventsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchConfirmedEvents = async () => {
      setLoading(true);
      setError(null);

      try {
        // Aqui você faria uma chamada para buscar os eventos confirmados pelo usuário
        // Exemplo: const response = await axios.get('http://localhost:5173/api/eventos-confirmados');
        // Usando dados fictícios por enquanto
        const mockData = [
          {
            id: 3,
            nome: "Palestra sobre React",
            descricao: "Palestra sobre as novidades do React",
            data: "2025-06-20",
            horario: "19:00",
            local: "Centro de Convenções",
            criador: "Maria Oliveira",
            categoria: "Tecnologia",
            imagem: "https://via.placeholder.com/150"
          },
          {
            id: 4,
            nome: "Meetup de Desenvolvedores",
            descricao: "Encontro para networking entre desenvolvedores",
            data: "2025-06-25",
            horario: "18:30",
            local: "Coworking Central",
            criador: "Pedro Santos",
            categoria: "Tecnologia",
            imagem: "https://via.placeholder.com/150"
          },
          {
            id: 5,
            nome: "Feira de Startups",
            descricao: "Feira com apresentação de startups inovadoras",
            data: "2025-07-05",
            horario: "10:00",
            local: "Centro Empresarial",
            criador: "Ana Costa",
            categoria: "Negócios",
            imagem: "https://via.placeholder.com/150"
          }
        ];
        
        setConfirmedEventsData(mockData);
      } catch (err) {
        console.error('Erro ao buscar eventos confirmados:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchConfirmedEvents();
  }, []);

  const handleBackToEvents = () => {
    navigate('/events');
  };

  const handleNavigateToMyEvents = () => {
    navigate('/meus-eventos');
  };

  const handleCancelPresence = (eventId) => {
    console.log(`Cancelando presença no evento ${eventId}`);
    // Implementar lógica para cancelar presença
  };

  return (
    <ConfirmedEventsRoot>
      <FloatingShape position="top" />
      <FloatingShape />
      
      <StyledAppBar position="static">
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <SociAllLogo />
          </Box>
          
          <Typography 
            variant="h6" 
            sx={{ 
              flexGrow: 1, 
              fontWeight: 600,
              letterSpacing: '0.5px'
            }}
          >
            Eventos Confirmados
          </Typography>
          
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
            >
              Meu Perfil
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
              onClick={handleBackToEvents}
            >
              Lista de Eventos
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
              <CheckCircleIcon sx={{ 
                color: '#4caf50',
                fontSize: '1.5rem',
                verticalAlign: 'middle' 
              }} />
              Eventos em que você confirmou presença
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                mt: 1, 
                color: alpha('#324f94', 0.8),
                maxWidth: '80%' 
              }}
            >
              Gerencie sua agenda de eventos confirmados
            </Typography>
          </TitleCard>

          {loading && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" sx={{ color: alpha('#324f94', 0.8) }}>
                Carregando eventos confirmados...
              </Typography>
            </Box>
          )}
          
          {error && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" sx={{ color: '#d32f2f' }}>
                Falha ao carregar eventos confirmados.
              </Typography>
            </Box>
          )}

          {!loading && confirmedEventsData.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" sx={{ color: alpha('#324f94', 0.8) }}>
                Você ainda não confirmou presença em nenhum evento.
              </Typography>
            </Box>
          )}

          <Grid container spacing={3}>
            {!loading && confirmedEventsData.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <EventCard>
                  <Box
                    sx={{
                      position: 'relative',
                      p: 2,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <StyledChip 
                      label="Confirmado" 
                      size="small"
                      icon={<CheckCircleIcon />}
                      sx={{ 
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        zIndex: 1
                      }}
                    />
                    
                    <Box 
                      component="img"
                      src={event.imagem}
                      sx={{
                        width: '100%',
                        height: 150,
                        objectFit: 'cover',
                        borderRadius: 2,
                        mb: 2,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.02)',
                          boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
                        }
                      }}
                    />
                    
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 1,
                        fontWeight: 700,
                        color: '#253b6e'
                      }}
                    >
                      {event.nome}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        mb: 2,
                        color: alpha('#324f94', 0.8)
                      }}
                    >
                      {event.descricao}
                    </Typography>
                    
                    <Box sx={{ 
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 0.5,
                      mb: 2,
                      '& .MuiTypography-root': {
                        color: alpha('#324f94', 0.9),
                        fontWeight: 500
                      }
                    }}>
                      <Typography variant="body2">
                        <strong>Data:</strong> {new Date(event.data).toLocaleDateString()} às {event.horario}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Local:</strong> {event.local}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Organizador:</strong> {event.criador}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Categoria:</strong> {event.categoria}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mt: 'auto' }}>
                      <CancelButton 
                        variant="outlined"
                        fullWidth
                        onClick={() => handleCancelPresence(event.id)}
                      >
                        Cancelar Presença
                      </CancelButton>
                    </Box>
                  </Box>
                </EventCard>
              </Grid>
            ))}
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
    </ConfirmedEventsRoot>
  );
};

export default ConfirmedEvents;