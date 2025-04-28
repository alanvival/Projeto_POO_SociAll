using Microsoft.AspNetCore.Mvc;
using SociAll.Aplicacao.Usuarios.Servicos.Interfaces;
using SociAll.DataTransfer.Usuarios.Request;
using SociAll.DataTransfer.Usuarios.Response;

namespace SociAll.API.Controllers
{
    [ApiController]
    [Route("api/usuarios")]
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuariosAppServico usuariosAppServico;

        public UsuariosController(IUsuariosAppServico usuariosAppServico)
        {
            this.usuariosAppServico = usuariosAppServico;
        }

        ///<summary>
        /// Cadastrar um usuário.
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ActionResult<UsuarioResponse> Inserir([FromBody] UsuarioInserirRequest request)
        {
            UsuarioResponse response = usuariosAppServico.Inserir(request);

            return Ok(response);
        }

        ///<summary>
        /// Autenticar usuário.
        /// </summary>
        /// <returns></returns>
        [HttpPost("autenticar")]
        public ActionResult<UsuarioResponse> Autenticar([FromBody] AutenticacaoRequest request)
        {
            UsuarioResponse response = usuariosAppServico.Autenticar(request);

            return Ok(response);
        }
    }
}
