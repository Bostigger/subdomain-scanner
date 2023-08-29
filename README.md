<h1 align="center" id="title">subdomain scanner</h1>

https://github.com/Bostigger/subdomain-scanner/assets/52701136/4667f483-37dd-48af-962a-3ecf522ef186

<p align="center"><img src="https://res.cloudinary.com/druwas6ef/image/upload/v1693322324/jhts1nkhvsgi0juhr4y4.png" alt="project-screenshot" width="600" height="400/"></p>
<p id="description">This is the overview of the architecture behind the subdomain fetching tool. The service is primarily built in Go with a React frontend. It interfaces with crt.sh to retrieve potential subdomains for a given domain and ensures uniqueness before presenting the results to the user.</p>  
<h2>Components:</h1>
   <ul>
        <li>Main function: Entry point of the project.</li>
        <li>godotenv package: Loads assigned port from .env</li>
        <li>Mux package: Used for routing and setting up the server.</li>
        <li>Handler Functions:
            <ul>
                <li>Main handler (/{domain}): To capture and route the domain requests.</li>
                <li>subDomainHandler: Processes the domain from the URL and passes it onward.</li>
            </ul>
        </li>
        <li>GetDomainList function: Contacts crt.sh to get subdomain list.</li>
        <li>crtResponse struct: Structure for holding response from crt.sh.</li>
        <li>Unique subdomain map: Ensures uniqueness of subdomains.</li>
        <li>React Frontend: Provides UI to the user.</li>
        <li>Middleware: Enables CORS to allow React frontend to communicate with the backend.</li>
    </ul>

<h2>Flow:</h2>
<ul>
<li>Program starts and enters the Main function.</li>
<li>Mux sets the .env port and the /{domain} handler function.</li>
<li>On a request, the handler function invokes subDomainHandler.</li>
<li>subDomainHandler captures the domain from the URL and sends it to GetDomainList.</li>
<li>GetDomainList contacts crt.sh and gets the subdomain list.</li>
<li>The response from crt.sh is decoded into the crtResponse array.</li>
<li>To ensure uniqueness, a loop checks the crtResponse array against a map and only unique values are added to a new array.</li>
<li>The unique subdomain list is returned as a string array to subDomainHandler.</li>
<li>subDomainHandler encodes the response as JSON.</li>
<li>React frontend allows users to input domain and see results.</li>
</ul>
<br>

### Detailed Flow:


1. **Entry Point (Main function):** The service begins its execution here. Routing and server setup are configured via the Mux package and the .env is loaded
2. **Server Setup with Mux:** Mux initializes the .env port for the server and sets up route handlers.
3. **Domain Request Handling:** When a user inputs a domain in the React frontend, a request is sent to the go server, which gets routed to the subDomainHandler function via the /{domain} endpoint.
4. **Fetching Subdomains:** The domain from the request is captured and sent to the GetDomainList function, which contacts crt.sh to retrieve all subdomains associated with that domain.
5. **Decoding and Ensuring Uniqueness:** The response from crt.sh is decoded into an array of type crtResponse. To ensure that the subdomains are unique, a map is utilized. As we iterate over the crtResponse array, any new and unique subdomains are added to a separate array.
6. **Response Preparation:** The list of unique subdomains is converted into a JSON response and sent back to the React frontend.
7. **Displaying Results:** The React frontend processes the JSON response and displays the unique subdomains to the user.
8. **CORS:** To ensure smooth communication between our frontend and backend, a middleware named EnableCors has been added. This allows the React app to fetch data from our backend without CORS-related issues.
   <br>

<h2>Visual Architecture:</h2>
<p align="center"><img src="https://res.cloudinary.com/druwas6ef/image/upload/v1693321579/h7qq2bbfs33rtvxjtdjv.jpg" alt="project-image"></p>
<br/>

<h2>🛠️ Installation Steps:</h2>

<p>1. Clone the project</p>

```
git cone git@github.com:Bostigger/subdomain-scanner.git
```

<p>2. Navigate into the cloned folder</p>

```
cd subdomain-scanner
```

<p>3. Install the required go packages</p>

```
go mod tidy
```

<p>4. Setup your .env with the port variable</p>

```
PORT="eg.8000"
```

<p>5. Build the project</p>

```
go build main.go
```

<p>6. Run the main.go file</p>

```
go run main.go
```

<p>7. Navigate into the web directory</p>

```
cd web
```

<p>8. Install necessary packages</p>

```
npm install
```

<p>9. Run the react frontend</p>

```
npm start
```

<p>10. All set!</p>

```
Happy hacking...
```

<h2>💻 Built with</h2>

Technologies used in the project:

*   Golang
*   React
*   Tailwind css

