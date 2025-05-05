using FluentNHibernate.Mapping;
using SociAll.Dominio.PreferenciasEventos.Entidades;

namespace SociAll.Infra.PreferenciasEventos.Mapeamentos
{
    public class PreferenciaEventoMap : ClassMap<PreferenciaEvento>
    {
        public PreferenciaEventoMap()
        {
            Schema("uvv_poo2_sociall");
            Table("PREFERENCIA_EVENTO");
            Id(pe => pe.Id, "ID");
            References(pe => pe.Evento, "EVENTO_ID").Not.Nullable();
            References(pe => pe.Preferencia, "PREFERENCIA_ID").Not.Nullable();
        }
    }
}
