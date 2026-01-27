package it.ecotrack.repository;

import it.ecotrack.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
    // Trova tutte le attività collegate a quello specifico ID utente.

    List<Activity> findByUserId(Long userId);
}
