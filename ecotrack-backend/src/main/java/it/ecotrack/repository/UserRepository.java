package it.ecotrack.repository;

import it.ecotrack.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository  extends JpaRepository<User, Long>{

    //cerca un utente che ha quel nome e quella password
    Optional<User> findByUsername(String username);

    // ✅ Serve per la registrazione
    boolean existsByUsername(String username);
}