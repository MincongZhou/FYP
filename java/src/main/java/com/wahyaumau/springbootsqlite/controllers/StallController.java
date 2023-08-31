package com.wahyaumau.springbootsqlite.controllers;

import com.wahyaumau.springbootsqlite.entities.Stall;
import com.wahyaumau.springbootsqlite.services.StallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/stalls")      // For processing HTTP requests, and the URL paths will all start with /api/stalls
public class StallController {
    @Autowired
    private StallService stallService;

    @GetMapping("")                 // Handling GET requests
    public List<Stall> findAll() {
        return stallService.findAll();
    }

}