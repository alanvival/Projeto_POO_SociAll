namespace SociAll.DataTransfer.Usuarios.Request
{
    public record UsuarioInserirRequest(string Nome, string Email, string Senha, string Endereco, 
        List<string> DescricoesHobbies, List<int> IdsPreferencias);
}
