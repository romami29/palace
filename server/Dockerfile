FROM --platform=$BUILDPLATFORM golang:1.24.4 AS builder

ARG TARGETARCH

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download && go mod verify
COPY . .

# Build the Go binary with CGO enabled for SQLite
RUN CGO_ENABLED=0 GOOS=linux GOARCH=$TARGET_ARCH \
    go build \
    -o server ./src/cmd/server/main.go
    # -ldflags="-w -s" \

FROM scratch

WORKDIR /app
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /app/server /server

EXPOSE 5000

ENTRYPOINT ["/server"]