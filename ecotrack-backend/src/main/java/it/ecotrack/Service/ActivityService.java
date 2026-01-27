package it.ecotrack.Service;

import it.ecotrack.dto.CalculationRequest;
import it.ecotrack.dto.CalculationResponse;
import it.ecotrack.enums.ActivityCategory;
import it.ecotrack.enums.TransportType;
import it.ecotrack.enums.WaterType;
import it.ecotrack.model.Activity;
import it.ecotrack.model.User;
import it.ecotrack.repository.ActivityRepository;
import it.ecotrack.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final UserRepository userRepository;

    // FATTORI DI EMISSIONE (kg CO2)
    private static final double CO2_BENZINA = 0.192;
    private static final double CO2_DIESEL = 0.171;
    private static final double CO2_GPL = 0.165;
    private static final double CO2_IBRIDA = 0.110;
    private static final double CO2_ELETTRICA = 0.060;
    private static final double CO2_MOTO = 0.120;
    private static final double CO2_BUS = 0.040;

    private static final double CO2_VOLO_ORA = 150.0;
    private static final double CO2_CROCIERA_GG = 250.0;
    private static final double CO2_SACCO_RIFIUTI = 15.0;

    private static final int DRIVING_DAYS_PER_YEAR = 230;

    public ActivityService(ActivityRepository activityRepository, UserRepository userRepository) {
        this.activityRepository = activityRepository;
        this.userRepository = userRepository;
    }

    // --- 1. METODO PER SINGOLA ATTIVITA' (Es. aggiunta manuale futura) ---
    public Activity createActivity(Activity activity, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utente non trovato"));
        activity.setUser(user);
        performCalculation(activity);
        saveAndGamify(activity, user); // Usa il metodo helper condiviso
        return activity;
    }

    // --- 2. METODO GUEST ---
    public Activity calculateGuest(Activity activity) {
        performCalculation(activity);
        return activity;
    }

    // =================================================================================
    // === METODO AGGIORNATO: GESTIONE "BULK" + SALVATAGGIO DB + XP ===
    // =================================================================================
    public CalculationResponse calculateBulkProfile(CalculationRequest req, Long userId) {
        Map<String, Double> breakdown = new HashMap<>();
        double total = 0.0;

        // Recuperiamo l'utente UNA volta sola se l'ID c'è
        User user = null;
        if (userId != null) {
            user = userRepository.findById(userId).orElse(null);
        }

        // 1. TRASPORTO
        Activity transportAct = new Activity();
        transportAct.setCategory(ActivityCategory.TRASPORTO);
        if (req.getTransport() != null && "car".equals(req.getTransport().getMode())) {
            transportAct.setValue(req.getTransport().getKm());
            String fuel = req.getTransport().getCarDetails().getFuel();
            if ("petrol".equals(fuel)) transportAct.setTransportType(TransportType.AUTO_BENZINA);
            else if ("diesel".equals(fuel)) transportAct.setTransportType(TransportType.AUTO_DIESEL);
            else if ("gpl".equals(fuel)) transportAct.setTransportType(TransportType.AUTO_GPL);
            else if ("electric".equals(fuel)) transportAct.setTransportType(TransportType.AUTO_ELETTRICA);
            else if ("hybrid".equals(fuel)) transportAct.setTransportType(TransportType.AUTO_IBRIDA);
            else transportAct.setTransportType(TransportType.AUTO_BENZINA);

            boolean isLarge = "large".equals(req.getTransport().getCarDetails().getSize());
            transportAct.setExtraParam(isLarge ? 1.0 : 0.0);
        } else {
            transportAct.setValue(0.0);
        }
        performCalculation(transportAct);
        // SE C'E' L'UTENTE E IL VALORE > 0, SALVIAMO NEL DB!
        if (user != null && transportAct.getValue() > 0) saveAndGamify(transportAct, user);
        breakdown.put("transport", transportAct.getCo2Emitted());
        total += transportAct.getCo2Emitted();

        // 2. CIBO
        Activity foodAct = new Activity();
        foodAct.setCategory(ActivityCategory.CIBO);
        if (req.getFood() != null) {
            String diet = req.getFood().getDiet();
            if ("vegan".equals(diet)) foodAct.setValue(1.0);
            else if ("vegetarian".equals(diet)) foodAct.setValue(2.0);
            else if ("meat".equals(diet)) foodAct.setValue(4.0);
            else foodAct.setValue(3.0);
            foodAct.setExtraParam(req.getFood().isLocal() ? 1.0 : 0.0);
        }
        performCalculation(foodAct);
        if (user != null) saveAndGamify(foodAct, user);
        breakdown.put("food", foodAct.getCo2Emitted());
        total += foodAct.getCo2Emitted();

        // 3. HOME
        double homeCo2 = 0.0;
        if (req.getHome() != null) {
            // A. Doccia
            Activity shower = new Activity();
            shower.setCategory(ActivityCategory.ACQUA);
            shower.setValue((double) req.getHome().getShower().getTime());
            shower.setWaterType(req.getHome().getShower().isHot() ? WaterType.DOCCIA_CALDA : WaterType.DOCCIA_FREDDA);
            performCalculation(shower);
            if (user != null && shower.getValue() > 0) saveAndGamify(shower, user);
            homeCo2 += shower.getCo2Emitted();

            // B. Riscaldamento
            Activity heating = new Activity();
            heating.setCategory(ActivityCategory.ENERGIA);
            heating.setValue((double) req.getHome().getHeating().getHours());
            String heatType = req.getHome().getHeating().getType();
            if ("electric".equals(heatType)) heating.setExtraParam(2.0);
            else if ("heatpump".equals(heatType)) heating.setExtraParam(5.0);
            else heating.setExtraParam(1.0);
            performCalculation(heating);
            if (user != null && heating.getValue() > 0) saveAndGamify(heating, user);
            homeCo2 += heating.getCo2Emitted();
        }
        breakdown.put("home", homeCo2);
        total += homeCo2;

        // 4. WASTE
        Activity wasteAct = new Activity();
        wasteAct.setCategory(ActivityCategory.RIFIUTI);
        if (req.getWaste() != null) {
            wasteAct.setValue((double) req.getWaste().getBags());
            boolean recycles = req.getWaste().getRecycle().isPaper() || req.getWaste().getRecycle().isPlastic();
            wasteAct.setExtraParam(recycles ? 1.0 : 0.0);
        }
        performCalculation(wasteAct);
        if (user != null) saveAndGamify(wasteAct, user);
        breakdown.put("waste", wasteAct.getCo2Emitted());
        total += wasteAct.getCo2Emitted();

        // 5. SHOPPING
        Activity shopAct = new Activity();
        shopAct.setCategory(ActivityCategory.ACQUISTI);
        if (req.getShopping() != null) {
            double items = req.getShopping().getClothes().getTshirt() + req.getShopping().getClothes().getJeans();
            shopAct.setValue(items);
            shopAct.setExtraParam(req.getShopping().getClothes().isSecondhand() ? 1.0 : 0.0);
        }
        performCalculation(shopAct);
        if (user != null && shopAct.getValue() > 0) saveAndGamify(shopAct, user);
        breakdown.put("shopping", shopAct.getCo2Emitted());
        total += shopAct.getCo2Emitted();

        // 6. TRAVEL
        Activity travelAct = new Activity();
        travelAct.setCategory(ActivityCategory.VIAGGI);
        if (req.getTravel() != null) {
            double hours = req.getTravel().getFlights().getShortDist() * 1.5;
            travelAct.setValue(hours);
        }
        performCalculation(travelAct);
        if (user != null && travelAct.getValue() > 0) saveAndGamify(travelAct, user);
        breakdown.put("travel", travelAct.getCo2Emitted());
        total += travelAct.getCo2Emitted();

        return new CalculationResponse(total, breakdown);
    }

    // --- Helper Privato per Salvare e dare XP (EVITA DUPLICAZIONI) ---
    private void saveAndGamify(Activity activity, User user) {
        // Clona l'attività per salvarla come nuova entità
        Activity toSave = new Activity();
        toSave.setCategory(activity.getCategory());
        toSave.setTransportType(activity.getTransportType());
        toSave.setWaterType(activity.getWaterType());
        toSave.setValue(activity.getValue());
        toSave.setExtraParam(activity.getExtraParam());
        toSave.setCo2Emitted(activity.getCo2Emitted());
        toSave.setAdvice(activity.getAdvice());
        toSave.setUser(user);

        // Calcolo XP
        int xp = calculateXp(toSave);
        user.setCurrentXp(user.getCurrentXp() + xp);

        // Level Up Logic
        if (user.getCurrentXp() >= user.getLevel() * 1000) {
            user.setLevel(user.getLevel() + 1);
        }

        // Salviamo tutto
        userRepository.save(user);
        activityRepository.save(toSave);
    }

    // --- 3. IL CERVELLO MATEMATICO ---
    private void performCalculation(Activity activity) {
        if (activity.getExtraParam() == null) activity.setExtraParam(0.0);
        if (activity.getValue() == null) activity.setValue(0.0);
        double co2 = 0.0;
        String advice = "";

        switch (activity.getCategory()) {
            case TRASPORTO:
                double kmAnnuali = activity.getValue() * DRIVING_DAYS_PER_YEAR;
                boolean isSuv = activity.getExtraParam() >= 1.0;
                double sizeFactor = isSuv ? 1.15 : 1.0;
                if (activity.getTransportType() != null) {
                    switch (activity.getTransportType()) {
                        case AUTO_BENZINA: co2 = kmAnnuali * CO2_BENZINA * sizeFactor; advice = isSuv ? "SUV inquinano molto." : "Passa a ibrido."; break;
                        case AUTO_DIESEL: co2 = kmAnnuali * CO2_DIESEL * sizeFactor; advice = "Il diesel emette NOx."; break;
                        case AUTO_GPL: co2 = kmAnnuali * CO2_GPL * sizeFactor; advice = "GPL ottima transizione."; break;
                        case AUTO_IBRIDA: co2 = kmAnnuali * CO2_IBRIDA * sizeFactor; advice = "Ibrido ok in città."; break;
                        case AUTO_ELETTRICA: co2 = kmAnnuali * CO2_ELETTRICA * sizeFactor; advice = "Elettrico top."; break;
                        case MOTO: co2 = kmAnnuali * CO2_MOTO; advice = "Moto ok."; break;
                        case MEZZI_PUBBLICI: co2 = kmAnnuali * CO2_BUS; advice = "Bus scelta green."; break;
                        case BICI_PIEDI: co2 = 0.0; advice = "Zero emissioni!"; break;
                    }
                }
                break;
            case CIBO:
                int dietType = activity.getValue().intValue();
                boolean isLocal = activity.getExtraParam() >= 1.0;
                double localFactor = isLocal ? 0.9 : 1.0;
                if (dietType == 1) { co2 = 1000 * localFactor; advice = "Dieta Vegana top."; }
                else if (dietType == 2) { co2 = 1500 * localFactor; advice = "Vegetariana ok."; }
                else if (dietType == 3) { co2 = 2500 * localFactor; advice = "Riduci carne rossa."; }
                else { co2 = 3300 * localFactor; advice = "Carne ha impatto alto."; }
                break;
            case ENERGIA:
                double hours = activity.getValue();
                int heatingType = activity.getExtraParam().intValue();
                double winterHours = hours * 150;
                if (heatingType == 1) { co2 = winterHours * 0.20 * 10; advice = "Gas standard."; }
                else if (heatingType == 2) { co2 = winterHours * 2.0 * 0.35; advice = "Elettrico poco efficiente."; }
                else if (heatingType == 5) { co2 = (winterHours * 3.0) / 4.0 * 0.35; advice = "Pompa di calore top."; }
                else { co2 = winterHours * 2.5; advice = "Isola la casa."; }
                break;
            case ACQUA:
                double litri = activity.getValue() * 12 * 365;
                if (activity.getWaterType() == WaterType.DOCCIA_CALDA) { co2 = litri * 0.035; advice = "Meno doccia calda."; }
                else { co2 = litri * 0.001; advice = "Acqua fredda ok."; }
                break;
            case ACQUISTI:
                double items = activity.getValue();
                boolean secondHand = activity.getExtraParam() >= 1.0;
                co2 = items * (secondHand ? 2.0 : 20.0);
                advice = secondHand ? "Usato ok." : "Compra meno.";
                break;
            case VIAGGI:
                co2 = (activity.getValue() * CO2_VOLO_ORA) + (activity.getExtraParam() * CO2_CROCIERA_GG);
                advice = "Viaggia meno o compensa.";
                break;
            case RIFIUTI:
                boolean recycles = activity.getExtraParam() >= 1.0;
                co2 = (activity.getValue() * 52) * CO2_SACCO_RIFIUTI * (recycles ? 0.7 : 1.0);
                advice = "Ricicla sempre.";
                break;
        }
        activity.setCo2Emitted(Math.round(co2 * 100.0) / 100.0);
        activity.setAdvice(advice);
    }

    // --- 4. CALCOLO XP ---
    private int calculateXp(Activity activity) {
        int baseXp = 50;
        int bonusXp = 0;
        Double co2 = activity.getCo2Emitted();
        if (co2 < 1.0) bonusXp = 100;
        else if (co2 < 500.0) bonusXp = 50;
        else if (co2 > 3000.0) bonusXp = 10;
        else bonusXp = 20;

        if (activity.getCategory() == ActivityCategory.TRASPORTO && activity.getTransportType() == TransportType.BICI_PIEDI) bonusXp += 50;
        if (activity.getCategory() == ActivityCategory.CIBO && activity.getValue() == 1.0) bonusXp += 30;

        return baseXp + bonusXp;
    }

    public List<Activity> getActivitiesByUserId(Long userId) {
        return activityRepository.findByUserId(userId);
    }
}