package com.saj.controlador.mappers;

/**
 * Interface genérica para mapeamento entre entidades e DTOs.
 *
 * @param <E> Tipo da entidade
 * @param <D> Tipo do DTO
 */
public interface Mapper<E, D> {

    /**
     * Converte uma entidade para DTO.
     *
     * @param entity A entidade a ser convertida
     * @return O DTO correspondente
     */
    D toDTO(E entity);

    /**
     * Converte um DTO para entidade.
     *
     * @param dto O DTO a ser convertido
     * @return A entidade correspondente
     */
    E toEntity(D dto);
}
