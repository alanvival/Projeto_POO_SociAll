using FluentNHibernate.Mapping;
using NHibernate.Type;
using SociAll.Dominio.Genericos.Enumeradores;
using SociAll.Dominio.Inscricoes.Entidades;

namespace SociAll.Infra.Inscricoes.Mapeamentos
{
    public class InscricaoMap : ClassMap<Inscricao>
    {
        public InscricaoMap()
        {
            Schema("uvv_poo2_sociall");
            Table("INSCRICAO");
            CompositeId().KeyReference(x => x.Usuario, "USUARIO_ID")
                         .KeyReference(x => x.Evento, "EVENTO_ID");
            Map(x => x.DataInscricao, "DATA_INSCRICAO");
            Map(x => x.Status, "STATUS").CustomType<EnumType<AtivoInativoEnum>>();
            LazyLoad();
        }
    }
}
