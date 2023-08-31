package com.wahyaumau.springbootsqlite.controllers;

import com.wahyaumau.springbootsqlite.entities.Parking;
import com.wahyaumau.springbootsqlite.models.BaseResponse;
import com.wahyaumau.springbootsqlite.services.ParkingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/parking")         // For processing HTTP requests, and the URL paths will all start with /parking
public class ParkingControllers {
    @Autowired
    ParkingService testService;

    @GetMapping                     // Handling GET requests
    public BaseResponse findAll(@RequestParam Map<String, String> params) {
        return testService.findAll(params);
    }

    @PostMapping                    // Handling POST requests
    public ResponseEntity<?> save(@RequestBody Parking test) {
        return ResponseEntity.status(HttpStatus.CREATED).body(testService.save(test));
    }

    @PutMapping("/{id}")            // Handling PUT requests
    public BaseResponse update(@PathVariable long id, @RequestBody Parking test) {
        return testService.update(id, test);
    }

    @DeleteMapping("/{id}")         // Handling DELETE requests
    public ResponseEntity<?> delete(@PathVariable long id) {
        BaseResponse result = testService.delete(id);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }
}
