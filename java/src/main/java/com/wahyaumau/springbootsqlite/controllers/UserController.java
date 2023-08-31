package com.wahyaumau.springbootsqlite.controllers;

import com.wahyaumau.springbootsqlite.entities.User;
import com.wahyaumau.springbootsqlite.models.BaseResponse;
import com.wahyaumau.springbootsqlite.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public BaseResponse login(@RequestBody User user) {
        return userService.login(user);
    }                                                   // Processing Login Requests

    @PostMapping("/register")
    public BaseResponse register(@RequestBody User user) {
        return userService.register(user);
    }                                                   // Processing Login Requests

    @PutMapping("/{id}")
    public BaseResponse update(@PathVariable Long id, @RequestBody User user) {
        return userService.update(id, user);
    }                                                   // Processing User Information Update Requests

    @DeleteMapping("/{id}")
    public BaseResponse delete(@PathVariable Long id) {
        return userService.delete(id);
    }                                                   // Processing of requests to delete users

    @GetMapping
    public List<User> findAll() {
        return userService.findAll();
    }  // Get information about all users

    @GetMapping("/{id}")
    public BaseResponse findById(@PathVariable Long id) {
        return userService.findById(id);
    } // Get information about the user with the specified id
}
