# EcoTrack

EcoTrack è un progetto full-stack per la stima dell’impronta ambientale personale. È composto da un backend Spring Boot + MySQL e un frontend React + Vite, pensato per aiutare chiunque a capire come le abitudini quotidiane impattano sull’ambiente.

## Funzionalità principali

- Calcolo dell’impronta ambientale basato su consumo energetico, trasporti, alimentazione, rifiuti, acquisti e viaggi.
- Registrazione e login utenti.
- Salvataggio delle attività e visualizzazione dello storico personale.
- Interfaccia moderna e responsive con React, React Router e Tailwind.
- API RESTful per gestione autenticazione, calcolo e attività.

## Struttura del progetto

- `ecotrack-backend/`: backend Java con Spring Boot.
- `ecotrack-FrontEnd/`: frontend React/Vite.

## Tecnologie utilizzate

### Backend

- Java 21
- Spring Boot 4
- Spring Data JPA
- Spring Security
- MySQL
- Lombok
- Validation

### Frontend

- React 19
- Vite
- React Router DOM
- Recharts
- Framer Motion
- Tailwind CSS
- ESLint

## Configurazione locale

### Prerequisiti

- Java 21
- Maven (o usare `mvnw` incluso)
- Node.js e npm
- MySQL in esecuzione

### Database

Il backend è configurato per usare MySQL con queste impostazioni predefinite in `ecotrack-backend/src/main/resources/application.properties`:

- URL: `jdbc:mysql://localhost:3306/ecotrack_db?createDatabaseIfNotExist=true&serverTimezone=UTC`
- Username: `root`
- Password: ` ` (vuota)

Se necessario, modifica `application.properties` con le credenziali del tuo ambiente.

## Avviare il progetto

### 1. Backend

Apri una console nella cartella `ecotrack-backend` e avvia il server:

```powershell
cd ecotrack-backend
./mvnw spring-boot:run
```

Oppure con Maven installato:

```powershell
cd ecotrack-backend
mvn spring-boot:run
```

Il backend sarà disponibile su `http://localhost:8080`.

### 2. Frontend

Apri un’altra console nella cartella `ecotrack-FrontEnd` e installa le dipendenze:

```powershell
cd ecotrack-FrontEnd
npm install
npm run dev
```

Il frontend verrà avviato tramite Vite, normalmente su `http://localhost:5173`.

## Endpoint API principali

### Autenticazione

- `POST /register`
  - Registra un nuovo utente.
  - Payload: oggetto `User` con username, password e altri dati utente.

- `POST /login`
  - Effettua il login.
  - Payload: `LoginRequest` con `username` e `password`.

### Calcolo e attività

- `POST /api/calculate?userId={userId}`
  - Calcola l’impronta ambientale dell’utente e può salvare i risultati.
  - Payload: `CalculationRequest` con i dati di consumo e stile di vita.

- `POST /api/activities/{userId}`
  - Salva una nuova attività per l’utente.

- `GET /api/activities/{userId}`
  - Recupera lo storico delle attività dell’utente.

## Sviluppo e personalizzazioni

- Il frontend usa `react-router-dom` per la navigazione tra pagine.
- La logica del calcolo risiede nel backend e viene esposta tramite l’endpoint `/api/calculate`.
- In produzione, puoi sostituire la configurazione MySQL con un servizio cloud o un altro database compatibile.

## Note utili

- Assicurati che MySQL sia in esecuzione prima di avviare il backend.
- Se il backend e il frontend girano su porte diverse, il CORS è già abilitato con `@CrossOrigin(origins = "*")`.
- Per migliorare sicurezza e autenticazione, valuta l’aggiunta di JWT o sessioni gestite.

## Possibili estensioni future

- Aggiungere autenticazione JWT e refresh token.
- Migliorare l’interfaccia con grafici e statistiche personalizzate.
- Supportare più lingue.
- Creare report scaricabili o confronti tra periodi.

---

**EcoTrack** è un progetto pensato per trasformare dati quotidiani in consapevolezza ambientale, con un backend robusto e un frontend dinamico.
