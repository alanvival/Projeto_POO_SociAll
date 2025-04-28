using FluentNHibernate.Mapping;
using SociAll.Dominio.PreferenciasUsuarios.Entidades;

namespace SociAll.Infra.PreferenciasUsuarios.Mapeamentos
{
    public class PreferenciasUsuarioMap : ClassMap<PreferenciasUsuario>
    {
        public PreferenciasUsuarioMap()
        {
            Schema("uvv_poo2_sociall");
            Table("PREFERENCIA_USUARIO");
            Id(pu => pu.Id, "ID");
            References(pu => pu.Usuario, "USUARIO_ID");
            References(pu => pu.Preferencia, "PREFERENCIA_ID");
        }
    }
}
