namespace SociAll.Dominio.Eventos.Servicos.Comandos
{
    public class InserirEventoComando
    {
        public int UsuarioId { get; set; }
        public string Nome { get; set; }
        public DateTime Data { get; set; }
        public string Descricao { get; set; }
        public string Foto { get; set; }
        public string Endereco { get; set; }
        public int QuantidadeMaximaInscritos { get; set; }
        public List<int> PreferenciasId { get; set; }
    }
}
