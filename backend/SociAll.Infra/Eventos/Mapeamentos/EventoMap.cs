using FluentNHibernate.Mapping;
using NHibernate.Type;
using SociAll.Dominio.Eventos.Entidades;
using SociAll.Dominio.Genericos.Enumeradores;

namespace SociAll.Infra.Eventos.Mapeamentos
{
    public class EventoMap:  ClassMap<Evento>
    {
        public EventoMap()
        {
            Schema("uvv_poo2_sociall");
            Table("EVENTO");
            Id(e => e.Id, "ID");
            References(e => e.Usuario, "USUARIO_ID");
            Map(e => e.Nome, "NOME");
            Map(e => e.Data, "DATA");
            Map(e => e.Descricao, "DESCRICAO");
            Map(e => e.Status).CustomType<EnumType<AtivoInativoEnum>>();
            Map(e => e.Foto, "FOTO");
            Map(e => e.Endereco, "ENDERECO");
            Map(e => e.QuantidadeMaximaInscritos, "MAXIMO_INSCRITOS");

            HasMany(e => e.CategoriasEvento).KeyColumn("EVENTO_ID").Cascade.AllDeleteOrphan();
        }
    }
}
