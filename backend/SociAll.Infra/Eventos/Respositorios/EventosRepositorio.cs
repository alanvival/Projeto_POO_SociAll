using NHibernate;
using SociAll.Dominio.Eventos.Entidades;
using SociAll.Dominio.Eventos.Repositorios;
using SociAll.Dominio.Eventos.Repositorios.Filtros;
using SociAll.Dominio.Genericos.Enumeradores;
using SociAll.Dominio.Util;
using SociAll.Infra.Genericos;

namespace SociAll.Infra.Eventos.Respositorios
{
    public class EventosRepositorio(ISession session) : GenericosRepositorio<Evento>(session), IEventosRepositorio
    {
        public PaginacaoConsulta<Evento> ListarEventos(EventosListarFiltro filtro)
        {
            IQueryable<Evento> query = Query();

            query = query.Where(x => x.Status == AtivoInativoEnum.Ativo);

            if (!string.IsNullOrEmpty(filtro.NomeEvento))
                query = query.Where(x => x.Nome.Contains(filtro.NomeEvento));

            if (filtro.CategoriaEventoIds != null && filtro.CategoriaEventoIds.Count > 0)
                query = query.Where(x => x.CategoriasEvento.Any(y => filtro.CategoriaEventoIds.Contains(y.Preferencia.Id)));

            if (!string.IsNullOrEmpty(filtro.NomeCriador))
                query = query.Where(x => x.Usuario.Nome.Contains(filtro.NomeCriador));

            if (filtro.Data != DateTime.MinValue)
                query = query.Where(x => x.Data.Date == filtro.Data.Date);

            if (filtro.IdUsuario != null && filtro.IdUsuario > 0)
                query =  query.Where(query => query.Usuario.Id == filtro.IdUsuario);

            PaginacaoConsulta<Evento> eventos = Listar(query, filtro.Qt, filtro.Pg, filtro.CpOrd, filtro.TpOrd);

            return eventos;
        }
    }
}
