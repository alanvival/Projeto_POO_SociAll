using SociAll.Dominio.Genericos.Enumeradores;
using SociAll.Dominio.PreferenciasEventos.Entidades;
using SociAll.Dominio.Usuarios.Entidades;

namespace SociAll.Dominio.Eventos.Entidades
{
    public class Evento
    {
        public virtual int Id { get; protected set; }
        public virtual Usuario Usuario { get; protected set; }
        public virtual string Nome { get; protected set; }
        public virtual DateTime Data { get; set; }
        public virtual string Descricao { get; protected set; }
        public virtual AtivoInativoEnum Status { get; protected set; }
        public virtual string Foto { get; protected set; }
        public virtual string Endereco { get; protected set; }
        public virtual int QuantidadeInscritos { get; protected set; }
        public virtual int QuantidadeMaximaInscritos { get; protected set; }
        public virtual IList<PreferenciaEvento> CategoriasEvento { get; set; } = [];

        protected Evento() { }

        public Evento(Usuario usuario, string nome, DateTime data, string descricao, string foto, string endereco, int quantidadeMaxima)
        {
            SetUsuario(usuario);
            SetNome(nome);
            SetData(data);
            SetDescricao(descricao);
            SetStatus(AtivoInativoEnum.Ativo);
            SetFoto(foto);
            SetEndereco(endereco);
            SetQuantidadeMaximaInscritos(quantidadeMaxima);
        }

        public virtual void SetUsuario(Usuario usuario) => Usuario = usuario;
        public virtual void SetNome(string nome) => Nome = nome;
        public virtual void SetData(DateTime data) => Data = data;
        public virtual void SetDescricao(string descricao) => Descricao = descricao;
        public virtual void SetStatus(AtivoInativoEnum status) => Status = status;
        public virtual void SetFoto(string foto) => Foto = foto;
        public virtual void SetEndereco(string endereco) => Endereco = endereco;
        public virtual void SetQuantidadeInscritos(int quantidadeInscritos) => QuantidadeInscritos = quantidadeInscritos;
        public virtual void SetQuantidadeMaximaInscritos(int quantidadeMaxima) => QuantidadeMaximaInscritos = quantidadeMaxima;
    }
}
