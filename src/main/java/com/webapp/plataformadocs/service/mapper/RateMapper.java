package com.webapp.plataformadocs.service.mapper;

import com.webapp.plataformadocs.domain.*;
import com.webapp.plataformadocs.service.dto.RateDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Rate and its DTO RateDTO.
 */
@Mapper(componentModel = "spring", uses = {UsuarioMapper.class, FileMapper.class})
public interface RateMapper extends EntityMapper<RateDTO, Rate> {

    @Mapping(source = "usuario.id", target = "usuarioId")
    @Mapping(source = "file.id", target = "fileId")
    RateDTO toDto(Rate rate); 

    @Mapping(source = "usuarioId", target = "usuario")
    @Mapping(source = "fileId", target = "file")
    Rate toEntity(RateDTO rateDTO);

    default Rate fromId(Long id) {
        if (id == null) {
            return null;
        }
        Rate rate = new Rate();
        rate.setId(id);
        return rate;
    }
}
