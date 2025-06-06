import { t } from 'elysia';

// Validation schema for creating a new drilling project
export const createProjectSchema = t.Object({
  clientId: t.String(),
  location: t.Object({
    address: t.String(),
    latitude: t.Number(),
    longitude: t.Number()
  }),
  expectedDepth: t.Number()
});

// Type derived from the schema
export type CreateProjectRequest = typeof createProjectSchema.static;