package com.x_colleges.repository;

import com.x_colleges.domain.LogWork;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the LogWork entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LogWorkRepository extends MongoRepository<LogWork, String> {

}
