using SociAll.Dominio.Eventos.Entidades;
using SociAll.Dominio.Genericos.Enumeradores;
using SociAll.Dominio.Usuarios.Entidades;

namespace SociAll.Dominio.Inscricoes.Entidades
{
    public class Inscricao
    {
        public virtual Usuario Usuario { get; protected set; }
        public virtual Evento Evento { get; protected set; }
        public virtual DateTime DataInscricao { get; protected set; }
        public virtual AtivoInativoEnum Status { get; protected set; }

        protected Inscricao() { }

        public Inscricao(Usuario usuario, Evento evento)
        {
            SetUsuario(usuario);
            SetEvento(evento);
            SetDataInscricao(DateTime.UtcNow);
            SetStatus(AtivoInativoEnum.Ativo);
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(this, obj)) return true;
            if (obj is not Inscricao other) return false;
            return Usuario?.Id == other.Usuario?.Id && Evento?.Id == other.Evento?.Id;
        }

        public override int GetHashCode()
        {
            unchecked
            {
                int hash = 17;
                hash = hash * 23 + (Usuario?.Id ?? 0).GetHashCode();
                hash = hash * 23 + (Evento?.Id ?? 0).GetHashCode();
                return hash;
            }
        }

        public virtual void SetUsuario(Usuario usuario) => Usuario = usuario;
        public virtual void SetEvento(Evento evento) => Evento = evento;
        public virtual void SetDataInscricao(DateTime dataInscricao) => DataInscricao = dataInscricao;
        public virtual void SetStatus(AtivoInativoEnum status) => Status = status;
    }
}
