using SociAll.Dominio.Genericos.Enumeradores;

namespace SociAll.Dominio.Util
{
    public class PaginacaoFiltro
    {
        private int qt;
        public int Qt
        {
            get => qt;
            set => qt = (value < 100 ? value : 100);
        }

        private int pg;
        public int Pg
        {
            get => pg;
            set => pg = (value < 1 ? 1 : value);
        }

        public TipoOrdenacaoEnum TpOrd { get; set; }
        public string CpOrd { get; set; }

        public PaginacaoFiltro() : this(string.Empty, TipoOrdenacaoEnum.Asc) { }

        public PaginacaoFiltro(string cpOrd, TipoOrdenacaoEnum tpOrd)
        {
            Qt = 10;
            Pg = 1;
            CpOrd = cpOrd?.Trim() ?? string.Empty;
            TpOrd = tpOrd;
        }

        public string ObterSqlOrdenacao()
        {
            if (string.IsNullOrWhiteSpace(CpOrd))
                return string.Empty;

            return $" ORDER BY {CpOrd} {TpOrd}";
        }
    }
}
