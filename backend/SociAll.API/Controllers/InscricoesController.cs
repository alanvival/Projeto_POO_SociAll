using Microsoft.AspNetCore.Mvc;
using SociAll.Aplicacao.Inscricoes.Servicos.Interfaces;
using SociAll.DataTransfer.Inscricoes.Request;
using SociAll.DataTransfer.Inscricoes.Response;

namespace SociAll.API.Controllers
{
    [ApiController]
    [Route("api/inscricoes")]
    public class InscricoesController(IInscricoesAppServico inscricoesAppServico) : ControllerBase
    {
        private readonly IInscricoesAppServico inscricoesAppServico = inscricoesAppServico;

        ///<summary>
        /// Inscrição de um usuário em um evento.
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ActionResult<InscricaoResponse> Inscrever([FromBody] InscricaoRequest request)
        {
            InscricaoResponse response = inscricoesAppServico.Inscrever(request);

            return Ok(response);
        }
    }
}
