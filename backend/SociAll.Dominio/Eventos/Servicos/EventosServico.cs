using SociAll.Dominio.Eventos.Entidades;
using SociAll.Dominio.Eventos.Repositorios;
using SociAll.Dominio.Eventos.Repositorios.Filtros;
using SociAll.Dominio.Eventos.Servicos.Comandos;
using SociAll.Dominio.Eventos.Servicos.Interfaces;
using SociAll.Dominio.Preferencias.Entidades;
using SociAll.Dominio.Preferencias.Servicos.Interfaces;
using SociAll.Dominio.PreferenciasEventos.Entidades;
using SociAll.Dominio.Usuarios.Entidades;
using SociAll.Dominio.Usuarios.Servicos.Interfaces;
using SociAll.Dominio.Util;

namespace SociAll.Dominio.Eventos.Servicos
{
    public class EventosServico(IEventosRepositorio eventosRepositorio, IUsuariosServico usuariosServico, IPreferenciasServico preferenciasServico) : IEventosServico
    {
        private readonly IEventosRepositorio eventosRepositorio = eventosRepositorio;
        private readonly IUsuariosServico usuariosServico = usuariosServico;
        private readonly IPreferenciasServico preferenciasServico = preferenciasServico;

        public Evento Validar(int id)
        {
            Evento evento = eventosRepositorio.Recuperar(id);

            return evento ?? throw new Exception("Evento não encontrado.");
        }

        public Evento Inserir(InserirEventoComando comando)
        {
            Usuario usuario = usuariosServico.Validar(comando.UsuarioId);

            Evento evento = new(usuario,comando.Nome, comando.Data, comando.Descricao, comando.Foto, comando.Endereco, comando.QuantidadeMaximaInscritos);

            foreach (int preferenciaId in comando.PreferenciasId)
            {
                Preferencia preferencia = preferenciasServico.Validar(preferenciaId);

                evento.CategoriasEvento.Add(new PreferenciaEvento(evento, preferencia));
            }

            eventosRepositorio.Inserir(evento);

            return evento;
        }

        public PaginacaoConsulta<Evento> Listar(EventosListarFiltro filtro)
        {
            return eventosRepositorio.ListarEventos(filtro);
        }
    }
}
