namespace SociAll.DataTransfer.Eventos.Request
{
    public record InserirEventoRequest(int UsuarioId, string Nome, DateTime Data, string Descricao, string Foto, string Endereco, int QuantidadeMaximaInscritos,
        List<int> PreferenciasId);
}
