package com.wahyaumau.springbootsqlite.controllers;

import com.wahyaumau.springbootsqlite.entities.Explain;
import com.wahyaumau.springbootsqlite.models.BaseResponse;
import com.wahyaumau.springbootsqlite.services.ExplainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/explain")         // For processing HTTP requests, and the URL paths will all start with /explain
public class ExplainController {
    @Autowired
    private ExplainService explainService;

    @PostMapping                    // Handling POST requests
    public BaseResponse save(@RequestBody Explain explain) {
        return explainService.save(explain);
    }

    @PutMapping("/{id}")            // Handling PUT requests
    public BaseResponse update(@PathVariable Long id, @RequestBody Explain explain) {
        return explainService.update(id, explain);
    }

    @DeleteMapping("/{id}")         // Handling DELETE requests
    public BaseResponse delete(@PathVariable Long id) {
        return explainService.delete(id);
    }

    @GetMapping                     // Handling GET requests
    public BaseResponse findAll() {
        return explainService.findAll();
    }
}