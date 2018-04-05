package com.x_colleges.domain;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Objects;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import io.swagger.annotations.ApiModel;

/**
 * LogWork entity.
 * @author Lam Le
 */
@ApiModel(description = "LogWork entity. @author Lam Le")
@Document(collection = "log_work")
public class LogWork implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("logwork")
    private Float logwork;

    @Field("description")
    private String description;

    private User user;
    private Project project;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Float getLogwork() {
        return logwork;
    }

    public LogWork logwork(Float logwork) {
        this.logwork = logwork;
        return this;
    }

    public void setLogwork(Float logwork) {
        this.logwork = logwork;
    }

    public String getDescription() {
        return description;
    }

    public LogWork description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        LogWork logWork = (LogWork) o;
        if (logWork.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), logWork.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LogWork{" +
            "id=" + getId() +
            ", logwork=" + getLogwork() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
