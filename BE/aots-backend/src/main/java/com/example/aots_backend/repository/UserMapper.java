package com.example.aots_backend.repository;

import com.example.aots_backend.model.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    List<User> findAll();
    void insertUser(User user);
    void updateUser(User user);
    void deleteUser(int id);
    User findById(int id);

}
