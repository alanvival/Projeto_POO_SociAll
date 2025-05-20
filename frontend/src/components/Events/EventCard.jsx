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
    function formatDateTime(isoString) {
        const date = new Date(isoString);
      
        const datePart = new Intl.DateTimeFormat('pt-BR', {
          day: '2-digit', month: '2-digit', year: 'numeric'
        }).format(date);
      
        const timePart = new Intl.DateTimeFormat('pt-BR', {
          hour: '2-digit', minute: '2-digit',
          hour12: false
        }).format(date);
      
        return `${datePart} às ${timePart}`;
    }

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
                        alt={event.usuario?.nome || 'Organizador Desconhecido'}
                        src={event.usuario?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(event.usuario?.nome || 'Desconhecido')}&background=random`}
                        sx={{ width: 30, height: 30 }}
                    />
                    <Typography variant="subtitle2" sx={{ ml: 1 }}>
                        {event.usuario?.nome || 'Organizador Desconhecido'}
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
                    onClick={() => onAddEvent(event.usuario.id)}
                >
                    Adicionar
                </Button>
            </Box>

            <Typography variant="h6" sx={{ px: 2, fontWeight: 'medium' }}>
                {event.nome}
            </Typography>

            <CardMedia
                component="img"
                height="140"
                image={event.foto || "https://picsum.photos/id/237/200/300"}
                alt='Imagem do Evento'
                sx={{ mt: 1 }}
            />

            <CardContent sx={{ flexGrow: 1, pt: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {event.descricao}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOnIcon fontSize="small" color="action" />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                        {event.endereco}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CalendarTodayIcon fontSize="small" color="action" />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                        {formatDateTime(event.data)}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PeopleIcon fontSize="small" color="action" />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                        {event.quantidadeInscritos} Pessoas confirmadas
                    </Typography>
                </Box>


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