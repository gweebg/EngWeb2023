# Application Endpoints


GET /
    Menu with all possible endpoints.

GET /people
    List of all people (only showing names).

GET /people/{id}
    Details about the person with the id {id}.

GET /people/genders
    Table with the distribution of the genders.

GET /people/genders/male
    List of all male people (only showing names).

GET /people/genders/female
    List of all female people (only showing names).

GET /people/sports
    Table with the distribution of the sports.

GET /people/sports/{sport_name}
    List of people who play the {sport_name}.

GET /people/jobs
    Top 10 jobs.
