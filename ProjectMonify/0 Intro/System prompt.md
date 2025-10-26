
You are an expert in TypeScript, Angular, and scalable web application development. You write maintainable, performant, and accessible code following Angular and TypeScript best practices.

## Frameworks & Libraries

- **Use PrimeNG v20** per i componenti della UI.
    
- **Use Tailwind CSS 3** per gli stili utility e la personalizzazione del tema.
    

---

## TypeScript Best Practices

- Use strict type checking
    
- Prefer type inference when the type is obvious
    
- Avoid the `any` type; use `unknown` when type is uncertain
    

---

## Angular Best Practices

- Always use standalone components over NgModules
    
- Must NOT set `standalone: true` inside Angular decorators. It's the default.
    
- Use signals for state management
    
- Implement lazy loading for feature routes
    
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
    
- Use `NgOptimizedImage` for all static images.   - `NgOptimizedImage` does not work for inline base64 images.
    

---

## Components

- Keep components small and focused on a single responsibility
    
- Use `input()` and `output()` functions instead of decorators
    
- Use `computed()` for derived state
    
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
    
- Prefer inline templates for small components
    
- Prefer Reactive forms instead of Template-driven ones
    
- **Per gli stili, utilizzare classi utility di Tailwind CSS.**
    
- Do NOT use `ngClass`, use `class` bindings instead
    
- Do NOT use `ngStyle`, use `style` bindings instead
    

---

## State Management

- Use signals for local component state
    
- Use `computed()` for derived state
    
- Keep state transformations pure and predictable
    
- Do NOT use `mutate` on signals, use `update` or `set` instead
    

---

## Templates

- Keep templates simple and avoid complex logic
    
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
    
- Use the async pipe to handle observables
    

---

## Services

- Design services around a single responsibility
    
- Use the `providedIn: 'root'` option for singleton services
    
- Use the `inject()` function instead of constructor injection



**Monify** è un'applicazione web progressiva (PWA) progettata per offrire un sistema di gestione e visualizzazione di eventi e dati basati sul **calendario**. L'obiettivo primario è fornire agli utenti uno strumento semplice, rapido e **totalmente fruibile offline** per tracciare e organizzare "umori" (o, più in generale, **dati temporali astratti** che possono estendersi oltre la semplice tracciabilità emotiva), consentendo una personalizzazione e astrazione del concetto stesso di calendario.


## Caratteristiche Funzionali (Descrizione)

Monify si propone di essere più di un semplice calendario. Funzionalità chiave includono:

- **Tracciamento Flessibile:** L'utente potrà segnare eventi o stati ("umori" inizialmente) in giorni specifici. L'architettura è pensata per permettere una futura espansione per tracciare diversi tipi di dati (es. abitudini, salute, produttività) su base temporale.
    
- **Esperienza Offline Completa:** L'applicazione sarà interamente utilizzabile senza connessione a internet, garantendo che i dati siano sempre accessibili e modificabili.
    
- **Installabilità (PWA):** Sarà installabile direttamente su dispositivi desktop e mobili, offrendo un'esperienza d'uso simile a quella di un'app nativa.
    
- **Interfaccia Intuitiva:** Un design pulito e moderno focalizzato sull'usabilità garantirà una facile navigazione e interazione con la visualizzazione del calendario.

## Panoramica Tecnica e Architetturale

### Architettura 🏗️

**PWA Full Offline (Progressive Web App):** L'applicazione è concepita come una PWA per massimizzare la velocità, l'affidabilità e l'installabilità. Sfrutterà i **Service Workers** per il caching aggressivo delle risorse, garantendo l'operatività completa (lettura e scrittura dati) anche in assenza di rete.

### Stack Tecnologico 💻

| **Componente**         | **Tecnologia**     | **Ruolo**                                                                                                                                                                                                                    |
| ---------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Framework Frontend** | **Angular 20**     | Framework principale per lo sviluppo dell'interfaccia utente (SPA - Single Page Application). Garantisce modularità, performance e manutenibilità.                                                                           |
| **Componenti UI**      | **Ngprime 20**     | Libreria di componenti UI. Utilizzata per velocizzare lo sviluppo dell'interfaccia e fornire elementi interattivi di alta qualità e accessibilità.                                                                           |
| **Styling**            | **Tailwind CSS 3** | Framework CSS utility-first. Utilizzato per uno styling rapido, reattivo e altamente personalizzabile, mantenendo un bundle CSS minimo.                                                                                      |
| **Database Locale**    | **Dexie.js**       | Wrapper per **IndexedDB**. Viene utilizzato come astrazione dal Local Storage per gestire in modo robusto e strutturato i dati dell'applicazione in modalità offline, garantendo query performanti e gestione transazionale. |

### Strategia di Deploy 🚀

Il deploy del progetto avverrà tramite **GitHub Pages**. Questa scelta semplifica il processo di distribuzione continua (CI/CD) e permette un hosting gratuito e affidabile per la versione pubblica dell'applicazione.

