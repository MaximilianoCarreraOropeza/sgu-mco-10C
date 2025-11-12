package com.mco.docker.server.modules.controller;

import com.mco.docker.server.modules.model.UserDto;
import com.mco.docker.server.modules.service.UserService;
import com.mco.docker.server.utils.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = {"*"})
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public ResponseEntity<ApiResponse> getUsers() {
        return userService.getAllUsers();
    }


    @PostMapping("/")
    public ResponseEntity<ApiResponse> postUser(@RequestBody UserDto dto) {
        return userService.postUser(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> putUser(@RequestBody UserDto dto) {
        return userService.putUser(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable Long id) {
        return userService.deleteUser(id);
    }
}
