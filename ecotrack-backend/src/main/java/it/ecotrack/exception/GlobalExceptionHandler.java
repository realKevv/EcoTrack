package it.ecotrack.exception;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;


@RestControllerAdvice //Ascolto gli errori di TUTTI i controller"
        public class GlobalExceptionHandler {
                @ExceptionHandler(MethodArgumentNotValidException.class)
                     public ResponseEntity<Map<String, String>> handleValidationErrors(MethodArgumentNotValidException ex) {
                         Map<String, String> errors = new HashMap<>();

                         // Estrae il campo colpevole e il messaggio (es. "deve essere positivo")
                            ex.getBindingResult().getFieldErrors().forEach(error ->
                            errors.put(error.getField(), error.getDefaultMessage())
                          );

                          return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
                        }

        }