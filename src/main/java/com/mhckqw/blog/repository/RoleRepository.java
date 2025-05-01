package com.mhckqw.blog.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mhckqw.blog.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByName(String name);
}