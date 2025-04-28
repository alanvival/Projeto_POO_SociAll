using SociAll.Dominio.Preferencias.Entidades;
using SociAll.Dominio.Preferencias.Repositorios;
using SociAll.Dominio.Preferencias.Servicos.Interfaces;

namespace SociAll.Dominio.Preferencias.Servicos
{
    public class PreferenciasServico : IPreferenciasServico
    {
        private readonly IPreferenciasRepositorio _preferenciasRepositorio;

        public PreferenciasServico(IPreferenciasRepositorio preferenciasRepositorio)
        {
            _preferenciasRepositorio = preferenciasRepositorio;
        }

        public Preferencia Validar(int id)
        {
            Preferencia preferencia = _preferenciasRepositorio.Recuperar(id);

            return preferencia ?? throw new Exception("Preferência não encontrada.");
        }
    }
}
