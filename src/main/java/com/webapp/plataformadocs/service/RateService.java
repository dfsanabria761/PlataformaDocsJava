package com.webapp.plataformadocs.service;

import com.webapp.plataformadocs.service.dto.RateDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Rate.
 */
public interface RateService {

    /**
     * Save a rate.
     *
     * @param rateDTO the entity to save
     * @return the persisted entity
     */
    RateDTO save(RateDTO rateDTO);

    /**
     * Get all the rates.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<RateDTO> findAll(Pageable pageable);

    /**
     * Get the "id" rate.
     *
     * @param id the id of the entity
     * @return the entity
     */
    RateDTO findOne(Long id);

    /**
     * Delete the "id" rate.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
