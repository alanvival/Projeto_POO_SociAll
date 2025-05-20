using NHibernate;
using SociAll.Dominio.Genericos;
using SociAll.Dominio.Genericos.Enumeradores;
using SociAll.Dominio.Util;
using System.Linq.Dynamic.Core;
using System.Linq.Dynamic.Core.Exceptions;

namespace SociAll.Infra.Genericos
{
    public class GenericosRepositorio<T> :  IGenericosRepositorio<T> where T : class
    {
        private readonly ISession session;

        public GenericosRepositorio(ISession session)
        {
            this.session = session;
        }

        public T Editar(T entidade)
        {
            session.Update(entidade);
            return entidade;
        }

        public void Excluir(T entidade)
        {
            session.Delete(entidade);

        }

        public T Inserir(T entidade)
        {
            session.Save(entidade);
            return entidade;
        }

        public PaginacaoConsulta<T> Listar(IQueryable<T> query, int qt, int pg, string cpOrd, TipoOrdenacaoEnum tpOrd)
        {
            try
            {
                if (!string.IsNullOrWhiteSpace(cpOrd))
                {
                    string ordenacao = $"{cpOrd} {tpOrd}";

                    query = query.OrderBy(ordenacao);
                }

                return Paginar(query, qt, pg);
            }
            catch (ParseException ex)
            {
                throw new ArgumentException($"Campo de ordenação inválido: '{cpOrd}'.", nameof(cpOrd), ex);
            }
        }

        private static PaginacaoConsulta<T> Paginar(IQueryable<T> query, int qt, int pg)
        {
            return new PaginacaoConsulta<T>
            {
                Registros = query.Skip((pg - 1) * qt).Take(qt).ToList(),
                Total = query.LongCount()
            };
        }

        public IQueryable<T> Query()
        {
            return session.Query<T>();
        }

        public T Recuperar(int id)
        {
            return session.Get<T>(id);
        }
    }
}
