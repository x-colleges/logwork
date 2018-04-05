package com.x_colleges.service.mapper;

import com.x_colleges.domain.*;
import com.x_colleges.service.dto.LogWorkDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity LogWork and its DTO LogWorkDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface LogWorkMapper extends EntityMapper<LogWorkDTO, LogWork> {


}
