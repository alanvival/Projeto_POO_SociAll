using NHibernate;
using SociAll.Dominio.Eventos.Entidades;
using SociAll.Dominio.Genericos.Enumeradores;
using SociAll.Dominio.Inscricoes.Entidades;
using SociAll.Dominio.Inscricoes.Repositorios;
using SociAll.Dominio.Usuarios.Entidades;
using SociAll.Dominio.Util;
using SociAll.Infra.Genericos;

namespace SociAll.Infra.Inscricoes.Repositorios
{
    public class InscricoesRepositorio(ISession session) : GenericosRepositorio<Inscricao>(session), IInscricoesRepositorio
    {
        public List<Usuario> RecuperarUsuariosInscritos(int eventoId)
        {
            return session.Query<Inscricao>().Where(x => x.Evento.Id == eventoId && x.Status == AtivoInativoEnum.Ativo).Select(x => x.Usuario).ToList();
        }

        public List<Inscricao> RecuperarInscricoesUsuario(int idUsuario)
        {
            IQueryable<Inscricao> query = Query();

            query = query.Where(x => x.Status == AtivoInativoEnum.Ativo &&  x.Usuario.Id == idUsuario);

            PaginacaoConsulta<Inscricao> eventos = Listar(query, 100, 1, "", TipoOrdenacaoEnum.Asc);

            return eventos.Registros.ToList();
        }
    }
}
