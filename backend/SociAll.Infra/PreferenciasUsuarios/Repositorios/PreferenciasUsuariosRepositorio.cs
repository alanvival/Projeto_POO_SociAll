using NHibernate;
using SociAll.Dominio.PreferenciasUsuarios.Entidades;
using SociAll.Dominio.PreferenciasUsuarios.Repositorios;
using SociAll.Infra.Genericos;

namespace SociAll.Infra.PreferenciasUsuarios.Repositorios
{
    public class PreferenciasUsuariosRepositorio(ISession session) : GenericosRepositorio<PreferenciasUsuario>(session), IPreferenciasUsuariosRepositorio
    {

    }
}
