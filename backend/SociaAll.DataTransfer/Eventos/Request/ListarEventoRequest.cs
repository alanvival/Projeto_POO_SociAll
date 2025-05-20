using SociAll.Dominio.Genericos.Enumeradores;
using SociAll.Dominio.Util;

namespace SociAll.DataTransfer.Eventos.Request
{
    public class ListarEventoRequest : PaginacaoFiltro
    {
        public string NomeEvento { get; set; }
        public List<int> CategoriaEventoIds { get; set; }
        public string NomeCriador { get; set; }
        public DateTime Data { get; set; }

        public ListarEventoRequest() : base(string.Empty, TipoOrdenacaoEnum.Asc) { }
    }
}
