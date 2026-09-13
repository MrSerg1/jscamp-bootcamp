#!/usr/bin/env bash
# =============================================================================
# Verificación completa del ejercicio "Docker de principio a fin" (tareas 1-8)
# Ejecutar desde cualquier sitio:  bash verificar-con-docker.sh
# Requiere: Docker con daemon corriendo (Docker Desktop recomendado).
# Para la Tarea 7 (IA) se necesita Docker Desktop con Model Runner habilitado.
# =============================================================================
set -uo pipefail
cd "$(dirname "$0")"

PASS=0; FAIL=0; BACKUP=$(mktemp -d)
cleanup() {
  docker stop midu-web midu-mini midu-visitas midu-ia midu-vercel >/dev/null 2>&1 || true
  docker volume rm visitas-data >/dev/null 2>&1 || true
  [ -f "$BACKUP/t01-Dockerfile" ] && cp "$BACKUP/t01-Dockerfile" 01-por-que/Dockerfile
  [ -f "$BACKUP/t02-Dockerfile" ] && cp "$BACKUP/t02-Dockerfile" 02-hola-docker/Dockerfile
  [ -f "$BACKUP/t02-dockerfile" ] && cp "$BACKUP/t02-dockerfile" 02-hola-docker/dockerfile
  [ -f "$BACKUP/t03-server.js" ] && cp "$BACKUP/t03-server.js" 03-node-web/server.js
  [ -f "$BACKUP/t06-server.js" ] && cp "$BACKUP/t06-server.js" 06-volumenes/server.js
  rm -f 06-volumenes/data/visitas.txt
  rm -rf "$BACKUP"
}
trap cleanup EXIT

check() { # $1 = id, $2 = descripción, $3 = condición (0/ok)
  if [ "$3" -eq 0 ]; then PASS=$((PASS+1)); echo "  ✅ [PASS] $1 — $2"
  else FAIL=$((FAIL+1)); echo "  ❌ [FAIL] $1 — $2"; fi
}
wait_http() { # $1 = url — reintenta hasta 10 veces
  for i in $(seq 1 10); do curl -sf --max-time 2 "$1" >/dev/null 2>&1 && return 0; sleep 1; done; return 1
}

command -v docker >/dev/null 2>&1 || { echo "❌ docker no está en el PATH"; exit 1; }
docker info >/dev/null 2>&1 || { echo "❌ El daemon de Docker no responde (¿está Docker Desktop abierto?)"; exit 1; }
echo "Docker OK: $(docker --version)"

echo
echo "═══════════════════ TAREA 1: En mi máquina funciona ═══════════════════"
docker build -q -t por-que-node22 01-por-que >/dev/null 2>&1
OUT22=$(docker run --rm por-que-node22 2>&1)
echo "$OUT22" | head -3
echo "$OUT22" | grep -q "¡Todo funcionó!"; check T1.1 "node:22-alpine → ✅ ¡Todo funcionó!" $?

cp 01-por-que/Dockerfile "$BACKUP/t01-Dockerfile"
sed -i 's/^FROM node:22-alpine$/FROM node:16-alpine/' 01-por-que/Dockerfile
docker build -q -t por-que-node16 01-por-que >/dev/null 2>&1
OUT16=$(docker run --rm por-que-node16 2>&1); RC=$?
echo "$OUT16" | head -4
echo "$OUT16" | grep -q "ReferenceError: structuredClone is not defined"; check T1.2 "node:16-alpine → ReferenceError: structuredClone is not defined (exit $RC, esperado ≠0)" $?
cp "$BACKUP/t01-Dockerfile" 01-por-que/Dockerfile

echo
echo "═══════════════════ TAREA 2: Hola Docker ═══════════════════"
docker build -t hola-docker 02-hola-docker >/dev/null 2>&1
OUT=$(docker run --rm hola-docker 2>&1); echo "$OUT"
[ "$OUT" = "Hola desde mi primera imagen" ]; check T2.1 "La imagen imprime 'Hola desde mi primera imagen'" $?
cp 02-hola-docker/Dockerfile "$BACKUP/t02-Dockerfile"; cp 02-hola-docker/dockerfile "$BACKUP/t02-dockerfile"
sed -i 's/Hola desde mi primera imagen/Hola Docker/' 02-hola-docker/Dockerfile 02-hola-docker/dockerfile
docker build -t hola-docker 02-hola-docker > "$BACKUP/t02-build.log" 2>&1
OUT=$(docker run --rm hola-docker 2>&1); echo "$OUT"
[ "$OUT" = "Hola Docker" ]; check T2.2 "Tras cambiar solo el CMD imprime 'Hola Docker'" $?
grep -qE "CACHED|Using cache" "$BACKUP/t02-build.log"; check T2.3 "La capa FROM alpine sale como CACHED (caché reutilizada)" $?
cp "$BACKUP/t02-Dockerfile" 02-hola-docker/Dockerfile; cp "$BACKUP/t02-dockerfile" 02-hola-docker/dockerfile

