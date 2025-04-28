using NHibernate;
using SociAll.Dominio.Usuarios.Entidades;
using SociAll.Dominio.Usuarios.Repositorios;
using SociAll.Infra.Genericos;

namespace SociAll.Infra.Usuarios.Repositorios
{
    public class UsuariosRepositorio(ISession session) : GenericosRepositorio<Usuario>(session), IUsuariosRepositorio
    {
    }
}
