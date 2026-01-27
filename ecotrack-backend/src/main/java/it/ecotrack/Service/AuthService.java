package it.ecotrack.Service;

import it.ecotrack.exception.UsernameTakenException;
import it.ecotrack.model.User;
import it.ecotrack.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final Random random = new Random();

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User register(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            List<String> tips = new ArrayList<>();
            int tentativi = 0;

            while (tips.size() < 3 && tentativi < 20) {
                String candidate = user.getUsername() + (random.nextInt(900) + 10);
                if (!userRepository.existsByUsername(candidate) && !tips.contains(candidate)) {
                    tips.add(candidate);
                }
                tentativi++;
            }
            throw new UsernameTakenException("Username occupato! Prova uno di questi:", tips);
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User login(String username, String rawPassword) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Utente non trovato"));

        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new RuntimeException("Password errata");
        }

        return user;
    }
}