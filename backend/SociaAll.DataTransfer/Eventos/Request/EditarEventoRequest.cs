namespace SociAll.DataTransfer.Eventos.Request
{
    public record EditarEventoRequest(string Nome, DateTime Data, string Descricao, string Foto, string Endereco);
}
