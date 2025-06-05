import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid,
  Button,
  AppBar,
  Toolbar,
  Paper,
  Fade,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Importe o modal no início do arquivo MyEvents.jsx
import CreateEventModal from './CreateEventModal';
import EditEventModal from '../components/Events/EditEventModal';

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
const MyEventsRoot = styled(Box)(({ theme }) => ({
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

// Card de eventos estilizado
const EventCard = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
  backdropFilter: 'blur(10px)',
  borderRadius: 15,
  overflow: 'hidden',
  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.07)',
  transition: 'all 0.3s ease',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 30px rgba(37, 59, 110, 0.1)',
  }
}));

// Botão criar evento estilizado
const CreateButton = styled(Button)(({ theme }) => ({
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

// Botão de ação para evento estilizado
const ActionButton = styled(Button)(({ theme, variant }) => ({
  borderRadius: 8,
  padding: '6px 12px',
  textTransform: 'none',
  fontWeight: 600,
  transition: 'all 0.3s ease',
  ...(variant === 'modify' ? {
    borderColor: '#253b6e',
    color: '#253b6e',
    '&:hover': {
      backgroundColor: alpha('#253b6e', 0.05),
      borderColor: '#324f94',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(37, 59, 110, 0.15)',
    }
  } : {
    borderColor: '#ff3d00',
    color: '#ff3d00',
    '&:hover': {
      backgroundColor: alpha('#ff3d00', 0.05),
      borderColor: '#d32f2f',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(211, 47, 47, 0.15)',
    }
  })
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

// Imagem de evento estilizada
const EventImage = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 150,
  objectFit: 'cover',
  borderRadius: '8px 8px 0 0',
  transition: 'transform 0.5s ease',
  overflow: 'hidden',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '30%',
    background: 'linear-gradient(to top, rgba(0,0,0,0.1), rgba(0,0,0,0))',
  },
  '&:hover img': {
    transform: 'scale(1.05)',
  }
}));

const MyEvents = () => {
  const [myEventsData, setMyEventsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Adicione este estado para controlar a visibilidade do modal
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const navigate = useNavigate();
  const theme = useTheme();
  const infoUsuario = JSON.parse(localStorage.getItem('infoUsuario'));

  useEffect(() => {
    const fetchMyEvents = async () => {
      setLoading(true);
      setError(null);

      const request = {
        NomeEvento: "",
        CategoriaEventoIds: [],
        NomeCriador: "",
        IdUsuario: infoUsuario.id
      };

      try {
        const response = await axios.get('http://localhost:5173/api/eventos', { params: request });
        setMyEventsData(response.data.registros);
        console.log('Eventos recebidos:', myEventsData);
      } catch (err) {
        console.error('Erro ao buscar eventos:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, []);

  const handleBackToEvents = () => {
    navigate('/events');
  };

  const handleNavigateToProfile = () => {
    navigate('/perfil');
  };

  const handleNavigateToConfirmed = () => {
    navigate('/eventos-confirmados');
  };

  const handleModifyEvent = (eventId) => {
    const eventToEdit = myEventsData.find(event => event.id === eventId);
    if (eventToEdit) {
      setSelectedEvent(eventToEdit);
      setIsEditModalOpen(true);
    }
  };

  const handleUpdateEvent = async (eventId, eventData) => {
    try {
        const requestData = {
            Nome: eventData.nome,
            Data: eventData.data.toISOString(),
            Descricao: eventData.descricao,
            Foto: eventData.foto,
            Endereco: eventData.endereco
        };

        const response = await axios.put(`http://localhost:5173/api/eventos/${eventId}`, requestData);
        
        // Atualiza a lista de eventos com os dados retornados pela API
        setMyEventsData(currentEvents =>
            currentEvents.map(event =>
                event.id === eventId ? response.data : event
            )
        );

        setIsEditModalOpen(false); // Fecha o modal
        setSelectedEvent(null);    // Limpa o evento selecionado
        alert('Evento atualizado com sucesso!');

    } catch (err) {
        console.error('Erro ao atualizar evento:', err);
        alert('Falha ao atualizar o evento.');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    const isConfirmed = window.confirm("Tem certeza de que deseja excluir este evento?");

    if (!isConfirmed) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5173/api/eventos/${eventId}`);

      setMyEventsData(currentEvents =>
        currentEvents.filter(event => event.id !== eventId)
      );
      
      console.log(`Evento ${eventId} excluído com sucesso!`);

    } catch (err) {
      console.error('Erro ao excluir o evento:', err);
      alert('Não foi possível excluir o evento. Tente novamente.');
    }
  };

  // Modifique a função handleCreateEvent para abrir o modal
  const handleCreateEvent = () => {
    setOpenCreateModal(true);
  };

  // Adicione esta nova função para salvar o evento
  const handleSaveEvent = async (eventData) => {
    console.log('Salvando novo evento:', eventData);

    // Criar uma imagem temporária para o evento (pode ser substituída pela lógica real)
    const imageUrl = eventData.imagem 
      ? URL.createObjectURL(eventData.imagem) 
      : "https://via.placeholder.com/150";

    debugger

    // Criar objeto com os dados do evento
    const newEvent ={
      UsuarioId: eventData.UsuarioId,
      Nome: eventData.Nome,
      Data: eventData.Data,
      Descricao: eventData.Descricao,
      Foto: imageUrl,
      Endereco: eventData.Endereco,
      QuantidadeMaximaInscritos: eventData.QuantidadeMaximaInscritos,
      PreferenciasId: eventData.PreferenciasId
    }

    try {
      const response = await axios.post('http://localhost:5173/api/eventos', newEvent);
      console.log('Evento adicionado com sucesso:', response.data);
    } 
    catch (error) {
      console.error('Erro ao cadastrar evento:', error.response?.data || error.message);
    }
    
    // Adicionar o novo evento à lista
    setMyEventsData([newEvent, ...myEventsData]);
  };

  return (
    <MyEventsRoot>
      <FloatingShape position="top" />
      <FloatingShape />
      
      <StyledAppBar>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <SociAllLogo />
          </Box>
          
          <Typography 
            variant="h6" 
            sx={{ 
              flexGrow: 1, 
              fontWeight: 600, 
              background: 'linear-gradient(90deg, #ffffff, #e8f4fa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Meus Eventos
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
              onClick={handleNavigateToProfile}
            >
              Meu Perfil
            </Button>
            
            <NavButton 
              variant="contained" 
              startIcon={<CalendarMonthIcon />}
              onClick={handleBackToEvents}
            >
              Lista de Eventos
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
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
                  Eventos que você criou
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mt: 1, 
                    color: alpha('#324f94', 0.8),
                    maxWidth: '80%' 
                  }}
                >
                  Gerencie os eventos que você organizou
                </Typography>
              </Box>
              
              <CreateButton 
                variant="contained"
                startIcon={<AddCircleIcon />}
                onClick={handleCreateEvent}
              >
                Criar Novo Evento
              </CreateButton>
            </Box>
          </TitleCard>

          {loading && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" sx={{ color: alpha('#324f94', 0.8) }}>
                Carregando eventos...
              </Typography>
            </Box>
          )}
          
          {error && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" sx={{ color: '#d32f2f' }}>
                Falha ao carregar eventos.
              </Typography>
            </Box>
          )}

          {!loading && myEventsData.length === 0 && (
            <Box 
              sx={{ 
                textAlign: 'center', 
                py: 8,
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8))',
                backdropFilter: 'blur(10px)',
                borderRadius: 4,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                px: 3
              }}
            >
              <CalendarMonthIcon sx={{ fontSize: 60, color: alpha('#324f94', 0.3), mb: 2 }} />
              <Typography 
                variant="h6" 
                sx={{ 
                  color: alpha('#324f94', 0.8),
                  fontWeight: 600,
                  mb: 1
                }}
              >
                Você ainda não criou nenhum evento
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: alpha('#324f94', 0.6),
                  mb: 2
                }}
              >
                Comece agora mesmo criando seu primeiro evento
              </Typography>
              <CreateButton 
                variant="contained"
                startIcon={<AddCircleIcon />}
                onClick={handleCreateEvent}
              >
                Criar Meu Primeiro Evento
              </CreateButton>
            </Box>
          )}

          <Grid container spacing={3}>
            {!loading && myEventsData.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <EventCard elevation={0}>
                  <EventImage>
                    <Box 
                      component="img"
                      src={event.imagem || 'https://farm7.staticflickr.com/6089/6115759179_86316c08ff_z_d.jpg'}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                      }}
                    />
                  </EventImage>
                  
                  <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 1,
                        fontWeight: 600,
                        color: '#253b6e'
                      }}
                    >
                      {event.nome}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        mb: 1,
                        color: alpha('#000000', 0.7)
                      }}
                    >
                      {event.descricao}
                    </Typography>
                    
                    <Box 
                      sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 1
                      }}
                    >
                      <CalendarMonthIcon fontSize="small" sx={{ color: alpha('#324f94', 0.7) }} />
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: alpha('#324f94', 0.8),
                          fontWeight: 500
                        }}
                      >
                        {new Date(event.data).toLocaleDateString('pt-BR', { 
                          day: '2-digit', 
                          month: '2-digit', 
                          year: 'numeric' 
                        })}
                      </Typography>
                    </Box>
                    
                    <Box 
                      sx={{ 
                        mt: 'auto', 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        gap: 1.5
                      }}
                    >
                      <ActionButton 
                        variant="outlined"
                        onClick={() => handleModifyEvent(event.id)}
                        startIcon={<EditIcon />}
                        sx={{ flex: 1 }}
                      >
                        Modificar
                      </ActionButton>
                      
                      <ActionButton 
                        variant="outlined"
                        onClick={() => handleDeleteEvent(event.id)}
                        startIcon={<DeleteOutlineIcon />}
                        sx={{ flex: 1 }}
                      >
                        Excluir
                      </ActionButton>
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
      
      {/* Modal de criação de evento */}
      <CreateEventModal 
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onSave={handleSaveEvent}
      />
      <CreateEventModal 
            open={openCreateModal}
            onClose={() => setOpenCreateModal(false)}
            onSave={handleSaveEvent}
        />
        {selectedEvent && (
            <EditEventModal
                open={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleUpdateEvent}
                event={selectedEvent}
            />
        )}
    </MyEventsRoot>
  );
};

export default MyEvents;