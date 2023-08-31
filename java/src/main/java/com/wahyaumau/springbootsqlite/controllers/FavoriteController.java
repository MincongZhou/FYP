package com.wahyaumau.springbootsqlite.controllers;

import com.wahyaumau.springbootsqlite.entities.Favorite;
import com.wahyaumau.springbootsqlite.models.BaseResponse;
import com.wahyaumau.springbootsqlite.services.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/favorite")        // For processing HTTP requests, and the URL paths will all start with /favorite
public class FavoriteController {
    @Autowired
    private FavoriteService favoriteService;

    @PostMapping                    // Handling POST requests
    public BaseResponse save(@RequestBody Favorite favorite) {
        return favoriteService.save(favorite);
    }

    @PutMapping("/{id}")            // Handling PUT requests
    public BaseResponse update(@PathVariable Long id, @RequestBody Favorite favorite) {
        return favoriteService.update(id, favorite);
    }

    @DeleteMapping("/{id}")         // Handling DELETE requests
    public BaseResponse delete(@PathVariable Long id) {
        return favoriteService.delete(id);
    }

    @GetMapping                     // Handling GET requests
    public BaseResponse findAll(@RequestParam long id) {
        return favoriteService.findAll(id);
    }
}