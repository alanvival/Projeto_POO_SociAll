using SociAll.Dominio.Eventos.Entidades;
using SociAll.Dominio.Eventos.Servicos.Interfaces;
using SociAll.Dominio.Inscricoes.Entidades;
using SociAll.Dominio.Inscricoes.Repositorios;
using SociAll.Dominio.Inscricoes.Servicos.Interfaces;
using SociAll.Dominio.Usuarios.Entidades;
using SociAll.Dominio.Usuarios.Servicos.Interfaces;

namespace SociAll.Dominio.Inscricoes.Servicos
{
    public class InscricoesServico(IInscricoesRepositorio inscricoesRepositorio, IEventosServico eventosServico, IUsuariosServico usuariosServico) : IInscricoesServico
    {
        private readonly IInscricoesRepositorio inscricoesRepositorio = inscricoesRepositorio;
        private readonly IEventosServico eventosServico = eventosServico;
        private readonly IUsuariosServico usuariosServico = usuariosServico;

        public Inscricao Inscrever(int eventoId, int usuarioId)
        {
            Evento evento = eventosServico.Validar(eventoId);

            Usuario usuario = usuariosServico.Validar(usuarioId);

            List<Usuario> usuariosInscritos = RecuperarUsuariosInscritos(eventoId);

            if (usuariosInscritos.Any(u => u.Id == usuarioId))
                throw new Exception("Usuário já está inscrito neste evento.");

            evento.SetQuantidadeInscritos(usuariosInscritos.Count + 1);

            if (evento.QuantidadeInscritos >= evento.QuantidadeMaximaInscritos)
                throw new Exception("Evento já está cheio.");

            Inscricao inscricao = new(usuario, evento);

            inscricoesRepositorio.Inserir(inscricao);

            return inscricao;
        }

        public List<Usuario> RecuperarUsuariosInscritos(int eventoId)
        {
            return inscricoesRepositorio.RecuperarUsuariosInscritos(eventoId);
        }
    }
}
