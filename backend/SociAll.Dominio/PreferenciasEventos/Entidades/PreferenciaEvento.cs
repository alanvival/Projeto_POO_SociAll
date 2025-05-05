using SociAll.Dominio.Eventos.Entidades;
using SociAll.Dominio.Preferencias.Entidades;

namespace SociAll.Dominio.PreferenciasEventos.Entidades
{
    public class PreferenciaEvento
    {
        public virtual int Id { get; protected set; }
        public virtual Evento Evento { get; protected set; }
        public virtual Preferencia Preferencia { get; protected set; }

        protected PreferenciaEvento() { }

        public PreferenciaEvento(Evento evento, Preferencia preferencia)
        {
            Evento = evento;
            Preferencia = preferencia;
        }
    }
}
