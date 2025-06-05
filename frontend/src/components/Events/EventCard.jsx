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
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Ícone para o botão confirmado

const EventCard = ({ event, onConfirmPresence, onAddEvent }) => {
    function formatDateTime(isoString) {
        if (!isoString) return 'Data não informada'; // Tratamento para data inválida ou ausente
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

    const isCurrentUserConfirmed = event.usuarioConfirmou || false;
    const eventDate = event.data || event.dataHoraInicio;
    const confirmedCount = event.quantidadeConfirmados !== undefined ? event.quantidadeConfirmados : event.quantidadeInscritos;

    return (
        <Card sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)', // Sombra sutil
            borderRadius: 3, // Bordas mais arredondadas
            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
            }
        }}>
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #eee' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                        alt={event.usuario?.nome || 'Organizador'}
                        src={event.usuario?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(event.usuario?.nome || 'D')}&background=random&color=fff`}
                        sx={{ width: 32, height: 32 }}
                    />
                    <Box sx={{ ml: 1.5 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
                            {event.usuario?.nome || 'Organizador Desconhecido'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.2 }}>
                            Organizador
                        </Typography>
                    </Box>
                </Box>

                {onAddEvent && typeof onAddEvent === 'function' && (
                     <Button
                        variant="outlined"
                        size="small"
                        sx={{
                            color: '#253b6e',
                            borderColor: '#253b6e',
                            textTransform: 'none',
                            fontWeight: 'medium',
                            borderRadius: 2,
                            '&:hover': {
                                backgroundColor: 'rgba(37, 59, 110, 0.04)',
                                borderColor: '#182794',
                            }
                        }}
                        onClick={() => onAddEvent(event.usuario?.id)}
                    >
                        + Seguir Org.
                    </Button>
                )}
            </Box>

            {/* Se o evento tiver uma imagem, exiba */}
            {event.foto && (
                <CardMedia
                    component="img"
                    height="160"
                    image={event.foto || "https://via.placeholder.com/600x400.png?text=Evento+Sem+Imagem"}
                    alt={`Imagem do Evento: ${event.nome}`}
                    sx={{ objectFit: 'cover' }}
                />
            )}

            <CardContent sx={{ flexGrow: 1, pt: event.foto ? 2 : 1 }}> {/* Ajusta padding se não tiver foto */}
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: '#1e2a5a' }}>
                    {event.nome}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: '40px' /* para evitar pulos de layout */ }}>
                    {event.descricao?.substring(0, 100)}{event.descricao?.length > 100 ? '...' : ''} {/* Limita descrição */}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'text.secondary' }}>
                    <LocationOnIcon fontSize="small" sx={{ color: '#5c6ac4' }} />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                        {event.localizacao || event.endereco || 'Local a definir'}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'text.secondary' }}>
                    <CalendarTodayIcon fontSize="small" sx={{ color: '#5c6ac4' }} />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                        {formatDateTime(eventDate)}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'text.secondary' }}>
                    <PeopleIcon fontSize="small" sx={{ color: '#5c6ac4' }} />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                        {confirmedCount || 0} Pessoas confirmadas
                    </Typography>
                </Box>


                <Button
                    fullWidth
                    variant="contained"
                    disabled={isCurrentUserConfirmed}
                    startIcon={isCurrentUserConfirmed ? <CheckCircleOutlineIcon /> : null}
                    sx={{
                        mt: 'auto',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        borderRadius: 2,
                        paddingY: 1.2,
                        bgcolor: isCurrentUserConfirmed ? '#4CAF50' : '#253b6e',
                        '&:hover': {
                            bgcolor: isCurrentUserConfirmed ? '#388E3C' : '#182794',
                        },
                        // Estilo para o botão desabilitado, se necessário
                        '&.Mui-disabled': {
                           bgcolor: isCurrentUserConfirmed ? '#4CAF50' : undefined,
                           color: isCurrentUserConfirmed ? '#ffffff' : undefined,
                           opacity: isCurrentUserConfirmed ? 0.7 : 0.5
                        }
                    }}
                    onClick={() => !isCurrentUserConfirmed && onConfirmPresence(event.id)}
                >
                    {isCurrentUserConfirmed ? 'Presença Confirmada!' : 'Confirmar Presença'}
                </Button>
            </CardContent>
        </Card>
    );
};

export default EventCard;