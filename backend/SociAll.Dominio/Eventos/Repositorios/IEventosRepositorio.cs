using SociAll.Dominio.Eventos.Entidades;
using SociAll.Dominio.Eventos.Repositorios.Filtros;
using SociAll.Dominio.Genericos;
using SociAll.Dominio.Util;

namespace SociAll.Dominio.Eventos.Repositorios
{
    public interface IEventosRepositorio: IGenericosRepositorio<Evento>
    {
        PaginacaoConsulta<Evento> ListarEventos(EventosListarFiltro filtro);
    }
}
