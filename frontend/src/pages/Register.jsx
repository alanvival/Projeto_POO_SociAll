import React, { useState } from 'react';
import { 
  Box, Typography, Link, Paper, Grid, 
  IconButton, TextField, InputAdornment, Divider, Fade, Checkbox
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import AddIcon from '@mui/icons-material/Add';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Logo do SociAll como componente SVG
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

// Decoração de fundo moderna
const BackgroundDecoration = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: 'hidden',
  zIndex: 0,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-5%',
    left: '-5%',
    width: '110%',
    height: '30%',
    background: '#253b6e',
    transform: 'rotate(-3deg)',
    zIndex: 0,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-5%',
    right: '-5%',
    width: '110%',
    height: '30%',
    background: '#253b6e',
    transform: 'rotate(-3deg)',
    zIndex: 0,
  }
}));

// Formas flutuantes para efeito de profundidade
const FloatingShape = styled(Box)(({ theme, position }) => ({
  position: 'absolute',
  width: position === 'top' ? 300 : 200,
  height: position === 'top' ? 300 : 200,
  background: position === 'top' ? 'linear-gradient(135deg, rgba(37, 59, 110, 0.1), rgba(50, 79, 148, 0.1))' : 'linear-gradient(135deg, rgba(50, 79, 148, 0.1), rgba(24, 39, 148, 0.1))',
  borderRadius: '50%',
  zIndex: 0,
  top: position === 'top' ? '-150px' : 'auto',
  right: position === 'top' ? '-100px' : 'auto',
  bottom: position === 'top' ? 'auto' : '-100px',
  left: position === 'top' ? 'auto' : '-100px',
  animation: position === 'top' ? 'float 8s ease-in-out infinite' : 'float 10s ease-in-out infinite reverse',
  '@keyframes float': {
    '0%': { transform: 'translateY(0px) rotate(0deg)' },
    '50%': { transform: 'translateY(-20px) rotate(5deg)' },
    '100%': { transform: 'translateY(0px) rotate(0deg)' },
  },
}));

// Container principal
const RegisterRoot = styled(Box)(({ theme }) => ({
  margin: 0,
  padding: 0,
  minHeight: '100vh',
  width: '100vw',
  position: 'fixed',
  top: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #d2ecf9 0%, #a5d9f3 100%)',
}));

// Paper estilizado
const StyledPaper = styled(Paper)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  padding: theme.spacing(6),
  borderRadius: 20,
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
  backdropFilter: 'blur(10px)',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  width: '100%',
  maxWidth: 700,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '5px',
    background: 'linear-gradient(90deg, #253b6e, #324f94, #182794)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 3),
    margin: theme.spacing(2),
  }
}));

// Chip de preferência modernizado
const PreferenceChip = styled(Box)(({ theme, selected }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '6px 12px',
  margin: theme.spacing(0.5),
  borderRadius: '20px',
  fontSize: '0.875rem',
  fontWeight: 500,
  backgroundColor: selected ? alpha('#324f94', 0.15) : alpha('#a5d9f3', 0.15),
  color: '#324f94',
  border: `1px solid ${selected ? '#324f94' : 'transparent'}`,
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: alpha('#324f94', 0.2),
    transform: 'translateY(-2px)',
  },
}));

// Botão de localização
const LocationButton = styled(Box)(({ theme, current }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px 15px',
  borderRadius: '10px',
  fontWeight: 500,
  fontSize: '0.9rem',
  backgroundColor: current ? alpha('#324f94', 0.9) : alpha('#a5d9f3', 0.1),
  color: current ? '#ffffff' : '#324f94',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: current ? alpha('#253b6e', 0.9) : alpha('#a5d9f3', 0.2),
    transform: 'translateY(-2px)',
  },
}));

