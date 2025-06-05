using SociAll.Dominio.Hobbies.Entidades;
using SociAll.Dominio.PreferenciasUsuarios.Entidades;

namespace SociAll.Dominio.Usuarios.Entidades
{
    public class Usuario
    {
        public virtual int Id { get; protected set; }
        public virtual string Nome { get; protected set; }
        public virtual string Email { get; protected set; }
        public virtual string Senha { get; protected set; }
        public virtual string Biografia { get; protected set; }
        public virtual string Endereco { get; protected set; }
        public virtual IList<Hobby> Hobbies { get; set; } = [];
        public virtual IList<PreferenciasUsuario> Preferencias { get; set; } = [];
        public virtual IList<LugarFavorito> LugaresFavoritos { get; set; } = [];

        protected Usuario() { }

        public Usuario(string nome, string email, string endereco)
        {
            SetNome(nome);
            SetEmail(email);
            SetEndereco(endereco);
        }

        public virtual void SetNome(string nome) => Nome = nome;
        public virtual void SetEmail(string email) => Email = email;
        public virtual void SetSenha(string senha) => Senha = senha;
        public virtual void SetBiografia(string biografia) => Biografia = biografia;
        public virtual void SetEndereco(string endereco) => Endereco = endereco;
    }
}
