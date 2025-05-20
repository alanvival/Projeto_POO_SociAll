using SociAll.Dominio.Genericos.Enumeradores;
using SociAll.Dominio.Util;

namespace SociAll.Dominio.Eventos.Repositorios.Filtros
{
    public class EventosListarFiltro(string cpOrd, TipoOrdenacaoEnum tpOrd) : PaginacaoFiltro(cpOrd, tpOrd)
    {
        public string NomeEvento { get; set; }
        public List<int> CategoriaEventoIds { get; set; }
        public string NomeCriador { get; set; }
        public DateTime Data { get; set; }
    }
}
