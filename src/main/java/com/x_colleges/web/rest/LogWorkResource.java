package com.x_colleges.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.x_colleges.service.LogWorkService;
import com.x_colleges.web.rest.errors.BadRequestAlertException;
import com.x_colleges.web.rest.util.HeaderUtil;
import com.x_colleges.web.rest.util.PaginationUtil;
import com.x_colleges.service.dto.LogWorkDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing LogWork.
 */
@RestController
@RequestMapping("/api")
public class LogWorkResource {

    private final Logger log = LoggerFactory.getLogger(LogWorkResource.class);

    private static final String ENTITY_NAME = "logWork";

    private final LogWorkService logWorkService;

    public LogWorkResource(LogWorkService logWorkService) {
        this.logWorkService = logWorkService;
    }

    /**
     * POST  /log-works : Create a new logWork.
     *
     * @param logWorkDTO the logWorkDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new logWorkDTO, or with status 400 (Bad Request) if the logWork has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/log-works")
    @Timed
    public ResponseEntity<LogWorkDTO> createLogWork(@Valid @RequestBody LogWorkDTO logWorkDTO) throws URISyntaxException {
        log.debug("REST request to save LogWork : {}", logWorkDTO);
        if (logWorkDTO.getId() != null) {
            throw new BadRequestAlertException("A new logWork cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LogWorkDTO result = logWorkService.save(logWorkDTO);
        return ResponseEntity.created(new URI("/api/log-works/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /log-works : Updates an existing logWork.
     *
     * @param logWorkDTO the logWorkDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated logWorkDTO,
     * or with status 400 (Bad Request) if the logWorkDTO is not valid,
     * or with status 500 (Internal Server Error) if the logWorkDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/log-works")
    @Timed
    public ResponseEntity<LogWorkDTO> updateLogWork(@Valid @RequestBody LogWorkDTO logWorkDTO) throws URISyntaxException {
        log.debug("REST request to update LogWork : {}", logWorkDTO);
        if (logWorkDTO.getId() == null) {
            return createLogWork(logWorkDTO);
        }
        LogWorkDTO result = logWorkService.save(logWorkDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, logWorkDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /log-works : get all the logWorks.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of logWorks in body
     */
    @GetMapping("/log-works")
    @Timed
    public ResponseEntity<List<LogWorkDTO>> getAllLogWorks(Pageable pageable) {
        log.debug("REST request to get a page of LogWorks");
        Page<LogWorkDTO> page = logWorkService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/log-works");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /log-works/:id : get the "id" logWork.
     *
     * @param id the id of the logWorkDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the logWorkDTO, or with status 404 (Not Found)
     */
    @GetMapping("/log-works/{id}")
    @Timed
    public ResponseEntity<LogWorkDTO> getLogWork(@PathVariable String id) {
        log.debug("REST request to get LogWork : {}", id);
        LogWorkDTO logWorkDTO = logWorkService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(logWorkDTO));
    }

    /**
     * DELETE  /log-works/:id : delete the "id" logWork.
     *
     * @param id the id of the logWorkDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/log-works/{id}")
    @Timed
    public ResponseEntity<Void> deleteLogWork(@PathVariable String id) {
        log.debug("REST request to delete LogWork : {}", id);
        logWorkService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
