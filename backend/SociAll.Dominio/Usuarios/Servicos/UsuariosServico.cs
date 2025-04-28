using SociAll.Dominio.Hobbies.Entidades;
using SociAll.Dominio.Preferencias.Entidades;
using SociAll.Dominio.Preferencias.Servicos.Interfaces;
using SociAll.Dominio.PreferenciasUsuarios.Entidades;
using SociAll.Dominio.Usuarios.Entidades;
using SociAll.Dominio.Usuarios.Repositorios;
using SociAll.Dominio.Usuarios.Servicos.Comandos;
using SociAll.Dominio.Usuarios.Servicos.Interfaces;

namespace SociAll.Dominio.Usuarios.Servicos
{
    public class UsuariosServico : IUsuariosServico
    {
        private readonly IUsuariosRepositorio usuariosRepositorio;
        private readonly IPreferenciasServico preferenciasServico;

        public UsuariosServico(IUsuariosRepositorio usuariosRepositorio, IPreferenciasServico preferenciasServico)
        {
            this.usuariosRepositorio = usuariosRepositorio;
            this.preferenciasServico = preferenciasServico;
        }

        public Usuario Inserir(UsuarioInserirComando comando)
        {
            Usuario usuario = new (comando.Nome, comando.Email, comando.Senha, comando.Endereco);

            foreach (string descricao in comando.DescricoesHobbies)
            {
                Hobby hobby = new (descricao, usuario);

                usuario.Hobbies.Add(hobby);
            }

            foreach (int idPreferencia in comando.IdsPreferencias)
            {
                Preferencia preferencia = preferenciasServico.Validar(idPreferencia);

                PreferenciasUsuario preferenciaUsuario = new (usuario, preferencia);

                usuario.Preferencias.Add(preferenciaUsuario);
            }

            usuariosRepositorio.Inserir(usuario);

            return usuario;
        }

        public Usuario Validar(string email)
        {
            throw new NotImplementedException();
        }
    }
}
