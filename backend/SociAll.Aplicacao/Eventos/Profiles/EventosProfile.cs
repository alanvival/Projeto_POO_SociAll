using AutoMapper;
using SociAll.DataTransfer.Eventos.Request;
using SociAll.DataTransfer.Eventos.Response;
using SociAll.Dominio.Eventos.Entidades;
using SociAll.Dominio.Eventos.Repositorios.Filtros;
using SociAll.Dominio.Eventos.Servicos.Comandos;
using SociAll.Dominio.PreferenciasEventos.Entidades;

namespace SociAll.Aplicacao.Eventos.Profiles
{
    public class EventosProfile : Profile
    {
        public EventosProfile()
        {
            CreateMap<Evento, EventoResponse>();

            CreateMap<InserirEventoRequest, InserirEventoComando>();

            CreateMap<PreferenciaEvento, PreferenciaEventoResponse>();

            CreateMap<ListarEventoRequest, EventosListarFiltro>();
        }
    }
}
