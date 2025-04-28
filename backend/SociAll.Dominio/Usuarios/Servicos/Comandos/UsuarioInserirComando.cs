using SociAll.Dominio.Hobbies.Entidades;
using SociAll.Dominio.PreferenciasUsuarios.Entidades;

namespace SociAll.Dominio.Usuarios.Servicos.Comandos
{
    public class UsuarioInserirComando
    {
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string Endereco { get; set; }
        public List<string> DescricoesHobbies { get; set; }
        public List<int> IdsPreferencias { get; set; }
    }
}
