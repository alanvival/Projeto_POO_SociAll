﻿using AutoMapper;
using SociAll.DataTransfer.Hobbies.Response;
using SociAll.DataTransfer.Preferencias.Response;
using SociAll.DataTransfer.Usuarios.Request;
using SociAll.DataTransfer.Usuarios.Response;
using SociAll.Dominio.Hobbies.Entidades;
using SociAll.Dominio.Preferencias.Entidades;
using SociAll.Dominio.PreferenciasUsuarios.Entidades;
using SociAll.Dominio.Usuarios.Entidades;
using SociAll.Dominio.Usuarios.Servicos.Comandos;

namespace SociAll.Aplicacao.Usuarios.Profiles
{
    public class UsuariosProfile : Profile
    {
        public UsuariosProfile()
        {
            CreateMap<Usuario, UsuarioResponse>();
            CreateMap<UsuarioInserirRequest, UsuarioInserirComando>();
            CreateMap<Hobby, HobbyResponse>();
            CreateMap<PreferenciasUsuario, PreferenciaUsuarioResponse>();
            CreateMap<Preferencia, PreferenciaResponse>();
            CreateMap<LugarFavorito, LugarFavoritoResponse>();
            CreateMap<UsuarioEditarRequest, UsuarioEditarComando>();
        }
    }
}
