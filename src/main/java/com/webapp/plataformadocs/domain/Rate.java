package com.webapp.plataformadocs.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;


/**
 * A Rate.
 */
@Entity
@Table(name = "rate")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Rate implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_rated")
    private ZonedDateTime dateRated;

    @Column(name = "rate")
    private Double rate;

    @Column(name = "descripcion")
    private String descripcion;

    @ManyToOne
    private Usuario usuario;

    @ManyToOne
    private File file;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDateRated() {
        return dateRated;
    }

    public Rate dateRated(ZonedDateTime dateRated) {
        this.dateRated = dateRated;
        return this;
    }

    public void setDateRated(ZonedDateTime dateRated) {
        this.dateRated = dateRated;
    }

    public Double getRate() {
        return rate;
    }

    public Rate rate(Double rate) {
        this.rate = rate;
        return this;
    }

    public void setRate(Double rate) {
        this.rate = rate;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Rate descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public Rate usuario(Usuario usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public File getFile() {
        return file;
    }

    public Rate file(File file) {
        this.file = file;
        return this;
    }

    public void setFile(File file) {
        this.file = file;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Rate rate = (Rate) o;
        if (rate.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), rate.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Rate{" +
            "id=" + getId() +
            ", dateRated='" + getDateRated() + "'" +
            ", rate=" + getRate() +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}
