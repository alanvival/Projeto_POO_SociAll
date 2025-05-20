using NHibernate;
using SociAll.Aplicacao.Transacoes.Interfaces;

namespace SociAll.Aplicacao.Transacoes
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly ISession session;
        private ITransaction transaction;
        public UnitOfWork(ISession session)
        {
            this.session = session;
        }

        public void BeginTransaction()
        {
            this.transaction = session.BeginTransaction();
        }

        public void Commit()
        {
            if (transaction != null && transaction.IsActive)
                transaction.Commit();
        }

        public void Dispose()
        {
            if (transaction != null)
            {
                if (transaction.IsActive) transaction.Rollback();
                transaction.Dispose();
            }

            session.Dispose();
        }

        public void Rollback()
        {
            if (transaction != null && transaction.IsActive)
                transaction.Rollback();
        }
    }
}
