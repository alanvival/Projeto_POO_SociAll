namespace SociAll.Dominio.Usuarios.Servicos.Comandos
{
    public class UsuarioEditarComando
    {
        public string Nome { get; set; }
        public string Biografia { get; set; }
        public string Endereco { get; set; }
        public List<int> IdsPreferencias { get; set; }
        public List<string> LugaresFavoritos { get; set; }
    }
}
