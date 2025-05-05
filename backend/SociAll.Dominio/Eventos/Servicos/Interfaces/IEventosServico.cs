using SociAll.Dominio.Eventos.Entidades;
using SociAll.Dominio.Eventos.Repositorios.Filtros;
using SociAll.Dominio.Eventos.Servicos.Comandos;
using SociAll.Dominio.Util;

namespace SociAll.Dominio.Eventos.Servicos.Interfaces
{
    public interface IEventosServico
    {
        Evento Validar(int id);
        Evento Inserir(InserirEventoComando comando);
        PaginacaoConsulta<Evento> Listar(EventosListarFiltro filtro);
    }
}
