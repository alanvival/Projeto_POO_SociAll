using FluentNHibernate.Mapping;
using SociAll.Dominio.Preferencias.Entidades;

namespace SociAll.Infra.Preferencias.Mapeamentos
{
    public class PreferenciaMap : ClassMap<Preferencia>
    {
        public PreferenciaMap()
        {
            Schema("uvv_poo2_sociall");
            Table("PREFERENCIA_TIPO");
            Id(x => x.Id, "ID");
            Map(x => x.Descricao, "DESCRICAO");
        }
    }
}
