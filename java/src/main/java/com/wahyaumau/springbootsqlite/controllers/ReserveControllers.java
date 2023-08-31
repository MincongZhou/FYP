package com.wahyaumau.springbootsqlite.controllers;

import com.wahyaumau.springbootsqlite.entities.Reserve;
import com.wahyaumau.springbootsqlite.models.BaseResponse;
import com.wahyaumau.springbootsqlite.services.ReserveServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/reserve")         // For processing HTTP requests, and the URL paths will all start with /reserve
public class ReserveControllers {
    @Autowired
    ReserveServices testService;

    @GetMapping                     // Handling GET requests
    public BaseResponse findAll(@RequestParam Map<String, String> params){
        return testService.findAll(params);
    }

    @PostMapping                    // Handling POST requests
    public ResponseEntity<?> save(@RequestBody Reserve test){
        return ResponseEntity.status(HttpStatus.CREATED).body(testService.save(test));
    }

    @PutMapping("/{id}")            // Handling PUT requests
    public BaseResponse update(@PathVariable long id, @RequestBody Reserve test){
        return testService.update(id, test);
    }
}
