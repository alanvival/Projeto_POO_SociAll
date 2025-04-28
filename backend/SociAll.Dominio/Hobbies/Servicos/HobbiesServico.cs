using SociAll.Dominio.Hobbies.Entidades;
using SociAll.Dominio.Hobbies.Repositorios;
using SociAll.Dominio.Hobbies.Servicos.Entidades;
using SociAll.Dominio.Usuarios.Entidades;

namespace SociAll.Dominio.Hobbies.Servicos
{
    public class HobbiesServico : IHobbiesServico
    {
        private readonly IHobbiesRepositorio _hobbiesRepositorio;

        public Hobby Inserir(string descricao, Usuario usuario)
        {
            throw new NotImplementedException();
        }
    }
}
