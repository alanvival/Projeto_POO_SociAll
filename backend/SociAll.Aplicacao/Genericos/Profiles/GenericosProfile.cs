using AutoMapper;
using SociAll.Dominio.Util;

namespace SociAll.Aplicacao.Genericos.Profiles
{
    public class GenericosProfile : Profile
    {
        public GenericosProfile()
        {
            CreateMap(typeof(PaginacaoConsulta<>), typeof(PaginacaoConsulta<>));
        }
    }
}
