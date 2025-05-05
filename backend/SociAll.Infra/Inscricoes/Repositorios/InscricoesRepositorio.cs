using NHibernate;
using SociAll.Dominio.Genericos.Enumeradores;
using SociAll.Dominio.Inscricoes.Entidades;
using SociAll.Dominio.Inscricoes.Repositorios;
using SociAll.Dominio.Usuarios.Entidades;
using SociAll.Infra.Genericos;

namespace SociAll.Infra.Inscricoes.Repositorios
{
    public class InscricoesRepositorio(ISession session) : GenericosRepositorio<Inscricao>(session), IInscricoesRepositorio
    {
        public List<Usuario> RecuperarUsuariosInscritos(int eventoId)
        {
            return session.Query<Inscricao>().Where(x => x.Evento.Id == eventoId && x.Status == AtivoInativoEnum.Ativo).Select(x => x.Usuario).ToList();
        }
    }
}
