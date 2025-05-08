// src/pages/Login.jsx
import React, { useState } from 'react';
import { 
  Box, Typography, Container, Link, Paper, Grid, Fade, 
  IconButton, InputAdornment, Divider, useTheme, useMediaQuery 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 
const SociAllLogo = () => (
  <svg viewBox="0 0 200 200" width="100" height="100">
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


const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: `linear-gradient(135deg, #d2ecf9 0%, #a5d9f3 100%)`,
  padding: theme.spacing(3),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-10%',
    left: '-5%',
    width: '120%',
    height: '30%',
    background: '#253b6e',
    transform: 'rotate(-3deg)',
    zIndex: 0,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-10%',
    right: '-5%',
    width: '120%',
    height: '30%',
    background: '#253b6e',
    transform: 'rotate(-3deg)',
    zIndex: 0,
  }
}));

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
  }
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  width: 50,
  height: 50,
  borderRadius: '50%',
  backgroundColor: '#f0f8ff',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
  margin: theme.spacing(0, 1),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
  }
}));

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

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Capturando os dados do formulário
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    let request = {
      Email: email,
      Senha: password
    }
    
    try {
      const response = await axios.post('http://localhost:5173/api/usuarios/autenticar', request);
      console.log('Login realizado com sucesso:', response.data);

      navigate('/events');
    } 
    catch (error) {
      console.error('Erro ao cadastrar:', error.response?.data || error.message);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <StyledContainer maxWidth="xl">
      <FloatingShape position="top" />
      <FloatingShape />
      
      <Fade in={true} timeout={1000}>
        <Box sx={{ 
          width: '100%', 
          maxWidth: 480,
          position: 'relative',
          zIndex: 2,
        }}>
          <StyledPaper elevation={24}>
            <Box sx={{ 
              mb: 4, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -20,
                width: '80%',
                height: 1,
                background: 'radial-gradient(circle, rgba(37, 59, 110, 0.3) 0%, rgba(255, 255, 255, 0) 70%)',
              }
            }}>
              <SociAllLogo />
              <Typography 
                component="h1" 
                variant="h4" 
                sx={{ 
                  mt: 2, 
                  fontWeight: 700, 
                  background: 'linear-gradient(90deg, #253b6e, #324f94)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '0.5px'
                }}
              >
                Bem-vindo de volta
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#324f94', 
                  opacity: 0.8, 
                  textAlign: 'center',
                  maxWidth: '80%'
                }}
              >
                Entre para continuar sua experiência social
              </Typography>
            </Box>

            <Box 
              component="form" 
              onSubmit={handleSubmit} 
              sx={{ 
                width: '100%',
                position: 'relative',
                zIndex: 3
              }}
            >
              <FormInput
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                placeholder="seu.email@exemplo.com"
                required
                fullWidth
                variant="filled"
                sx={{ 
                  mb: 3,
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
                id="password"
                label="Senha"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                required
                fullWidth
                variant="filled"
                sx={{ 
                  mb: 1,
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
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? 
                          <VisibilityOffIcon sx={{ color: '#324f94' }} /> : 
                          <VisibilityIcon sx={{ color: '#324f94' }} />
                        }
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                <Link 
                  href="#" 
                  variant="body2" 
                  sx={{ 
                    color: '#324f94', 
                    fontSize: '0.9rem',
                    fontWeight: 500,
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
                      height: 1,
                      backgroundColor: '#182794',
                      transition: 'width 0.3s ease',
                    },
                    '&:hover::after': {
                      width: '100%',
                    }
                  }}
                >
                  Esqueceu a senha?
                </Link>
              </Box>
              
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
                Entrar
              </FormButton>
              
              <Box sx={{ position: 'relative', my: 4 }}>
                <Divider>
                  <Typography variant="body2" sx={{ color: '#324f94', px: 1, fontWeight: 500 }}>
                    ou continue com
                  </Typography>
                </Divider>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <SocialButton aria-label="Google">
                  <GoogleIcon sx={{ color: '#324f94' }} />
                </SocialButton>
                <SocialButton aria-label="Facebook">
                  <FacebookIcon sx={{ color: '#324f94' }} />
                </SocialButton>
                <SocialButton aria-label="Apple">
                  <AppleIcon sx={{ color: '#324f94' }} />
                </SocialButton>
              </Box>
              
              <Grid container justifyContent="center">
                <Grid item>
                  <Typography variant="body1" sx={{ 
                    color: '#324f94', 
                    display: 'flex', 
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                  }}>
                    Não tem uma conta?{' '}
                    <Link 
                      href="/register" 
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
                      Cadastre-se agora
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </StyledPaper>
        </Box>
      </Fade>
    </StyledContainer>
  );
};

export default Login;