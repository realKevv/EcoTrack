package it.ecotrack.exception;

import java.util.List;

public class UsernameTakenException extends RuntimeException {


    private final List<String> tips;


    public UsernameTakenException(String message, List<String> tips){
            super(message);
            this.tips = tips;

    }

    public List<String> getTips() {
        return tips;
    }
}
