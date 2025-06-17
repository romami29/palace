FROM golang:1.24.4-alpine AS builder

# Installer les outils nécessaires
RUN apk add --no-cache \
    ca-certificates \
    git \
    tzdata \
    gcc \
    musl-dev \
    sqlite-dev

# Créer un utilisateur non-root pour la sécurité
RUN adduser -D -s /bin/sh -u 1001 appuser

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download && go mod verify
COPY . .

# Build the Go binary with CGO enabled for SQLite
RUN CGO_ENABLED=1 GOOS=linux GOARCH=amd64 \
    go build \
    -ldflags="-w -s" \
    -o ticket-api ./src/main.go

FROM scratch

COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /usr/share/zoneinfo /usr/share/zoneinfo
COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /app/ticket-api /ticket-api
COPY --from=builder --chown=1001:1001 /tmp /tmp

EXPOSE 3000

ENV PORT=3000
ENV TZ=Europe/Paris

USER 1001

ENTRYPOINT ["/ticket-api"]