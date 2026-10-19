# Skill: datocms-graphql

Conexión y consulta eficiente a la API GraphQL de **DatoCMS**. Incluye autenticación, estructura de peticiones, manejo de respuestas, variables y buenas prácticas de seguridad.

---

## When to Use This Skill

- Necesitas obtener contenido estructurado desde DatoCMS en proyectos web o apps.
- Quieres hacer consultas `query` o mutaciones `mutation` al Content Delivery API (CDN) o Content Management API (CMA).
- Estás implementando SSR, ISR, CSR o scripts de build que consumen datos de DatoCMS.

---

## Prerequisites

1. **Token de API** de DatoCMS (readonly para lectura, full-access para escritura).
2. Endpoint disponible en la red (acceso a `https://graphql.datocms.com/`).
3. Entorno con soporte para `fetch` (navegador moderno, Node 18+, Deno, Bun).

---

## Core Concepts

### Endpoint

| API | URL |
|-----|-----|
| Content Delivery API (solo lectura, cacheable por CDN) | `https://graphql.datocms.com/` |
| Content Management API (lectura/escritura) | `https://graphql.datocms.com/preview` o la URL específica del environment |

> Usa siempre el **Content Delivery API** para producción y lectura pública.

### Headers obligatorios

```http
Content-Type: application/json
Authorization: Bearer <TU_API_TOKEN>
```

### Método y body

Todas las consultas GraphQL se envían como **POST** con un JSON body:

```json
{
  "query": "query { ... }",
  "variables": { ... }
}
```

---

## Quick Start

### Ejemplo mínimo con `fetch` (JavaScript / TypeScript)

```typescript
const TOKEN = process.env.DATOCMS_TOKEN; // nunca hardcodees en frontend público

async function fetchDatoCMS(query: string, variables = {}) {
  const response = await fetch('https://graphql.datocms.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await response.json();

  if (json.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  return json.data;
}
```

### Ejemplo con `curl`

```bash
curl -X POST https://graphql.datocms.com/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_API_TOKEN" \
  -d '{"query": "query { __schema { types { name } } }"}'
```

---

## Query Patterns

### Consulta simple

```graphql
query Page {
  page {
    title
  }
}
```

### Consulta con variables

```graphql
query ArtworkById($id: ItemId!) {
  artwork(filter: { id: { eq: $id } }) {
    titulo
    technique
    image {
      url
      alt
    }
  }
}
```

Variables:

```json
{ "id": "1234567" }
```

### Múltiples registros (colecciones)

```graphql
query AllArtworks {
  allArtworks(orderBy: _createdAt_DESC, first: 100) {
    id
    titulo
    technique
    image {
      url(imgixParams: { w: 800, h: 600, fit: crop })
      alt
    }
  }
}
```

> Usa `imgixParams` para optimizar imágenes directamente desde la CDN de DatoCMS.

---

## Response Handling

### Respuesta exitosa

```json
{
  "data": {
    "page": {
      "title": "Galería de Arte"
    }
  }
}
```

### Respuesta con errores

```json
{
  "data": null,
  "errors": [
    {
      "message": "Invalid token",
      "locations": [{ "line": 2, "column": 3 }]
    }
  ]
}
```

**Siempre verifica:**
1. `response.ok` (status HTTP 200–299).
2. La existencia de `json.errors` antes de consumir `json.data`.

---

## Best Practices

1. **Tokens seguros**
   - En SSR/build-time: usa variables de entorno (`process.env.DATOCMS_TOKEN`).
   - En frontend público: usa **tokens de solo lectura** (readonly) y considera exponerlos solo si el contenido es público. Nunca uses tokens de escritura en el cliente.

2. **Optimización de imágenes**
   - Aprovecha `imgixParams` en campos de imagen para recortar, comprimir y servir formatos modernos (`auto=format`).

3. **Paginación**
   - Para colecciones grandes usa `first` / `skip` o cursores (`after`) para evitar respuestas masivas.

4. **Cacheo**
   - El Content Delivery API usa CDN global. Reutiliza URLs idénticas para beneficiarte del cacheo automático.

5. **Tipado (TypeScript)**
   - Genera tipos automáticamente desde el schema con herramientas como `graphql-codegen` o `@datocms/cma-client`.

---

## Troubleshooting

| Síntoma | Causa probable | Solución |
|---------|----------------|----------|
| `401 Unauthorized` | Token inválido o ausente | Revisa el header `Authorization: Bearer ...` |
| `400 Bad Request` | Query malformada | Verifica sintaxis GraphQL y variables |
| `json.errors` presente | Error de validación GraphQL | Lee `message` y `locations` para depurar |
| CORS en navegador | Consulta desde frontend sin proxy | Usa SSR, edge function o asegúrate de que el token tenga permisos CORS |
| Imágenes lentas | Sin parámetros de optimización | Agrega `imgixParams: { auto: format, w: 800 }` |

---

## Resources

- DatoCMS Content Delivery API docs: https://www.datocms.com/docs/content-delivery-api
- GraphQL spec: https://spec.graphql.org/
- DatoCMS Community: https://community.datocms.com/

---

Base directory for this skill: `<project-root>/skills/`
