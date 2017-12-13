package com.webapp.plataformadocs.service.mapper;

import com.webapp.plataformadocs.domain.*;
import com.webapp.plataformadocs.service.dto.UsuarioDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Usuario and its DTO UsuarioDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface UsuarioMapper extends EntityMapper<UsuarioDTO, Usuario> {

    @Mapping(source = "user.id", target = "userId")
    UsuarioDTO toDto(Usuario usuario); 

    @Mapping(source = "userId", target = "user")
    @Mapping(target = "rates", ignore = true)
    Usuario toEntity(UsuarioDTO usuarioDTO);

    default Usuario fromId(Long id) {
        if (id == null) {
            return null;
        }
        Usuario usuario = new Usuario();
        usuario.setId(id);
        return usuario;
    }
}
