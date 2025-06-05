namespace SociAll.Dominio.Usuarios.Entidades
{
    public class LugarFavorito
    {
        public virtual int Id { get;  protected set; }
        public virtual string Nome { get;  protected set; }
        public virtual Usuario Usuario { get; protected set; }

        public LugarFavorito() { }

        public LugarFavorito(string nome, Usuario usuario)
        {
            Nome = nome;
            Usuario = usuario;
        }
    }
}
