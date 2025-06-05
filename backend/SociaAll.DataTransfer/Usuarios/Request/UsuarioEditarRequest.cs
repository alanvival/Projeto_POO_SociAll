namespace SociAll.DataTransfer.Usuarios.Request
{
    public record UsuarioEditarRequest(string Nome, string Biografia, string Endereco, List<int> IdsPreferencias, List<string> LugaresFavoritos);
}
