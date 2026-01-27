package it.ecotrack.controller;

import it.ecotrack.Service.AuthService;
import it.ecotrack.dto.LoginRequest; // <--- Importiamo il DTO
import it.ecotrack.exception.UsernameTakenException;
import it.ecotrack.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService){
        this.authService = authService;
    }

    // REGISTER (Qui usiamo ancora User perché ci servono tutti i dati per creare l'account)
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            return ResponseEntity.ok(authService.register(user));
        } catch (UsernameTakenException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of(
                    "error", e.getMessage(),
                    "tips", e.getTips()
            ));
        } catch (RuntimeException e ) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // =======================================================
    // LOGIN "PULITO" CON DTO
    // =======================================================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) { // <--- Cambiato da User a LoginRequest
        try {
            // Estraiamo i dati dal DTO e li passiamo al service
            return ResponseEntity.ok(authService.login(
                    loginRequest.getUsername(),
                    loginRequest.getPassword()
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", e.getMessage()));
        }
    }
}