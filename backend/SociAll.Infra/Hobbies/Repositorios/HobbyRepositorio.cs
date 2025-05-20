using NHibernate;
using SociAll.Dominio.Hobbies.Entidades;
using SociAll.Dominio.Hobbies.Repositorios;
using SociAll.Infra.Genericos;

namespace SociAll.Infra.Hobbies.Repositorios
{
    public class HobbyRepositorio(ISession session) : GenericosRepositorio<Hobby>(session), IHobbiesRepositorio
    {
    }
}
