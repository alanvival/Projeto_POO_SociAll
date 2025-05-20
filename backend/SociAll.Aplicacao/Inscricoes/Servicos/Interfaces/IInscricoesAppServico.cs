using SociAll.DataTransfer.Inscricoes.Request;
using SociAll.DataTransfer.Inscricoes.Response;

namespace SociAll.Aplicacao.Inscricoes.Servicos.Interfaces
{
    public interface IInscricoesAppServico
    {
        InscricaoResponse Inscrever(InscricaoRequest request);
    }
}
