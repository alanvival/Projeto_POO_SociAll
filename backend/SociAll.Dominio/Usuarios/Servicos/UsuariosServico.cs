using Microsoft.AspNetCore.Identity;
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
    public class UsuariosServico(IUsuariosRepositorio usuariosRepositorio, IPreferenciasServico preferenciasServico, IPasswordHasher<Usuario> passwordHasher) : IUsuariosServico
    {
        private readonly IUsuariosRepositorio usuariosRepositorio = usuariosRepositorio;
        private readonly IPreferenciasServico preferenciasServico = preferenciasServico;
        private readonly IPasswordHasher<Usuario> passwordHasher = passwordHasher;

        public Usuario Validar(int id)
        {
            Usuario usuario = usuariosRepositorio.Recuperar(id);

            return usuario ?? throw new Exception("Usuário não encontrado.");
        }

        public Usuario Inserir(UsuarioInserirComando comando)
        {
            Usuario usuarioExistente = usuariosRepositorio.Query().FirstOrDefault(u => u.Email == comando.Email);

            if (usuarioExistente != null)
                throw new Exception("Usuário já cadastrado.");

            Usuario usuario = new(comando.Nome, comando.Email, comando.Endereco);

            usuario.SetSenha(passwordHasher.HashPassword(usuario, comando.Senha));

            foreach (string descricao in comando.DescricoesHobbies)
            {
                Hobby hobby = new(descricao, usuario);

                usuario.Hobbies.Add(hobby);
            }

            foreach (int idPreferencia in comando.IdsPreferencias)
            {
                Preferencia preferencia = preferenciasServico.Validar(idPreferencia);

                PreferenciasUsuario preferenciaUsuario = new(usuario, preferencia);

                usuario.Preferencias.Add(preferenciaUsuario);
            }

            usuariosRepositorio.Inserir(usuario);

            return usuario;
        }

        public Usuario Autenticar(string email, string senha)
        {
            string loginTratado = email.ToLower().Trim();

            Usuario usuario = usuariosRepositorio.Query().FirstOrDefault(u => u.Email == loginTratado);

            if (usuario == null || passwordHasher.VerifyHashedPassword(usuario, usuario.Senha, senha) == PasswordVerificationResult.Failed)
                throw new Exception("Usuário ou senha inválido(s).");

            return usuario;
        }
    }
}
