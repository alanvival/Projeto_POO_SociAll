using NHibernate;
using SociAll.Dominio.Preferencias.Entidades;
using SociAll.Dominio.Preferencias.Repositorios;
using SociAll.Infra.Genericos;

namespace SociAll.Infra.Preferencias.Repositorios
{
    public class PreferenciasRepositorio(ISession session) : GenericosRepositorio<Preferencia>(session), IPreferenciasRepositorio
    {

    }
}