echo
echo "═══════════════════ TAREA 3: App real con Node.js ═══════════════════"
docker build -t midu-web 03-node-web >/dev/null 2>&1; check T3.0 "docker build -t midu-web 03-node-web" $?
docker run -d --rm -p 3000:3000 --name midu-web midu-web >/dev/null; wait_http http://localhost:3000/
OUT=$(curl -s http://localhost:3000/); echo "$OUT"
echo "$OUT" | grep -q "¡Hola desde Node.js dentro de Docker!"; check T3.1 "GET / → mensaje por defecto" $?
OUT=$(curl -s http://localhost:3000/health); echo "$OUT"
echo "$OUT" | grep -q '"status":"ok"'; check T3.2 "GET /health → {\"status\":\"ok\"}" $?
docker stop midu-web >/dev/null
docker run -d --rm -p 3000:3000 -e SALUDO="Hola Midus" --name midu-web midu-web >/dev/null; wait_http http://localhost:3000/
OUT=$(curl -s http://localhost:3000/); echo "$OUT"
echo "$OUT" | grep -q '"mensaje":"Hola Midus"'; check T3.3 "Variable de entorno con -e SALUDO='Hola Midus'" $?
docker stop midu-web >/dev/null
docker run -d --rm -p 3000:3000 --env-file 03-node-web/.env --name midu-web midu-web >/dev/null; wait_http http://localhost:3000/
OUT=$(curl -s http://localhost:3000/); echo "$OUT"
echo "$OUT" | grep -q '"mensaje":"Hola desde .env"'; check T3.4 "Variable de entorno con --env-file .env" $?
docker stop midu-web >/dev/null
cp 03-node-web/server.js "$BACKUP/t03-server.js"
sed -i 's/¡Hola desde Node.js dentro de Docker!/Mensaje cambiado para probar la cache/' 03-node-web/server.js
docker build -t midu-web 03-node-web > "$BACKUP/t03-build.log" 2>&1
grep -qE "CACHED|Using cache" "$BACKUP/t03-build.log"; check T3.5 "Al tocar server.js, las capas de manifiestos y npm ci salen CACHED" $?
cp "$BACKUP/t03-server.js" 03-node-web/server.js

echo
echo "═══════════════════ TAREA 4: docker init ═══════════════════"
for f in Dockerfile .dockerignore compose.yaml README.Docker.md; do
  [ -f "04-docker-init/$f" ]; check T4.1 "Existe 04-docker-init/$f (generado por docker init)" $?
done
docker compose -f 04-docker-init/compose.yaml up -d --build --wait >/dev/null 2>&1
OUT=$(curl -s http://localhost:3000/); echo "$OUT"
echo "$OUT" | grep -q "¡Hola desde Node.js dentro de Docker!"; check T4.2 "docker compose up --build → la app responde en :3000" $?
docker compose -f 04-docker-init/compose.yaml down >/dev/null 2>&1
echo "  ℹ️  Para ver el asistente real: cd 04-docker-init && docker init  (o: npm run 04:init)"

echo
echo "═══════════════════ TAREA 5: Dockerfile multipaso ═══════════════════"
docker build -t midu-mini 05-multi-stage >/dev/null 2>&1; check T5.0 "docker build -t midu-mini 05-multi-stage" $?
docker run -d --rm -p 3000:3000 --name midu-mini midu-mini >/dev/null; wait_http http://localhost:3000/
OUT=$(curl -s http://localhost:3000/); echo "$OUT"
echo "$OUT" | grep -q "Imagen mínima creada con multi-stage build"; check T5.1 "GET / → JSON 'Imagen mínima creada con multi-stage build'" $?
LS=$(docker exec midu-mini ls -A /app); echo "Contenido de /app: $LS"
[ "$LS" = "dist" ]; check T5.2 "En /app solo está dist/ (sin src/, node_modules/ ni package.json)" $?
docker stop midu-mini >/dev/null

echo
echo "═══════════════════ TAREA 6: Volúmenes y bind mounts ═══════════════════"
docker build -t midu-visitas 06-volumenes >/dev/null 2>&1; check T6.0 "docker build -t midu-visitas 06-volumenes" $?
echo "— 1) Contenedor efímero:"
docker run -d --rm -p 3000:3000 --name midu-visitas midu-visitas >/dev/null; wait_http http://localhost:3000/
curl -s http://localhost:3000/visitar; echo
docker stop midu-visitas >/dev/null
docker run -d --rm -p 3000:3000 --name midu-visitas midu-visitas >/dev/null; wait_http http://localhost:3000/
OUT=$(curl -s http://localhost:3000/); echo "$OUT"
echo "$OUT" | grep -q '"contador_actual":0'; check T6.1 "Sin volumen: al recrear el contenedor el contador vuelve a 0" $?
docker stop midu-visitas >/dev/null
echo "— 2) Docker Volume:"
docker volume create visitas-data >/dev/null
docker run -d --rm -p 3000:3000 -v visitas-data:/app/data --name midu-visitas midu-visitas >/dev/null; wait_http http://localhost:3000/
curl -s http://localhost:3000/visitar; echo
docker stop midu-visitas >/dev/null
docker run -d --rm -p 3000:3000 -v visitas-data:/app/data --name midu-visitas midu-visitas >/dev/null; wait_http http://localhost:3000/
OUT=$(curl -s http://localhost:3000/); echo "$OUT"
echo "$OUT" | grep -q '"contador_actual":1'; check T6.2 "Con volumen visitas-data: el contador persiste tras eliminar el contenedor" $?
docker stop midu-visitas >/dev/null
echo "— 3) Bind mount + node --watch (hot reload):"
cp 06-volumenes/server.js "$BACKUP/t06-server.js"
docker run -d --rm -p 3000:3000 -v "$(pwd)/06-volumenes:/app" --name midu-visitas midu-visitas >/dev/null; wait_http http://localhost:3000/
OUT=$(curl -s http://localhost:3000/); echo "$OUT"
echo "$OUT" | grep -q "HOLA QUÉ PASA CHAVALES"; check T6.3 "Bind mount del proyecto: mensaje original visible" $?
sed -i 's/HOLA QUÉ PASA CHAVALES/MENSAJE EDITADO EN EL EDITOR/' 06-volumenes/server.js
sleep 3
OUT=$(curl -s http://localhost:3000/); echo "$OUT"
echo "$OUT" | grep -q "MENSAJE EDITADO EN EL EDITOR"; check T6.4 "Al editar server.js, node --watch reinicia y el cambio se ve al instante" $?
docker logs midu-visitas 2>&1 | grep -q "Restarting"; check T6.5 "Los logs muestran el reinicio automático de --watch" $?
docker stop midu-visitas >/dev/null
cp "$BACKUP/t06-server.js" 06-volumenes/server.js
rm -f 06-volumenes/data/visitas.txt

echo
echo "═══════════════════ TAREA 7 (opcional): IA local ═══════════════════"
MODEL_OK=0
if docker model pull ai/smollm2 >/dev/null 2>&1; then MODEL_OK=1
else echo "  ⚠️  docker model pull no disponible (se necesita Docker Desktop con Model Runner). Se continúa sin modelo."; fi
docker build -t midu-ia 07-ia-OPCIONAL >/dev/null 2>&1; check T7.0 "docker build -t midu-ia 07-ia-OPCIONAL" $?
docker run -d --rm -p 5000:5000 --name midu-ia midu-ia >/dev/null; wait_http http://localhost:5000/
OUT=$(curl -s http://localhost:5000/); echo "$OUT"
echo "$OUT" | grep -q "Microservicio de IA con Docker Model Runner"; check T7.1 "GET / → JSON del microservicio" $?
if [ "$MODEL_OK" -eq 1 ]; then
  OUT=$(curl -s "http://localhost:5000/ask?q=What+is+a+Docker+container+in+one+sentence"); echo "$OUT"
  echo "$OUT" | grep -q '"answer"'; check T7.2 "GET /ask responde con el modelo smollm2" $?
else
  OUT=$(curl -s "http://localhost:5000/ask?q=hi"); echo "$OUT"
  echo "$OUT" | grep -q "docker model pull"; check T7.2 "Sin modelo: 500 con el mensaje documentado de 'docker model pull'" $?
fi
docker stop midu-ia >/dev/null

echo
echo "═══════════════════ TAREA 8 (opcional): Vercel + Go ═══════════════════"
docker build -f 08-vercel-OPCIONAL/Dockerfile.vercel -t midu-vercel 08-vercel-OPCIONAL >/dev/null 2>&1; check T8.0 "docker build -f Dockerfile.vercel (multipaso Go → alpine)" $?
docker run -d --rm -p 8080:80 -e PORT=80 --name midu-vercel midu-vercel >/dev/null; wait_http http://localhost:8080/
OUT=$(curl -s http://localhost:8080/); echo "$OUT"
[ "$OUT" = "Hello from a container on Vercel 👋" ]; check T8.1 "curl :8080 → 'Hello from a container on Vercel 👋'" $?
docker stop midu-vercel >/dev/null
echo "  ℹ️  Despliegue real en Vercel (opcional, requiere cuenta): npm i -g vercel && vercel"

echo
echo "════════════════════════════ RESUMEN ════════════════════════════"
echo "  ✅ PASS: $PASS    ❌ FAIL: $FAIL"
[ $FAIL -eq 0 ] && echo "  🎉 Todas las comprobaciones superadas" || echo "  ⚠️  Hay comprobaciones fallidas: revisa la salida anterior"
