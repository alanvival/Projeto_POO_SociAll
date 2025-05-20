using AutoMapper;
using SociAll.Aplicacao.Eventos.Servicos.Interfaces;
using SociAll.Aplicacao.Transacoes.Interfaces;
using SociAll.DataTransfer.Eventos.Request;
using SociAll.DataTransfer.Eventos.Response;
using SociAll.Dominio.Eventos.Entidades;
using SociAll.Dominio.Eventos.Repositorios.Filtros;
using SociAll.Dominio.Eventos.Servicos.Comandos;
using SociAll.Dominio.Eventos.Servicos.Interfaces;
using SociAll.Dominio.Inscricoes.Servicos.Interfaces;
using SociAll.Dominio.Util;

namespace SociAll.Aplicacao.Eventos.Servicos
{
    public class EventosAppServico(IEventosServico eventosServico, IInscricoesServico inscricoesServico, IMapper mapper, IUnitOfWork unitOfWork) : IEventosAppServico
    {
        private readonly IEventosServico eventosServico = eventosServico;
        private readonly IInscricoesServico inscricoesServico = inscricoesServico;
        private readonly IMapper mapper = mapper;
        private readonly IUnitOfWork unitOfWork = unitOfWork;

        public EventoResponse Recuperar(int id)
        {
            Evento evento = eventosServico.Validar(id);

            int quantidadeInscritos = inscricoesServico.RecuperarUsuariosInscritos(evento.Id).Count;

            evento.SetQuantidadeInscritos(quantidadeInscritos);

            EventoResponse response = mapper.Map<EventoResponse>(evento);

            return response;
        }

        public EventoResponse Inserir(InserirEventoRequest request)
        {
            try
            {
                InserirEventoComando comando = mapper.Map<InserirEventoComando>(request);

                unitOfWork.BeginTransaction();

                Evento evento = eventosServico.Inserir(comando);

                unitOfWork.Commit();

                EventoResponse response = mapper.Map<EventoResponse>(evento);

                return response;

            }
            catch
            {
                unitOfWork.Rollback();

                throw;
            }
        }

        public async Task<PaginacaoConsulta<EventoResponse>> ListarAsync(ListarEventoRequest request,  CancellationToken cancellationToken)
        {
            EventosListarFiltro filtro = mapper.Map<EventosListarFiltro>(request);

            PaginacaoConsulta<Evento> eventos = eventosServico.Listar(filtro);

            foreach (Evento evento in eventos.Registros)
            {
                int quantidadeInscritos = inscricoesServico.RecuperarUsuariosInscritos(evento.Id).Count;

                evento.SetQuantidadeInscritos(quantidadeInscritos);
            }

            PaginacaoConsulta<EventoResponse> response = mapper.Map<PaginacaoConsulta<EventoResponse>>(eventos);

            return response;
        }
    }
}
