package com.x_colleges.web.rest;

import com.x_colleges.LogWorkApp;

import com.x_colleges.domain.LogWork;
import com.x_colleges.repository.LogWorkRepository;
import com.x_colleges.service.LogWorkService;
import com.x_colleges.service.dto.LogWorkDTO;
import com.x_colleges.service.mapper.LogWorkMapper;
import com.x_colleges.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static com.x_colleges.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the LogWorkResource REST controller.
 *
 * @see LogWorkResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LogWorkApp.class)
public class LogWorkResourceIntTest {

    private static final Float DEFAULT_LOGWORK = 1F;
    private static final Float UPDATED_LOGWORK = 2F;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private LogWorkRepository logWorkRepository;

    @Autowired
    private LogWorkMapper logWorkMapper;

    @Autowired
    private LogWorkService logWorkService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restLogWorkMockMvc;

    private LogWork logWork;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LogWorkResource logWorkResource = new LogWorkResource(logWorkService);
        this.restLogWorkMockMvc = MockMvcBuilders.standaloneSetup(logWorkResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LogWork createEntity() {
        LogWork logWork = new LogWork()
            .logwork(DEFAULT_LOGWORK)
            .description(DEFAULT_DESCRIPTION);
        return logWork;
    }

    @Before
    public void initTest() {
        logWorkRepository.deleteAll();
        logWork = createEntity();
    }

    @Test
    public void createLogWork() throws Exception {
        int databaseSizeBeforeCreate = logWorkRepository.findAll().size();

        // Create the LogWork
        LogWorkDTO logWorkDTO = logWorkMapper.toDto(logWork);
        restLogWorkMockMvc.perform(post("/api/log-works")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(logWorkDTO)))
            .andExpect(status().isCreated());

        // Validate the LogWork in the database
        List<LogWork> logWorkList = logWorkRepository.findAll();
        assertThat(logWorkList).hasSize(databaseSizeBeforeCreate + 1);
        LogWork testLogWork = logWorkList.get(logWorkList.size() - 1);
        assertThat(testLogWork.getLogwork()).isEqualTo(DEFAULT_LOGWORK);
        assertThat(testLogWork.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    public void createLogWorkWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = logWorkRepository.findAll().size();

        // Create the LogWork with an existing ID
        logWork.setId("existing_id");
        LogWorkDTO logWorkDTO = logWorkMapper.toDto(logWork);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLogWorkMockMvc.perform(post("/api/log-works")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(logWorkDTO)))
            .andExpect(status().isBadRequest());

        // Validate the LogWork in the database
        List<LogWork> logWorkList = logWorkRepository.findAll();
        assertThat(logWorkList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void checkLogworkIsRequired() throws Exception {
        int databaseSizeBeforeTest = logWorkRepository.findAll().size();
        // set the field null
        logWork.setLogwork(null);

        // Create the LogWork, which fails.
        LogWorkDTO logWorkDTO = logWorkMapper.toDto(logWork);

        restLogWorkMockMvc.perform(post("/api/log-works")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(logWorkDTO)))
            .andExpect(status().isBadRequest());

        List<LogWork> logWorkList = logWorkRepository.findAll();
        assertThat(logWorkList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllLogWorks() throws Exception {
        // Initialize the database
        logWorkRepository.save(logWork);

        // Get all the logWorkList
        restLogWorkMockMvc.perform(get("/api/log-works?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(logWork.getId())))
            .andExpect(jsonPath("$.[*].logwork").value(hasItem(DEFAULT_LOGWORK.doubleValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    public void getLogWork() throws Exception {
        // Initialize the database
        logWorkRepository.save(logWork);

        // Get the logWork
        restLogWorkMockMvc.perform(get("/api/log-works/{id}", logWork.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(logWork.getId()))
            .andExpect(jsonPath("$.logwork").value(DEFAULT_LOGWORK.doubleValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    public void getNonExistingLogWork() throws Exception {
        // Get the logWork
        restLogWorkMockMvc.perform(get("/api/log-works/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateLogWork() throws Exception {
        // Initialize the database
        logWorkRepository.save(logWork);
        int databaseSizeBeforeUpdate = logWorkRepository.findAll().size();

        // Update the logWork
        LogWork updatedLogWork = logWorkRepository.findOne(logWork.getId());
        updatedLogWork
            .logwork(UPDATED_LOGWORK)
            .description(UPDATED_DESCRIPTION);
        LogWorkDTO logWorkDTO = logWorkMapper.toDto(updatedLogWork);

        restLogWorkMockMvc.perform(put("/api/log-works")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(logWorkDTO)))
            .andExpect(status().isOk());

        // Validate the LogWork in the database
        List<LogWork> logWorkList = logWorkRepository.findAll();
        assertThat(logWorkList).hasSize(databaseSizeBeforeUpdate);
        LogWork testLogWork = logWorkList.get(logWorkList.size() - 1);
        assertThat(testLogWork.getLogwork()).isEqualTo(UPDATED_LOGWORK);
        assertThat(testLogWork.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    public void updateNonExistingLogWork() throws Exception {
        int databaseSizeBeforeUpdate = logWorkRepository.findAll().size();

        // Create the LogWork
        LogWorkDTO logWorkDTO = logWorkMapper.toDto(logWork);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restLogWorkMockMvc.perform(put("/api/log-works")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(logWorkDTO)))
            .andExpect(status().isCreated());

        // Validate the LogWork in the database
        List<LogWork> logWorkList = logWorkRepository.findAll();
        assertThat(logWorkList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    public void deleteLogWork() throws Exception {
        // Initialize the database
        logWorkRepository.save(logWork);
        int databaseSizeBeforeDelete = logWorkRepository.findAll().size();

        // Get the logWork
        restLogWorkMockMvc.perform(delete("/api/log-works/{id}", logWork.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<LogWork> logWorkList = logWorkRepository.findAll();
        assertThat(logWorkList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LogWork.class);
        LogWork logWork1 = new LogWork();
        logWork1.setId("id1");
        LogWork logWork2 = new LogWork();
        logWork2.setId(logWork1.getId());
        assertThat(logWork1).isEqualTo(logWork2);
        logWork2.setId("id2");
        assertThat(logWork1).isNotEqualTo(logWork2);
        logWork1.setId(null);
        assertThat(logWork1).isNotEqualTo(logWork2);
    }

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LogWorkDTO.class);
        LogWorkDTO logWorkDTO1 = new LogWorkDTO();
        logWorkDTO1.setId("id1");
        LogWorkDTO logWorkDTO2 = new LogWorkDTO();
        assertThat(logWorkDTO1).isNotEqualTo(logWorkDTO2);
        logWorkDTO2.setId(logWorkDTO1.getId());
        assertThat(logWorkDTO1).isEqualTo(logWorkDTO2);
        logWorkDTO2.setId("id2");
        assertThat(logWorkDTO1).isNotEqualTo(logWorkDTO2);
        logWorkDTO1.setId(null);
        assertThat(logWorkDTO1).isNotEqualTo(logWorkDTO2);
    }
}
