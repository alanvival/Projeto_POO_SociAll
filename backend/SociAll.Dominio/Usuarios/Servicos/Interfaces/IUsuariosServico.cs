using SociAll.Dominio.Usuarios.Entidades;
using SociAll.Dominio.Usuarios.Servicos.Comandos;

namespace SociAll.Dominio.Usuarios.Servicos.Interfaces
{
    public interface IUsuariosServico
    {
        Usuario Validar(int id);

        Usuario Inserir(UsuarioInserirComando comando);

        Usuario Autenticar(string email, string senha);

        Usuario Editar(int id, UsuarioEditarComando comando);
    }
}
