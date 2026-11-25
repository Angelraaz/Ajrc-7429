# AjrcServicios API documentation

The site exposes two public endpoints. No authentication is required.

Machine-readable description: /.well-known/openapi.json

## GET /api/health

Returns `{"status": "ok"}` when the API is running.

## POST /api/rpc/ping

Send an empty JSON body (`{}`). Returns `{"json": {"message": "Pong! <timestamp>"}}`.

These endpoints only report status. They do not book, quote, or contact the business. For service requests, see /.well-known/agent-skills/ajrc-servicios/SKILL.md.
