For my capstone I wanted to create a simple sleek application. I used Google, IMDb, Rotten Tomatoes for inspiration. 

I created a site that I named "Silver Screen" that allows the user to query movies, select a specific movie, and see details and user provided reviews.

The React frontend GUI will call the Node Express API's for all data related functions. On a search call, the backend will query a third party API provided by OMDB (https://www.omdbapi.com/). The results are slightly pruned and returned to the GUI for display. The user can then select one of the movies displayed, which calls an Express API (which calls OMDB) for movie specific information. The API also calls PostgresSQL looking for any user reviews that have been added. The results of both are joined and returned to the client to be displayed. While reviewing a specific movie, a user can Add Review which calls Express to store the review in a PostgresSQL table. The view isn't displayed until it has been approved by the site admin. The Admin page can be entered once proper credentials are provided. To confirm the user is authenticated, an Express API is called that checks an admin table in PostgresSQL and confirms the user and password both exist and match. The password is stored using BCRYPT to hash the password, and the API performs a hash comparison to confirm match. No raw password information is stored. Once an Admin is authenticated they are presented with a list of User Reviews that can either be approved or delete.


Heroku Link:  https://bottega-capstone-silverscreen.herokuapp.com/
Admin credentials: matt / test

In the application I used
 1. REACT
 2. Node Express (backend)
 3. Fetch (both sync and useEffect)
 4. JSON
 5. CSS		
 6. JavaScript
 7. HTML			
 8. Github
 9. Localstorage
10. PostgresSQL
11. BCrypt
12. Heroku

Methodologies
1. Control Structures (For Loop)
2. Algorithms (Search Bar)
3. Quality (UI and Code)
4. Project Management 
5. Functional Programming (Site Run's Well)
6. API's (OMDB / Node Express / PostgresSQL)

What I created that was not in the course:
1. Search Bar	
2. Responsive Card's	
3. Node Express
4. PostgresSQL
5. Encryption (password hashing)

PostgresSQL Tables:

Admin -
	id - serial primary key
	user - varchar(20) not null
	pass - varchar(60) not null
	
Reviews -
	id - serial primary key
	movieid - varchar(15) not null
	reviewed - date not null
	reviewer - varchar(20) not null
	rating - integer not null
	approved - boolean default false
	comment - varchar(20) not null
	