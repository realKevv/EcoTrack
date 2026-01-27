package it.ecotrack.controller;

import it.ecotrack.Service.ActivityService;
import it.ecotrack.dto.CalculationRequest;  // <--- Importante: DTO Request
import it.ecotrack.dto.CalculationResponse; // <--- Importante: DTO Response
import it.ecotrack.model.Activity;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ActivityController {

    private final ActivityService service;

    public ActivityController(ActivityService service) {
        this.service = service;
    }

    // 1. ENDPOINT CALCOLO + SALVATAGGIO  URL: http://localhost:8080/api/calculate?userId=1
    @PostMapping("/calculate")
    public ResponseEntity<CalculationResponse> calculateFullProfile(
            @RequestBody CalculationRequest request,
            @RequestParam(required = false) Long userId
    ) {
        // Ora passiamo entrambi i parametri al service, così lui sa CHI sta salvando i dati
        CalculationResponse response = service.calculateBulkProfile(request, userId);
        return ResponseEntity.ok(response);
    }

    // 2. ENDPOINT PER SALVARE
    @PostMapping("/activities/{userId}")
    public ResponseEntity<Activity> createActivity(@PathVariable Long userId, @Valid @RequestBody Activity activity) {
        Activity savedActivity = service.createActivity(activity, userId);
        return ResponseEntity.ok(savedActivity);
    }

    // 3. ENDPOINT PER LO STORICO
    @GetMapping("/activities/{userId}")
    public ResponseEntity<List<Activity>> getActivitiesByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getActivitiesByUserId(userId));
    }
}