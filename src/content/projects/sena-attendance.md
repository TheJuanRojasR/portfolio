---
title: "SENA Attendance"
subtitle: "Plataforma de asistencia académica para el SENA"
summary: "Backend de una plataforma de asistencia académica para el SENA: 23 casos de uso, roles, auditoría y motor de alertas. Equipo de 3."
role: "Backend"
team: "Equipo de 3: backend (yo), frontend (Laura y Nathalia)"
period: "2026"
status: "Proyecto de equipo"
stack:
  - "Java 21"
  - "Spring Boot 4"
  - "MongoDB"
  - "JWT"
  - "React 19"
metrics:
  - label: "Casos de uso"
    value: "23"
  - label: "Migraciones"
    value: "16"
  - label: "Roles"
    value: "3"
links:
  repo: "https://github.com/TheJuanRojasR/SENA-Attendance"
  demo: null
order: 1
featured: true
---

## Contexto

Sistema para registrar y seguir la asistencia de aprendices en las fichas de formación del SENA. Cubre cuentas y acceso, estructura académica (programas, trimestres, fichas y materias), registro de asistencia, justificaciones, alertas de inasistencia, notificaciones y dashboard por rol.

## Mi rol

Equipo de 3 personas. Backend: yo. Desarrollo inicial propio y, en la etapa final, asistencia de IA con supervisión de la implementación y validación de cada prueba. Frontend: Laura y Nathalia.

## El problema

El registro manual de asistencia y justificaciones no daba trazabilidad ni aplicaba reglas homogéneas: cupos por tipo de justificación, plazos en días hábiles, cierre de trimestre, alertas por fallas consecutivas y acumuladas. El sistema tenía que hacer cumplir esas reglas y dejar auditoría de cada cambio.

## Arquitectura

- Java 21, Spring Boot 4.0.6, MongoDB, JWT, Maven, JHipster 9.1.0, MapStruct y Mongock.
- React 19 + TypeScript + Redux Toolkit + Bootstrap 5 en el frontend.
- Capas `domain`, `repository`, `service` y `web`, con DTOs y seguridad a nivel de método.

## Decisiones técnicas

1. **Modelo documental con auditoría embebida.** `Attendance` guarda sus `AuditLog` y `Justification` sus `JustificationDetails`; las referencias entre agregados usan `@DBRef`. Ventaja: lecturas rápidas y agregados coherentes. Costo: MongoDB standalone no ofrece transacciones multi-documento, así que el registro de usuario se compensa a mano.
2. **Asistencia como upsert por materia, aprendiz y fecha.** La sesión es idempotente, se puede completar después y el backend informa si quedó incompleta. Evita duplicados y permite corregir sin perder el historial.
3. **Seguridad por rol en el servicio, no solo en el endpoint.** Un instructor solo lee sus materias; un aprendiz solo sus propios registros. `@PreAuthorize` más scoping en las consultas.
4. **Reglas de negocio explícitas.** Cupos por tipo de justificación, plazos en días hábiles, bloqueo por trimestre cerrado y alertas consecutivas y acumuladas con resolución automática.
5. **Migraciones Mongock.** 16 migraciones con rollback para cambios de esquema y datos.

## Evidencia

- 23 casos de uso documentados y un contrato de API de 1.749 líneas.
- 73 clases de test unitario, 43 de integración, 3 features de Cucumber y 37 specs de frontend.
- Los IT de las UCs principales están verdes (asistencia 43/43, justificaciones 53/53).

## Qué mejoraría

- El frontend: hoy es funcional, pero no está al nivel del backend.
- Cerrar los 4 IT legacy que dejan la suite completa en rojo y resolver las violaciones de ArchUnit y Modernizer.
- Endurecer el perfil de producción y los secretos; el compose actual usa `dev` y `secret-samples`.
- Agregar índices compuestos para las consultas de asistencia y configurar CI.
