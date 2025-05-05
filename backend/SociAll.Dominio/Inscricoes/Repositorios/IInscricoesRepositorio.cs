using SociAll.Dominio.Genericos;
using SociAll.Dominio.Inscricoes.Entidades;
using SociAll.Dominio.Usuarios.Entidades;

namespace SociAll.Dominio.Inscricoes.Repositorios
{
    public interface IInscricoesRepositorio : IGenericosRepositorio<Inscricao>
    {
        List<Usuario> RecuperarUsuariosInscritos(int eventoId);
    }
}
