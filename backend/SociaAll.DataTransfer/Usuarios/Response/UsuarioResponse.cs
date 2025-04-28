using SociAll.DataTransfer.Hobbies.Response;
using SociAll.DataTransfer.PreferenciasUsuarios.Response;

namespace SociAll.DataTransfer.Usuarios.Response
{
    public record UsuarioResponse (int Id, string Nome, string Email, string Endereco, List<HobbyResponse> Hobbies, List<PreferenciasUsuarioResponse> Preferencias);
}
