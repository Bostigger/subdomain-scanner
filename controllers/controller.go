package controllers

import (
	"encoding/json"
	"github.com/bostigger/subdomain-enumeration/helpers"
	"github.com/gorilla/mux"
	"log"
	"net/http"
)

func SubDomainHandler(w http.ResponseWriter, r *http.Request) {
	Vars := mux.Vars(r)
	parsedDomain := Vars["domain"]

	subdomainDomainList := helpers.GetSubdomainList(parsedDomain)

	response := map[string]interface{}{
		"domain":     parsedDomain,
		"subdomains": subdomainDomainList,
	}
	w.Header().Set("Content-Type", "application/json")
	err := json.NewEncoder(w).Encode(response)
	if err != nil {
		log.Println("error fetching sub-domain list ", err)
		return
	}
}
