using Microsoft.AspNetCore.Mvc;
using SociAll.Aplicacao.Eventos.Servicos.Interfaces;
using SociAll.DataTransfer.Eventos.Request;
using SociAll.DataTransfer.Eventos.Response;
using SociAll.Dominio.Util;

namespace SociAll.API.Controllers
{
    [ApiController]
    [Route("api/eventos")]
    public class EventosController(IEventosAppServico eventosAppServico) : ControllerBase
    {
        private readonly IEventosAppServico eventosAppServico = eventosAppServico;

        ///<summary>
        /// Recuperar um evento pelo código.
        /// </summary>
        /// <returns></returns>
        [HttpGet("{id:int}")]
        public ActionResult<EventoResponse> Recuperar(int id)
        {
            EventoResponse response = eventosAppServico.Recuperar(id);

            return Ok(response);
        }

        ///<summary>
        /// Inserir um evento.
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ActionResult<EventoResponse> Inserir([FromBody] InserirEventoRequest request)
        {
            EventoResponse response = eventosAppServico.Inserir(request);

            return Ok(response);
        }

        ///<summary>
        /// Listar eventos paginados.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<PaginacaoConsulta<EventoResponse>>> Listar([FromQuery] ListarEventoRequest request, CancellationToken cancellationToken)
        {
            PaginacaoConsulta<EventoResponse> response = await eventosAppServico.ListarAsync(request, cancellationToken);

            return Ok(response);
        }
    }
}
