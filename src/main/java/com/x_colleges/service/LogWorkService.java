package com.x_colleges.service;

import com.x_colleges.service.dto.LogWorkDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing LogWork.
 */
public interface LogWorkService {

    /**
     * Save a logWork.
     *
     * @param logWorkDTO the entity to save
     * @return the persisted entity
     */
    LogWorkDTO save(LogWorkDTO logWorkDTO);

    /**
     * Get all the logWorks.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<LogWorkDTO> findAll(Pageable pageable);

    /**
     * Get the "id" logWork.
     *
     * @param id the id of the entity
     * @return the entity
     */
    LogWorkDTO findOne(String id);

    /**
     * Delete the "id" logWork.
     *
     * @param id the id of the entity
     */
    void delete(String id);
}
