using SociAll.DataTransfer.Eventos.Request;
using SociAll.DataTransfer.Eventos.Response;
using SociAll.Dominio.Util;

namespace SociAll.Aplicacao.Eventos.Servicos.Interfaces
{
    public interface IEventosAppServico
    {
        EventoResponse Recuperar(int id);
        EventoResponse Inserir(InserirEventoRequest request);
        Task<PaginacaoConsulta<EventoResponse>> ListarAsync(ListarEventoRequest request, CancellationToken cancellationToken);
        EventoResponse Editar(int id, EditarEventoRequest request);
        List<EventoResponse> ListarEventosUsuarioInscrito(int usuarioId);
        void Deletar(int id);
    }
}
