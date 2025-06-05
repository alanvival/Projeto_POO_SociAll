import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Button,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  AppBar,
  Toolbar,
  Container,
  Fade,
  useTheme
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import TheatersIcon from '@mui/icons-material/Theaters';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import EditProfileModal from '../components/EditProfileModal';

// Logo igual EventList
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

// Estilos do EventList
const ProfileRoot = styled(Box)(({ theme }) => ({
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

const FloatingShape = styled(Box)(({ theme, position }) => ({
  position: 'absolute',
  width: position === 'top' ? 300 : 200,
  height: position === 'top' ? 300 : 200,
  background: position === 'top'
    ? 'linear-gradient(135deg, rgba(37, 59, 110, 0.05), rgba(50, 79, 148, 0.05))'
    : 'linear-gradient(135deg, rgba(50, 79, 148, 0.05), rgba(24, 39, 148, 0.05))',
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

const ProfileBanner = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: 150,
  width: '100%',
}));

const ProfileContent = styled(Paper)(({ theme }) => ({
  maxWidth: 900,
  margin: 'auto',
  marginTop: -80,
  padding: theme.spacing(3),
  position: 'relative',
  zIndex: 1,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[5],
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  border: `4px solid ${theme.palette.background.paper}`,
  position: 'absolute',
  top: -60,
  left: theme.spacing(3),
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.primary.main,
  fontSize: '3rem',
}));

const EditButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
  color: theme.palette.primary.dark,
}));

// Dados mockados iniciais
const initialUser = {
  name: 'Mauro Davi dos Santos Nepomuceno',
  role: 'Estudante',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas.',
  avatarUrl: '',
  interests: [
    { icon: <SportsSoccerIcon />, text: 'Ar Livre' },
    { icon: <TheatersIcon />, text: 'Cinema' },
    { icon: <MusicNoteIcon />, text: 'Música' },
  ],
  favoritePlaces: [
    { icon: <LocalMallIcon />, text: 'Shopping Vitória' },
    { icon: <RestaurantIcon />, text: "Rick's Burguer" },
    { icon: <LocalCafeIcon />, text: 'Dice CofeeHouse' },
  ],
  address: {
    street: 'Rua aleatória, 35',
    neighborhood: 'Boa Vista',
    city: 'Vila Velha - ES',
  },
};

export default function Profile() {
  const navigate = useNavigate();
  const theme = useTheme();

  // Estado para abrir/fechar modal
  const [editOpen, setEditOpen] = useState(false);

  // Estado dos dados do usuário (editável)
  const [userData, setUserData] = useState(initialUser);

  // Navegação dos botões do header
  const handleNavigateToProfile = () => {
    navigate('/perfil');
  };
  const handleNavigateToMyEvents = () => {
    navigate('/meus-eventos');
  };
  const handleNavigateToConfirmed = () => {
    navigate('/eventos-confirmados');
  };
  const handleNavigateHome = () => {
    navigate('/events');
  };

  // Ícones para interesses e lugares favoritos (cíclico)
  const iconList = [
    <SportsSoccerIcon />,
    <TheatersIcon />,
    <MusicNoteIcon />
  ];
  const placeIconList = [
    <LocalMallIcon />,
    <RestaurantIcon />,
    <LocalCafeIcon />
  ];

  // Handler para salvar alterações do perfil
  const handleSaveProfile = (form) => {
    setUserData({
      ...userData,
      name: form.name,
      bio: form.bio,
      interests: form.interests.map((text, idx) => ({
        icon: iconList[idx % iconList.length],
        text
      })),
      favoritePlaces: form.favoritePlaces.map((text, idx) => ({
        icon: placeIconList[idx % placeIconList.length],
        text
      })),
      address: {
        street: form.street,
        neighborhood: form.neighborhood,
        city: form.city,
      }
    });
    // Aqui você pode fazer uma chamada à API para salvar no backend, se desejar
  };

  return (
    <ProfileRoot>
      <FloatingShape position="top" />
      <FloatingShape />

      {/* HEADER igual EventList */}
      <StyledAppBar>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2, cursor: 'pointer' }} onClick={handleNavigateHome}>
            <SociAllLogo />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
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

      {/* CONTEÚDO DO PROFILE */}
      <Fade in={true} timeout={800}>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 6, position: 'relative', zIndex: 1 }}>
          <ProfileBanner />
          <ProfileContent elevation={3}>
            <ProfileAvatar alt={userData.name} src={userData.avatarUrl}>
              {userData.avatarUrl ? null : userData.name.charAt(0)}
            </ProfileAvatar>
            <EditButton
              variant="outlined"
              size="small"
              startIcon={<EditIcon />}
              onClick={() => setEditOpen(true)}
            >
              Editar
            </EditButton>
            <Box sx={{ pl: '150px', pt: 1 }}>
              <Typography variant="h5" component="h1" fontWeight="bold">
                {userData.name}
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                {userData.role}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {userData.bio}
              </Typography>
            </Box>
            <Divider sx={{ my: 3 }} />
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <SectionTitle variant="h6">Interesses</SectionTitle>
                <List dense>
                  {userData.interests.map((item, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemIcon sx={{ minWidth: 35 }}>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={12} md={4}>
                <SectionTitle variant="h6">Lugares Favoritos</SectionTitle>
                <List dense>
                  {userData.favoritePlaces.map((item, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemIcon sx={{ minWidth: 35 }}>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={12} md={4}>
                <SectionTitle variant="h6">Endereço</SectionTitle>
                <List dense>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 35 }}>
                      <LocationOnIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={userData.address.street}
                      secondary={`${userData.address.neighborhood}, ${userData.address.city}`}
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </ProfileContent>
        </Container>
      </Fade>

      {/* Modal de edição */}
      <EditProfileModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        user={userData}
        onSave={handleSaveProfile}
      />

      {/* FOOTER igual EventList */}
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
    </ProfileRoot>
  );
}