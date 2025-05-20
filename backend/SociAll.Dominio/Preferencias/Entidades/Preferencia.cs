using SociAll.Dominio.Usuarios.Entidades;

namespace SociAll.Dominio.Preferencias.Entidades
{
    public class Preferencia
    {
        public virtual int Id { get; protected set; }
        public virtual string Descricao { get; protected set; }

        protected Preferencia() { }

        public Preferencia(string descricao)
        {
            SetDescricao(descricao);
        }

        public virtual void SetDescricao(string descricao) => Descricao = descricao;
    }
}
