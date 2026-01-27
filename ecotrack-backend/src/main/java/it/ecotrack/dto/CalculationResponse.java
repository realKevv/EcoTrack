package it.ecotrack.dto;

import lombok.Data;
import java.util.Map;

@Data
public class CalculationResponse {
    private double total;
    private Map<String, Double> breakdown;

    public CalculationResponse(double total, Map<String, Double> breakdown) {
        this.total = total;
        this.breakdown = breakdown;
    }
}