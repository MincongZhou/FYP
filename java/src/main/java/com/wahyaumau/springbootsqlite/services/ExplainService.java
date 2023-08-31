package com.wahyaumau.springbootsqlite.services;

import com.wahyaumau.springbootsqlite.entities.Explain;
import com.wahyaumau.springbootsqlite.models.BaseResponse;
import com.wahyaumau.springbootsqlite.repositories.ExplainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ExplainService {
    @Autowired
    private ExplainRepository explainRepository;

    // Receives an ID and an Explain entity as parameters, set the ID to the Explain entity's ID then calls the save method to save the entity
    public BaseResponse update(Long id, Explain explain) {
        explain.setId(id);
        return new BaseResponse("200", "", explainRepository.save(explain));
    }

    // Receives an Explain entity as a parameter, and calls the save method directly to save the entity
    public BaseResponse save(Explain explain) {
        return new BaseResponse("200", "", explainRepository.save(explain));
    }

    // Receives an ID as a parameter and calls the deleteById method to delete the Explain entity with the specified ID
    public BaseResponse delete(Long id) {
        explainRepository.deleteById(id);
        return new BaseResponse("200", "");
    }

    // Find all Explain entities
    public BaseResponse findAll() {
        return new BaseResponse("200", "", explainRepository.findAll());
    }
}