using AutoMapper;
using SociAll.Aplicacao.Inscricoes.Servicos.Interfaces;
using SociAll.Aplicacao.Transacoes.Interfaces;
using SociAll.DataTransfer.Inscricoes.Request;
using SociAll.DataTransfer.Inscricoes.Response;
using SociAll.Dominio.Inscricoes.Entidades;
using SociAll.Dominio.Inscricoes.Servicos.Interfaces;

namespace SociAll.Aplicacao.Inscricoes.Servicos
{
    public class InscricoesAppServico(IInscricoesServico inscricoesServico, IUnitOfWork unitOfWork, IMapper mapper) : IInscricoesAppServico
    {
        private readonly IInscricoesServico inscricoesServico = inscricoesServico;
        private readonly IUnitOfWork unitOfWork = unitOfWork;
        private readonly IMapper mapper = mapper;

        public InscricaoResponse Inscrever(InscricaoRequest request)
        {
            try
            {
                unitOfWork.BeginTransaction();

                Inscricao inscricao = inscricoesServico.Inscrever(request.EventoId, request.UsuarioId);

                unitOfWork.Commit();

                InscricaoResponse response = mapper.Map<InscricaoResponse>(inscricao);

                return response;
            }
            catch (Exception ex)
            {
                unitOfWork.Rollback();

                throw new Exception("Não foi possível se inscrever no evento", ex);
            }
        }

        public void CancelarInscricao(int eventoId, int usuarioId)
        {
            try
            {
                unitOfWork.BeginTransaction();

                inscricoesServico.CancelarInscricao(eventoId, usuarioId);

                unitOfWork.Commit();
            }
            catch
            {
                unitOfWork.Rollback();
            }
        }
    }
}
