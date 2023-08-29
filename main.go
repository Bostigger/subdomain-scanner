package main

import (
	"github.com/bostigger/subdomain-enumeration/controllers"
	"github.com/bostigger/subdomain-enumeration/middleware"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}
	r := mux.NewRouter()
	r.Use(middleware.EnableCORS)
	r.HandleFunc("/{domain}", controllers.SubDomainHandler).Methods("GET")
	log.Fatal(http.ListenAndServe(":"+port, r))

}
