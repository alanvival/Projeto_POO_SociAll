using AutoMapper;
using SociAll.Aplicacao.Transacoes.Interfaces;
using SociAll.Aplicacao.Usuarios.Servicos.Interfaces;
using SociAll.DataTransfer.Usuarios.Request;
using SociAll.DataTransfer.Usuarios.Response;
using SociAll.Dominio.Usuarios.Entidades;
using SociAll.Dominio.Usuarios.Servicos.Comandos;
using SociAll.Dominio.Usuarios.Servicos.Interfaces;

namespace SociAll.Aplicacao.Usuarios.Servicos
{
    public class UsuariosAppServico(IUsuariosServico usuariosServico, IMapper mapper, IUnitOfWork unitOfWork) : IUsuariosAppServico
    {
        private readonly IUsuariosServico usuariosServico = usuariosServico;
        private readonly IMapper mapper = mapper;
        private readonly IUnitOfWork unitOfWork = unitOfWork;

        public UsuarioResponse Inserir(UsuarioInserirRequest request)
        {
            try
            {
                UsuarioInserirComando comando = mapper.Map<UsuarioInserirComando>(request);

                unitOfWork.BeginTransaction();

                Usuario usuario = usuariosServico.Inserir(comando);

                unitOfWork.Commit();

                UsuarioResponse response = mapper.Map<UsuarioResponse>(usuario);

                return response;
            }
            catch
            {
                unitOfWork.Rollback();

                throw;
            }
        }

        public UsuarioResponse Autenticar(AutenticacaoRequest request)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Senha))
                throw new ArgumentException("Email e senha são obrigatórios.");

            Usuario usuario = usuariosServico.Autenticar(request.Email, request.Senha);

            UsuarioResponse response = mapper.Map<UsuarioResponse>(usuario);

            return response;
        }

        public UsuarioResponse Editar(int id, UsuarioEditarRequest request)
        {
            try
            {
                UsuarioEditarComando comando = mapper.Map<UsuarioEditarComando>(request);

                unitOfWork.BeginTransaction();

                Usuario usuario = usuariosServico.Editar(id, comando);

                unitOfWork.Commit();

                UsuarioResponse response = mapper.Map<UsuarioResponse>(usuario);

                return response;
            }
            catch
            {
                unitOfWork.Rollback();

                throw;
            }
        }
    }
}
