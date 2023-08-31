package com.wahyaumau.springbootsqlite.services;

import com.wahyaumau.springbootsqlite.entities.Stall;
import com.wahyaumau.springbootsqlite.repositories.StallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class StallService {
    @Autowired
    private StallRepository stallRepository;

    // Find all Stall entities
    public List<Stall> findAll() {
        return stallRepository.findAll();
    }

}