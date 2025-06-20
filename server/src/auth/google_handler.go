package auth

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"
)

func (a *AuthService) HandleGoogleLogin(w http.ResponseWriter, r *http.Request) {
	redirectURL := fmt.Sprintf(
		"https://accounts.google.com/o/oauth2/v2/auth?client_id=%s&redirect_uri=%s&response_type=code&scope=email profile",
		a.googleClientID,
		"http://localhost:5000/api/auth/google/callback",
	)
	http.Redirect(w, r, redirectURL, http.StatusFound)
}

func (a *AuthService) handleGoogleCallback(w http.ResponseWriter, r *http.Request) {
	code := r.URL.Query().Get("code")
	if code == "" {
		http.Error(w, "Authorization code not provided", http.StatusBadRequest)
		return
	}

	// Exchange the authorization code for an access token
	tokenURL := "https://oauth2.googleapis.com/token"
	data := url.Values{}
	data.Set("client_id", a.googleClientID)
	data.Set("client_secret", a.googleClientSecret)
	data.Set("code", code)
	data.Set("redirect_uri", "http://localhost:5000/api/auth/google/callback")
	data.Set("grant_type", "authorization_code")

	resp, err := http.Post(tokenURL, "application/x-www-form-urlencoded", strings.NewReader(data.Encode()))
	if err != nil || resp.StatusCode != http.StatusOK {
		http.Error(w, "Failed to exchange authorization code", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		http.Error(w, "Failed to read response body", http.StatusInternalServerError)
		return
	}

	var tokenResponse struct {
		AccessToken string `json:"access_token"`
		IDToken     string `json:"id_token"`
	}
	if err := json.Unmarshal(body, &tokenResponse); err != nil {
		http.Error(w, "Failed to parse token response", http.StatusInternalServerError)
		return
	}

	// Retrieve user information
	userInfoURL := "https://www.googleapis.com/oauth2/v2/userinfo"
	req, _ := http.NewRequest("GET", userInfoURL, nil)
	req.Header.Set("Authorization", "Bearer "+tokenResponse.AccessToken)

	userResp, err := http.DefaultClient.Do(req)
	if err != nil || userResp.StatusCode != http.StatusOK {
		http.Error(w, "Failed to fetch user info", http.StatusInternalServerError)
		return
	}
	defer userResp.Body.Close()

	userBody, err := io.ReadAll(userResp.Body)
	if err != nil {
		http.Error(w, "Failed to read user info response", http.StatusInternalServerError)
		return
	}

	var userInfo map[string]interface{}
	if err := json.Unmarshal(userBody, &userInfo); err != nil {
		http.Error(w, "Failed to parse user info", http.StatusInternalServerError)
		return
	}

	// Handle user info (e.g., create a session, save to database, etc.)
	// For now, just return the user info as JSON
	w.Header().Set("Content-Type", "application/json")
	w.Write(userBody)
}
