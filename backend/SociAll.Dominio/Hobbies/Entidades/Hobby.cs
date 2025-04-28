using SociAll.Dominio.Usuarios.Entidades;

namespace SociAll.Dominio.Hobbies.Entidades
{
    public class Hobby
    {
        public virtual int Id { get; protected set; }
        public virtual string Descricao { get; protected set; }
        public virtual Usuario Usuario { get; protected set; }

        protected Hobby() { }

        public Hobby(string descricao, Usuario usuario)
        {
            SetDescricao(descricao);
            SetUsuario(usuario);
        }

        public virtual void SetDescricao(string descricao) => Descricao = descricao;
        public virtual void SetUsuario(Usuario usuario) => Usuario = usuario;
    }
}
