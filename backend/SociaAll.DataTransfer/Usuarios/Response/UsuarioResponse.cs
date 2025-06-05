using SociAll.DataTransfer.Hobbies.Response;

namespace SociAll.DataTransfer.Usuarios.Response
{
    public record UsuarioResponse (int Id, string Nome, string Email, string Biografia, string Endereco, List<HobbyResponse> Hobbies, 
        List<PreferenciaUsuarioResponse> Preferencias, List<LugarFavoritoResponse> LugaresFavoritos);
}
