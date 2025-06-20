package auth

import (
	"fmt"
	"net/http"
)

type AuthService struct {
	googleClientID       string
	googleClientSecret   string
	facebookClientID     string
	facebookClientSecret string
	appleClientID        string
	appleClientSecret    string
}

func NewAuthService(googleClientID, googleClientSecret, facebookClientID, facebookClientSecret, appleClientID, appleClientSecret string) *AuthService {
	return &AuthService{
		googleClientID:       googleClientID,
		googleClientSecret:   googleClientSecret,
		facebookClientID:     facebookClientID,
		facebookClientSecret: facebookClientSecret,
		appleClientID:        appleClientID,
		appleClientSecret:    appleClientSecret,
	}
}

func (a *AuthService) HandleGoogleLogin(w http.ResponseWriter, r *http.Request) {
	redirectURL := fmt.Sprintf(
		"https://accounts.google.com/o/oauth2/v2/auth?client_id=%s&redirect_uri=%s&response_type=code&scope=email profile",
		a.googleClientID,
		"http://localhost:5000/api/auth/google/callback",
	)
	http.Redirect(w, r, redirectURL, http.StatusFound)
}

func (a *AuthService) HandleFacebookLogin(w http.ResponseWriter, r *http.Request) {
	redirectURL := fmt.Sprintf(
		"https://www.facebook.com/v10.0/dialog/oauth?client_id=%s&redirect_uri=%s&response_type=code&scope=email public_profile",
		a.facebookClientID,
		"http://localhost:5000/api/auth/facebook/callback",
	)
	http.Redirect(w, r, redirectURL, http.StatusFound)
}

func (a *AuthService) HandleAppleLogin(w http.ResponseWriter, r *http.Request) {
	redirectURL := fmt.Sprintf(
		"https://appleid.apple.com/auth/authorize?client_id=%s&redirect_uri=%s&response_type=code&scope=email name",
		a.appleClientID,
		"http://localhost:5000/api/auth/apple/callback",
	)
	http.Redirect(w, r, redirectURL, http.StatusFound)
}
