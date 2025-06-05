using FluentNHibernate.Mapping;
using SociAll.Dominio.Usuarios.Entidades;

namespace SociAll.Infra.Usuarios.Mapeamentos
{
    public class LugarFavoritoMap : ClassMap<LugarFavorito>
    {
        public LugarFavoritoMap()
        {
            Schema("uvv_poo2_sociall");
            Table("LUGARFAVORITO_USUARIO");
            Id(lf => lf.Id, "ID");
            Map(lf => lf.Nome, "NOME");
            References(lf => lf.Usuario, "USUARIO_ID");
        }
    }
}
