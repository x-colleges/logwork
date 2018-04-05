package com.x_colleges.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the LogWork entity.
 */
public class LogWorkDTO implements Serializable {

    private String id;

    @NotNull
    private Float logwork;

    private String description;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Float getLogwork() {
        return logwork;
    }

    public void setLogwork(Float logwork) {
        this.logwork = logwork;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        LogWorkDTO logWorkDTO = (LogWorkDTO) o;
        if(logWorkDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), logWorkDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LogWorkDTO{" +
            "id=" + getId() +
            ", logwork=" + getLogwork() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
