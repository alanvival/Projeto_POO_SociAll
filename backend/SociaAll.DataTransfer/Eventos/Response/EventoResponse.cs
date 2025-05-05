using SociAll.DataTransfer.Usuarios.Response;
using SociAll.Dominio.Genericos.Enumeradores;

namespace SociAll.DataTransfer.Eventos.Response
{
    public record EventoResponse(int Id, UsuarioResponse Usuario, string Nome, DateTime Data, string Descricao, AtivoInativoEnum Status, string Foto, string Endereco,
       int QuantidadeMaximaInscritos, int QuantidadeInscritos, List<PreferenciaEventoResponse> CategoriasEvento);
}
