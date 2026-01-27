package it.ecotrack.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import it.ecotrack.enums.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "activities")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "La categoria è obbligatoria")
    private ActivityCategory category;

    @Enumerated(EnumType.STRING)
    private TransportType transportType;

    @Enumerated(EnumType.STRING)
    private WaterType waterType;

    @NotNull(message = "Il valore è obbligatorio")
    @Positive
    private Double value;

    private Double extraParam = 0.0;

    private Double co2Emitted;
    private Double comparisonSavings;

    @Column(length = 1000)
    private String advice;

    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.EAGER) //
    @JoinColumn(name = "user_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnoreProperties({"activities", "password", "hibernateLazyInitializer", "handler"})
    @ToString.Exclude
    private User user;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    // --- COSTRUTTORE VUOTO ---
    public Activity() {
    }
}