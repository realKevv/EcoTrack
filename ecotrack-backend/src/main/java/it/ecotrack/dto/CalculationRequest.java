package it.ecotrack.dto;

import lombok.Data;

@Data
public class CalculationRequest {
    // --- CAMPI DELLA CLASSE PRINCIPALE ---
    private TransportData transport;
    private TravelData travel;
    private HomeData home;
    private FoodData food;
    private ShoppingData shopping;
    private WasteData waste;

    // --- CLASSI INTERNE (DEVONO STARE DENTRO LE GRAFFE DI CalculationRequest) ---

    @Data
    public static class TransportData {
        private String mode;
        private CarDetails carDetails;
        private double km;
    }

    @Data
    public static class CarDetails {
        private String fuel; // "petrol", "diesel", etc.
        private String size; // "medium", "large"
    }

    @Data
    public static class HomeData {
        private Shower shower;
        private Heating heating;
        private Appliances appliances;
    }

    @Data
    public static class Shower {
        private int time;
        private boolean hot;
    }

    @Data
    public static class Heating {
        private int hours;
        private String type;
    }

    @Data
    public static class Appliances {
        private boolean washingMachine;
        private boolean dishwasher;
        private boolean oven;
    }

    @Data
    public static class FoodData {
        private String diet;
        private boolean local;
    }

    @Data
    public static class ShoppingData {
        private Clothes clothes;
        private Electronics electronics;
    }

    @Data
    public static class Clothes {
        private int tshirt;
        private int jeans;
        private int shoes;
        private boolean secondhand;
    }

    @Data
    public static class Electronics {
        private int smartphone;
        private int laptop;
    }

    @Data
    public static class WasteData {
        private int bags;
        private Recycle recycle;
    }

    @Data
    public static class Recycle {
        private boolean plastic;
        private boolean paper;
        private boolean glass;
    }

    @Data
    public static class TravelData {
        private Flights flights;
        private double cruise;
    }

    @Data
    public static class Flights {
        private int shortDist;
        private int medium;
        private int longDist;
        private String flightClass;
    }

}