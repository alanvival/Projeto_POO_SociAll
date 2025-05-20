using SociAll.Dominio.Inscricoes.Entidades;
using SociAll.Dominio.Usuarios.Entidades;

namespace SociAll.Dominio.Inscricoes.Servicos.Interfaces
{
    public interface IInscricoesServico
    {
        Inscricao Inscrever(int eventoId, int usuarioId);
        List<Usuario> RecuperarUsuariosInscritos(int eventoId);
    }
}
