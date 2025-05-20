using FluentNHibernate.Mapping;
using SociAll.Dominio.Usuarios.Entidades;

namespace SociAll.Infra.Usuarios.Mapeamentos
{
    public class UsuarioMap : ClassMap<Usuario>
    {
        public UsuarioMap()
        {
            Schema("uvv_poo2_sociall");
            Table("USUARIO");
            Id(u => u.Id, "ID");
            Map(u => u.Nome, "NOME");
            Map(u => u.Email, "EMAIL");
            Map(u => u.Senha, "SENHA");
            Map(u => u.Endereco, "ENDERECO");

            HasMany(u => u.Hobbies).KeyColumn("USUARIO_ID").Cascade.AllDeleteOrphan();
            HasMany(u => u.Preferencias).KeyColumn("USUARIO_ID").Cascade.AllDeleteOrphan();
        }
    }
}
