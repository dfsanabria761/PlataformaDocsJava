package com.webapp.plataformadocs.service.mapper;

import com.webapp.plataformadocs.domain.*;
import com.webapp.plataformadocs.service.dto.FileDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity File and its DTO FileDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface FileMapper extends EntityMapper<FileDTO, File> {

    

    @Mapping(target = "rates", ignore = true)
    File toEntity(FileDTO fileDTO);

    default File fromId(Long id) {
        if (id == null) {
            return null;
        }
        File file = new File();
        file.setId(id);
        return file;
    }
}
