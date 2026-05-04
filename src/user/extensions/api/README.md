# Custom API Routes
#
# Add your custom API route handlers here, organized by feature.
# Then add thin re-export wrappers in src/app/api/<your-route>/route.ts
#
# Example structure:
#   src/user/extensions/api/telemetry/route.ts    ← your handler
#   src/app/api/telemetry/route.ts                ← re-export: export * from '@user/extensions/api/telemetry/route'
#
# The framework never modifies this directory.
