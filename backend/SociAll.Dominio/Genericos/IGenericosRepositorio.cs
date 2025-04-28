using SociAll.Dominio.Genericos.Enumeradores;
using SociAll.Dominio.Util;

namespace SociAll.Dominio.Genericos
{
    public interface IGenericosRepositorio<T> where T : class
    {
        T Recuperar(int codigo);

        T Inserir(T entidade);

        T Editar(T entidade);

        void Excluir(T entidade);

        PaginacaoConsulta<T> Listar(IQueryable<T> query, int qt, int pg, string cpOrd, TipoOrdenacaoEnum tpOrd);

        IQueryable<T> Query();
    }
}
