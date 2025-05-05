using SociAll.DataTransfer.Eventos.Response;
using SociAll.DataTransfer.Usuarios.Response;

namespace SociAll.DataTransfer.Inscricoes.Response
{
    public record InscricaoResponse(UsuarioResponse Usuario, EventoResponse Evento, DateTime DataInscricao);
}
