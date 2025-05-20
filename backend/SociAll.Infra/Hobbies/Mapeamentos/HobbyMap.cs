using FluentNHibernate.Mapping;
using SociAll.Dominio.Hobbies.Entidades;

namespace SociAll.Infra.Hobbies.Mapeamentos
{
    public class HobbyMap : ClassMap<Hobby>
    {
        public HobbyMap()
        {
            Schema("uvv_poo2_sociall");
            Table("HOBBIE_USUARIO");
            Id(h => h.Id, "ID");
            Map(h => h.Descricao, "DESCRICAO");
            References(h => h.Usuario, "USUARIO_ID");
        }
    }
}
