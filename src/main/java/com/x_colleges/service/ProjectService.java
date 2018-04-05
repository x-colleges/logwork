package com.x_colleges.service;

import com.x_colleges.service.dto.ProjectDTO;
import java.util.List;

/**
 * Service Interface for managing Project.
 */
public interface ProjectService {

    /**
     * Save a project.
     *
     * @param projectDTO the entity to save
     * @return the persisted entity
     */
    ProjectDTO save(ProjectDTO projectDTO);

    /**
     * Get all the projects.
     *
     * @return the list of entities
     */
    List<ProjectDTO> findAll();

    /**
     * Get the "id" project.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ProjectDTO findOne(String id);

    /**
     * Delete the "id" project.
     *
     * @param id the id of the entity
     */
    void delete(String id);
}
