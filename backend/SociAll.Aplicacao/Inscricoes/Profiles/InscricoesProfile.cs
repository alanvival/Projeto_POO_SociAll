using AutoMapper;
using SociAll.DataTransfer.Inscricoes.Response;
using SociAll.Dominio.Inscricoes.Entidades;

namespace SociAll.Aplicacao.Inscricoes.Profiles
{
    public class InscricoesProfile : Profile
    {
        public InscricoesProfile()
        {
            CreateMap<Inscricao, InscricaoResponse>();
        }
    }
}
