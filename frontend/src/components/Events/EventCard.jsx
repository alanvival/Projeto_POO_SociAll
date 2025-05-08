// src/components/Events/EventCard.jsx
import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Avatar 
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';

const EventCard = ({ event, onConfirmPresence, onAddEvent }) => {
  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      borderRadius: 2
    }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            alt={event.organizer.name} 
            src={event.organizer.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(event.organizer.name)}&background=random`} 
            sx={{ width: 30, height: 30 }}
          />
          <Typography variant="subtitle2" sx={{ ml: 1 }}>
            {event.organizer.name}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
            Organizador
          </Typography>
        </Box>
        <Button 
          variant="text" 
          size="small" 
          sx={{ 
            color: '#253b6e',
            textTransform: 'none',
            fontWeight: 'medium'
          }}
          onClick={() => onAddEvent(event.organizer.id)}
        >
          Adicionar
        </Button>
      </Box>
      
      <Typography variant="h6" sx={{ px: 2, fontWeight: 'medium' }}>
        {event.title}
      </Typography>
      
      <CardMedia
        component="img"
        height="140"
        image={event.image || "https://source.unsplash.com/random/300x200/?park"}
        alt={event.title}
        sx={{ mt: 1 }}
      />
      
      <CardContent sx={{ flexGrow: 1, pt: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {event.description}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocationOnIcon fontSize="small" color="action" />
          <Typography variant="body2" sx={{ ml: 1 }}>
            {event.location}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <CalendarTodayIcon fontSize="small" color="action" />
          <Typography variant="body2" sx={{ ml: 1 }}>
            {event.date} - {event.time}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <PeopleIcon fontSize="small" color="action" />
          <Typography variant="body2" sx={{ ml: 1 }}>
            {event.confirmedPeople} Pessoas confirmadas
          </Typography>
        </Box>
        
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          Incrível evento o você, Com muitas confirmações
        </Typography>
        
        <Button
          fullWidth
          variant="contained"
          sx={{ 
            bgcolor: '#253b6e',
            '&:hover': { bgcolor: '#182794' },
            textTransform: 'none'
          }}
          onClick={() => onConfirmPresence(event.id)}
        >
          Confirmar Presença
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;