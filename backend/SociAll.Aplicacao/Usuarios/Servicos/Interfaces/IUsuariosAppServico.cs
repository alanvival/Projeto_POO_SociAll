using SociAll.DataTransfer.Usuarios.Request;
using SociAll.DataTransfer.Usuarios.Response;

namespace SociAll.Aplicacao.Usuarios.Servicos.Interfaces
{
    public interface IUsuariosAppServico
    {
        UsuarioResponse Inserir(UsuarioInserirRequest request);
        UsuarioResponse Autenticar(AutenticacaoRequest request);
        UsuarioResponse Editar(int id, UsuarioEditarRequest request);
    }
}
