using SociAll.Dominio.Preferencias.Entidades;
using SociAll.Dominio.Usuarios.Entidades;

namespace SociAll.Dominio.PreferenciasUsuarios.Entidades
{
    public class PreferenciasUsuario
    {
        public virtual int Id { get; protected set; }
        public virtual Usuario Usuario { get; set; }
        public virtual Preferencia Preferencia { get; set; }

        protected PreferenciasUsuario()
        {
            
        }

        public PreferenciasUsuario(Usuario usuario, Preferencia preferencia)
        {
            SetUsuario(usuario);
            SetPreferencia(preferencia);
        }

        public virtual void SetUsuario(Usuario usuario) => Usuario = usuario;
        public virtual void SetPreferencia(Preferencia preferencia) => Preferencia = preferencia;
    }
}
