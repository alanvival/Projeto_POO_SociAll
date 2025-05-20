using SociAll.Dominio.Hobbies.Entidades;
using SociAll.Dominio.Usuarios.Entidades;

namespace SociAll.Dominio.Hobbies.Servicos.Entidades
{
    public interface IHobbiesServico
    {
        Hobby Inserir(string descricao, Usuario usuario);
    }
}
