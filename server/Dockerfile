FROM golang:1.24.4 AS builder

# Installer les outils nécessaires
# RUN apk add --no-cache \
#     ca-certificates \
#     git \
#     tzdata \
#     gcc \
#     musl-dev \
#     sqlite-dev

# Créer un utilisateur non-root pour la sécurité
# RUN adduser -D -s /bin/sh -u 1001 appuser

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download && go mod verify
COPY . .

# Build the Go binary with CGO enabled for SQLite
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
    go build \
    -ldflags="-w -s" \
    -o server ./src/cmd/server/main.go

FROM scratch

WORKDIR /app
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /app/server /server
# COPY --from=builder --chown=1001:1001 /tmp /tmp

EXPOSE 3000

ENV PORT=3000

# USER 1001

ENTRYPOINT ["/server"]