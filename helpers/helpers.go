package helpers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type CrtResponse struct {
	NameValue string `json:"name_value"`
}

func GetSubdomainList(parsedDomain string) []string {
	baseUrl := fmt.Sprintf("https://crt.sh/?q=%%25.%s&output=json", parsedDomain)
	response, err := http.Get(baseUrl)
	if err != nil {
		log.Println("error fetching response from the data", err)
		return []string{}
	}
	defer response.Body.Close()

	var crtresponses []CrtResponse

	if err := json.NewDecoder(response.Body).Decode(&crtresponses); err != nil {
		log.Println("error decoding response", err)
		return nil
	}

	var uniqueSubdomain = make(map[string]bool) //this logic is to prevent duplicates entries
	var subDomainLists []string
	for _, subdomain := range crtresponses {
		if _, ok := uniqueSubdomain[subdomain.NameValue]; !ok {
			subDomainLists = append(subDomainLists, subdomain.NameValue)
			uniqueSubdomain[subdomain.NameValue] = true
		}

	}
	return subDomainLists

}
