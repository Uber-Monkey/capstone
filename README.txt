For my capstone I wanted to create a simple sleek application. I used Google, IMDb, Rotten Tomatoes for inspiration. 

I created an single page application that I named "The Silver Screen".  It uses the OMDB (https://www.omdbapi.com/) API to query movie informtion. The front end GUI will call API's in the backend (running on Node Express), which then queries the OMDB API. The backend then returns the OMDB response to the front end GUI for parsing and display. Initial search may return multiple results, for example if a user searchs for "star". From there, a user can then select an individual movie poster to then display specific information for the selected movie.

The GUI uses a single html page for rendering, and the client JavaScript adjusts the DOM and updates the page depending upon what is returned from the backend API. I felt using and manipulating a single html page would be more of a challenge for me over using a GUI with multiple pages.


Heroku Link:  https://bottega-capstone-silverscreen.herokuapp.com/

In the application I used	Methodologies
1. Node express (backend)	1. Control Structores (For Loop)
2. Fetch			2. Algorithms (Search Bar)
3. JSON				3. Quality (Ui and Code)
4. CSS				4. Project Management 
5. JavaScript		5. Functional Programming (Site Run's Well)
6. HTML				6. API's (OMDB)
7. Github			

What I created that was not in the course:
1. Search Bar	
2. Responsive Card's	
3. Runtime event assigning.
4. Node Express
