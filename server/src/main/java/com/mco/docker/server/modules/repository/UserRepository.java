package com.mco.docker.server.modules.repository;

import com.mco.docker.server.modules.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
