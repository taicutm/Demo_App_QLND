package com.example.aots_backend.controller;

import com.example.aots_backend.model.User;
import com.example.aots_backend.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // get tất cả người dùng
   @GetMapping
    public List<User> getUsers() {
        return userService.getAllUsers();
    }
    // get 1 người dùng theo id
    @GetMapping("/{id}")
    public User getUserById(@PathVariable int id) {
        return userService.getUserById(id);
    }
    // thêm 1 người dùng http://localhost:8080/users/
    @PostMapping
    public void addUser(@RequestBody User user) {
        userService.addUser(user);
    }

    // sửa 1 người dùng
    @PutMapping("/{id}")
    public void updateUser(@PathVariable int id, @RequestBody User user) {
        user.setId(id);
        userService.updateUser(user);
    }

    // xoá 1 người dùng theo id
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
    }
}
