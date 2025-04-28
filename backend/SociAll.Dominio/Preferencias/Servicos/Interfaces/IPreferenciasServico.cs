using SociAll.Dominio.Preferencias.Entidades;

namespace SociAll.Dominio.Preferencias.Servicos.Interfaces
{
    public interface IPreferenciasServico
    {
        Preferencia Validar(int id);
    }
}