const Register = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [newHobby, setNewHobby] = useState('');
  const [preferencias, setPreferencias] = useState([
    {id: 1, descricao: 'Futebol'}, 
    {id: 2, descricao: 'Jogos'}, 
    {id: 3, descricao: 'Filmes'}, 
    {id: 4, descricao: 'Praias'}, 
    {id: 5, descricao: 'Comida'},
    {id: 6, descricao: 'Música'}
  ]);
  const [hobbies, setHobbies] = useState([
    {id: 1, descricao: 'Leitura'},
    {id: 2, descricao: 'Cozinhar'},
    {id: 3, descricao: 'Jardinagem'}
  ]);
  const [selectedPreferencias, setSelectedPreferencias] = useState([]);
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [endereco, setEndereco] = useState('');
  const [selectedLocationMethod, setSelectedLocationMethod] = useState('manual');
  
  const navigate = useNavigate();

  // Manipuladores de evento
  const handleAddHobby = () => {
    if (newHobby && !hobbies.some(hobby => hobby.descricao === newHobby)) {
      const newHobbyItem = { id: hobbies.length + 1, descricao: newHobby };
      setHobbies([...hobbies, newHobbyItem]);
      setSelectedHobbies([...selectedHobbies, newHobbyItem]);
      setNewHobby('');
    }
  };

  const handlePreferenceToggle = (preference) => {
    const isSelected = selectedPreferencias.some(pref => pref.id === preference.id);
    
    if (isSelected) {
      setSelectedPreferencias(selectedPreferencias.filter(pref => pref.id !== preference.id));
    } else {
      setSelectedPreferencias([...selectedPreferencias, preference]);
    }
  };

  const handleHobbyToggle = (hobby) => {
    const isSelected = selectedHobbies.some(h => h.id === hobby.id);
    
    if (isSelected) {
      setSelectedHobbies(selectedHobbies.filter(h => h.id !== hobby.id));
    } else {
      setSelectedHobbies([...selectedHobbies, hobby]);
    }
  };

  const handleLocationMethodSelect = (method) => {
    setSelectedLocationMethod(method);
    if (method === 'auto') {
      handleUseCurrentLocation();
    }
  };

  const handleUseCurrentLocation = () => {
    setEndereco('Obtendo localização atual...');
    // Simulação da obtenção de localização
    setTimeout(() => {
      setEndereco('Av. Paulista, 1000 - São Paulo, SP');
    }, 1500);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const idsPreferencias = selectedPreferencias.map(pref => pref.id);
    const idsHobbies = selectedHobbies.map(hobby => hobby.id);
    
    const formData = {
      Nome: nome,
      Email: email,
      Senha: senha,
      Endereco: endereco,
      DescricoesPreferencias: selectedPreferencias.map(pref => pref.descricao),
      IdsPreferencias: idsPreferencias,
      DescricoesHobbies: selectedHobbies.map(hobby => hobby.descricao),
      IdsHobbies: idsHobbies,
    };

    try {
      const response = await axios.post('http://localhost:5173/api/usuarios', formData);
      console.log('Cadastro realizado com sucesso:', response.data);
      navigate('/');
    } 
    catch (error) {
      console.error('Erro ao cadastrar:', error.response?.data || error.message);
    }
  };

  return (
    <RegisterRoot>
      <BackgroundDecoration />
      <FloatingShape position="top" />
      <FloatingShape />

      <Fade in={true} timeout={1000}>
        <Box sx={{
          position: 'relative',
          zIndex: 2,
          padding: 2,
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}>
          <StyledPaper elevation={6}>
            {/* Cabeçalho */}
            <Box sx={{
              mb: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              width: '100%',
            }}>
              <SociAllLogo />
              <Typography
                component="h1"
                variant="h4"
                sx={{
                  mt: 1,
                  fontWeight: 700,
                  background: 'linear-gradient(90deg, #253b6e, #324f94)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '0.5px',
                  textAlign: 'center',
                }}
              >
                Crie sua conta
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#324f94',
                  opacity: 0.8,
                  textAlign: 'center',
                  maxWidth: '80%',
                  mt: 1
                }}
              >
                Junte-se à comunidade SociAll e conecte-se com seus interesses
              </Typography>
            </Box>

            {/* Formulário */}
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                width: '100%',
                position: 'relative',
                zIndex: 3
              }}
            >
              <Grid container spacing={2}>
                {/* Dados pessoais */}
                <Grid item xs={12} md={6}>
                  <FormInput
                    id="nome"
                    label="Nome e Sobrenome"
                    name="nome"
                    autoComplete="name"
                    placeholder="Seu nome completo"
                    required
                    fullWidth
                    variant="filled"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    sx={{
                      mb: 2,
                      '.MuiFilledInput-root': {
                        borderRadius: 2,
                        backgroundColor: 'rgba(165, 217, 243, 0.1)',
                        '&:hover': {
                          backgroundColor: 'rgba(165, 217, 243, 0.2)',
                        },
                        '&.Mui-focused': {
                          backgroundColor: 'rgba(165, 217, 243, 0.2)',
                        }
                      }
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon sx={{ color: '#324f94' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  
                  <FormInput
                    id="email"
                    label="E-mail"
                    name="email"
                    autoComplete="email"
                    placeholder="seu.email@exemplo.com"
                    required
                    fullWidth
                    variant="filled"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                      mb: 2,
                      '.MuiFilledInput-root': {
                        borderRadius: 2,
                        backgroundColor: 'rgba(165, 217, 243, 0.1)',
                        '&:hover': {
                          backgroundColor: 'rgba(165, 217, 243, 0.2)',
                        },
                        '&.Mui-focused': {
                          backgroundColor: 'rgba(165, 217, 243, 0.2)',
                        }
                      }
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={{ color: '#324f94' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  
                  <FormInput
                    id="senha"
                    label="Senha"
                    name="senha"
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    required
                    fullWidth
                    variant="filled"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    sx={{
                      mb: 2,
                      '.MuiFilledInput-root': {
                        borderRadius: 2,
                        backgroundColor: 'rgba(165, 217, 243, 0.1)',
                        '&:hover': {
                          backgroundColor: 'rgba(165, 217, 243, 0.2)',
                        },
                        '&.Mui-focused': {
                          backgroundColor: 'rgba(165, 217, 243, 0.2)',
                        }
                      }
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon sx={{ color: '#324f94' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  
                  {/* Localização */}
                  <Box sx={{ mb: 2 }}>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        color: '#324f94', 
                        fontWeight: 600, 
                        mb: 1.5,
                        fontSize: '0.95rem'
                      }}
                    >
                      Localização
                    </Typography>
                    
                    <FormInput
                      placeholder="Sua localização"
                      variant="filled"
                      fullWidth
                      value={endereco}
                      onChange={(e) => setEndereco(e.target.value)}
                      sx={{
                        mb: 1.5,
                        '.MuiFilledInput-root': {
                          borderRadius: 2,
                          backgroundColor: 'rgba(165, 217, 243, 0.1)',
                          '&:hover': {
                            backgroundColor: 'rgba(165, 217, 243, 0.2)',
                          },
                          '&.Mui-focused': {
                            backgroundColor: 'rgba(165, 217, 243, 0.2)',
                          }
                        }
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationOnIcon sx={{ color: '#324f94' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <LocationButton 
                          current={selectedLocationMethod === 'manual'}
                          onClick={() => handleLocationMethodSelect('manual')}
                        >
                          <LocationOnIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
                          Manual
                        </LocationButton>
                      </Grid>
                      <Grid item xs={6}>
                        <LocationButton 
                          current={selectedLocationMethod === 'auto'}
                          onClick={() => handleLocationMethodSelect('auto')}
                        >
                          <MyLocationIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
                          Automático
                        </LocationButton>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                
                {/* Preferências e Hobbies */}
                <Grid item xs={12} md={6}>
                  {/* Preferências - apenas seleção, sem adição */}
                  <Box sx={{ mb: 2 }}>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        color: '#324f94', 
                        fontWeight: 600, 
                        mb: 1.5,
                        fontSize: '0.95rem'
                      }}
                    >
                      Suas preferências
                    </Typography>
                    
                    <Box sx={{ 
                      border: '1px solid rgba(165, 217, 243, 0.5)',
                      borderRadius: 2,
                      p: 2,
                      mb: 2,
                      minHeight: '120px',
                      backgroundColor: 'rgba(255, 255, 255, 0.5)',
                      maxHeight: '150px',
                      overflowY: 'auto'
                    }}>
                      {preferencias.map((pref) => (
                        <PreferenceChip
                          key={pref.id}
                          selected={selectedPreferencias.some(p => p.id === pref.id)}
                          onClick={() => handlePreferenceToggle(pref)}
                        >
                          <Box 
                            component="span" 
                            sx={{ 
                              display: 'flex', 
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 18,
                              height: 18,
                              borderRadius: '50%',
                              border: '1px solid #324f94',
                              backgroundColor: selectedPreferencias.some(p => p.id === pref.id) ? '#324f94' : 'transparent',
                              mr: 1
                            }}
                          >
                            {selectedPreferencias.some(p => p.id === pref.id) && (
                              <Box 
                                component="span" 
                                sx={{ 
                                  width: 6, 
                                  height: 6, 
                                  borderRadius: '50%',
                                  backgroundColor: 'white',
                                }}
                              />
                            )}
                          </Box>
                          {pref.descricao}
                        </PreferenceChip>
                      ))}
                    </Box>
                  </Box>

                  {/* Hobbies - com adição e seleção */}
                  <Box sx={{ mb: 2 }}>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        color: '#324f94', 
                        fontWeight: 600, 
                        mb: 1.5,
                        fontSize: '0.95rem'
                      }}
                    >
                      Seus hobbies
                    </Typography>
                    
                    <Box sx={{ 
                      border: '1px solid rgba(165, 217, 243, 0.5)',
                      borderRadius: 2,
                      p: 2,
                      mb: 2,
                      minHeight: '120px',
                      backgroundColor: 'rgba(255, 255, 255, 0.5)',
                      maxHeight: '150px',
                      overflowY: 'auto'
                    }}>
                      {hobbies.map((hobby) => (
                        <PreferenceChip
                          key={hobby.id}
                          selected={selectedHobbies.some(h => h.id === hobby.id)}
                          onClick={() => handleHobbyToggle(hobby)}
                        >
                          <Box 
                            component="span" 
                            sx={{ 
                              display: 'flex', 
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 18,
                              height: 18,
                              borderRadius: '50%',
                              border: '1px solid #324f94',
                              backgroundColor: selectedHobbies.some(h => h.id === hobby.id) ? '#324f94' : 'transparent',
                              mr: 1
                            }}
                          >
                            {selectedHobbies.some(h => h.id === hobby.id) && (
                              <Box 
                                component="span" 
                                sx={{ 
                                  width: 6, 
                                  height: 6, 
                                  borderRadius: '50%',
                                  backgroundColor: 'white',
                                }}
                              />
                            )}
                          </Box>
                          {hobby.descricao}
                        </PreferenceChip>
                      ))}
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TextField
                        placeholder="Adicionar hobby"
                        variant="outlined"
                        size="small"
                        value={newHobby}
                        onChange={(e) => setNewHobby(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddHobby();
                          }
                        }}
                        fullWidth
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
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
                        onClick={handleAddHobby}
                        sx={{ 
                          ml: 1, 
                          backgroundColor: '#324f94',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: '#182794',
                            transform: 'translateY(-2px)',
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              
              <Divider sx={{ mt: 3, mb: 3 }} />
              
              {/* Botão de cadastro */}
              <FormButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  background: 'linear-gradient(45deg, #253b6e 0%, #324f94 100%)',
                  padding: '14px',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  boxShadow: '0 4px 15px rgba(37, 59, 110, 0.3)',
                  letterSpacing: '0.5px',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #182794 0%, #253b6e 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(37, 59, 110, 0.4)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Criar minha conta
              </FormButton>

              {/* Link para login */}
              <Grid container justifyContent="center" sx={{ mt: 3 }}>
                <Grid item>
                  <Typography variant="body1" sx={{
                    color: '#324f94',
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                  }}>
                    Já tem uma conta?{' '}
                    <Link
                      href="/"
                      variant="body1"
                      sx={{
                        ml: 0.5,
                        color: '#253b6e',
                        fontWeight: 700,
                        textDecoration: 'none',
                        position: 'relative',
                        '&:hover': {
                          color: '#182794',
                        },
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: -2,
                          left: 0,
                          width: '0%',
                          height: 2,
                          backgroundColor: '#182794',
                          transition: 'width 0.3s ease',
                        },
                        '&:hover::after': {
                          width: '100%',
                        }
                      }}
                    >
                      Faça login
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </StyledPaper>
        </Box>
      </Fade>
    </RegisterRoot>
  );
};

export default Register;