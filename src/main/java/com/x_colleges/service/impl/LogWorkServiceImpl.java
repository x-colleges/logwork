package com.x_colleges.service.impl;

import com.x_colleges.service.LogWorkService;
import com.x_colleges.domain.LogWork;
import com.x_colleges.repository.LogWorkRepository;
import com.x_colleges.service.dto.LogWorkDTO;
import com.x_colleges.service.mapper.LogWorkMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


/**
 * Service Implementation for managing LogWork.
 */
@Service
public class LogWorkServiceImpl implements LogWorkService {

    private final Logger log = LoggerFactory.getLogger(LogWorkServiceImpl.class);

    private final LogWorkRepository logWorkRepository;

    private final LogWorkMapper logWorkMapper;

    public LogWorkServiceImpl(LogWorkRepository logWorkRepository, LogWorkMapper logWorkMapper) {
        this.logWorkRepository = logWorkRepository;
        this.logWorkMapper = logWorkMapper;
    }

    /**
     * Save a logWork.
     *
     * @param logWorkDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public LogWorkDTO save(LogWorkDTO logWorkDTO) {
        log.debug("Request to save LogWork : {}", logWorkDTO);
        LogWork logWork = logWorkMapper.toEntity(logWorkDTO);
        logWork = logWorkRepository.save(logWork);
        return logWorkMapper.toDto(logWork);
    }

    /**
     * Get all the logWorks.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    public Page<LogWorkDTO> findAll(Pageable pageable) {
        log.debug("Request to get all LogWorks");
        return logWorkRepository.findAll(pageable)
            .map(logWorkMapper::toDto);
    }

    /**
     * Get one logWork by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public LogWorkDTO findOne(String id) {
        log.debug("Request to get LogWork : {}", id);
        LogWork logWork = logWorkRepository.findOne(id);
        return logWorkMapper.toDto(logWork);
    }

    /**
     * Delete the logWork by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete LogWork : {}", id);
        logWorkRepository.delete(id);
    }
}
