---
title: "SENA Asset Control"
subtitle: "Inventario y préstamos con trazabilidad por serial"
summary: "Inventario y préstamos en producción en el SENA: trazabilidad por serial, roles y reservas transaccionales. Equipo de 4 full-stack."
role: "Full-stack: lógica de negocio y corrección de CRUDs"
team: "Equipo de 4 full-stack, con ownership por módulos"
period: "2026"
status: "En producción en el SENA"
stack:
  - "React"
  - "Node.js"
  - "Express"
  - "Prisma"
  - "MySQL"
  - "Docker"
metrics:
  - label: "Modelos"
    value: "11"
  - label: "Migraciones"
    value: "5"
  - label: "Estado"
    value: "En producción"
links:
  repo: "https://github.com/TheJuanRojasR/SENA-Asset-Control-System"
  demo: null
order: 2
featured: true
---

## Contexto

Gestión de inventario y solicitudes del Ambiente 104 del SENA Quirigüá. Equipos identificados por serial, préstamos y devoluciones reales, ítems compuestos y roles ADMIN/INSTRUCTOR. El sistema está en producción en el SENA y es de uso interno, sin demo pública.

## Mi rol

Equipo de 4 desarrolladores full-stack. Cada uno se encargó de módulos completos: frontend, backend y los ajustes de base de datos necesarios para que su módulo funcionara. Mi foco fue la lógica de negocio y la corrección de bugs en los CRUDs principales.

## El problema

El control manual no permitía saber qué unidad física estaba disponible, prestada o en mantenimiento, ni auditar solicitudes, entregas y devoluciones.

## Arquitectura

- React 18 + Vite + MUI 5 + Tailwind + React Query + Zustand.
- Node 20 + Express + Prisma 5 + MySQL 8.
- JWT de acceso y refresh, bcrypt, roles y Docker Compose.
- Swagger, Jest/Supertest y Vitest.

## Decisiones técnicas

1. **Unidad física, no solo cantidad.** `InventoryUnit` tiene serial, estado y ambiente; los préstamos se asignan a unidades concretas. Eso permite trazabilidad real y devoluciones verificables.
2. **Máquina de estados de solicitud.** `PENDING → APPROVED → PACKED → DELIVERED → PARTIALLY_RETURNED → COMPLETED`, con campos de auditoría por cada transición.
3. **Reservas transaccionales.** La creación de la solicitud reserva unidades dentro de `prisma.$transaction`; la aprobación, el empaque, la entrega y la devolución también son transaccionales.
4. **Ítems compuestos.** Relación padre/hijo con cantidades; al reservar un equipo se reservan sus componentes.
5. **Borrado lógico e índices** en catálogos y usuarios, con roles aplicados en middleware.

## Evidencia

- 11 modelos, 5 migraciones y 7 archivos de test de backend; `request.test.js` tiene 681 líneas.
- 9 tests de frontend, Swagger y un Docker Compose que levanta todo con una orden.
- README con credenciales de demo.

## Hardening de producción

- **Concurrencia en la reserva:** falta locking a nivel de fila o un `updateMany` condicionado al estado. Dos solicitudes simultáneas podrían reservar la misma unidad; hoy la transacción protege el flujo, pero no el locking.
- Generar el código de solicitud con una secuencia o reintento, para evitar colisiones bajo concurrencia.
- Separar configuración de producción de la de desarrollo y eliminar los secretos por defecto.
- Agregar CI y LICENSE.
