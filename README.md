# Install process
Pull image and create network (only need to do this once)
Register for docker hub. (free)
Install docker software: https://docs.docker.com/get-docker/ 
In the terminal, run
docker pull peterchen01/meep_image
docker network create redis-net
docker run --name meep_celery -w /home/research-webapp-back/ --network redis-net -it meep_image /bin/bash -c "service redis-server start; /root/miniconda3/bin/conda run -n mp celery -A music.celery_task.celery worker --loglevel=info"

docker run --name meep_django -w /home/research-webapp-back/ --network redis-net -p 8000:8000 -it meep_image  /root/miniconda3/bin/conda run -n mp python /home/research-webapp-back/manage.py runserver 0.0.0.0:8000 –insecure

Start website
In the command line, type: 
docker start meep_celery
docker start meep_django
or in the Docker hub GUI, start the 
 
Visit website
Go to 127.0.0.1:8000 to use the website.

Setup process
sudo service redis-server start
python manage.py runserver
celery -A music.celery_task.celery worker --loglevel=info
The application requires a frontend server and backend server. It also requires redis server and celery task runner. 
The frontend server requires the npm install. 

# Simulation process
1.	Understand what kind of simulation type you want to implement.
2.	Use different shapes.
3.	Click start in the simulation box
4.	 
5.	Once simulation is finished, the progress will reach 100%.
6.	The results will be automatically updated in the plot box and the results explorer tab. The first plot is the squared value of the electrical field of the simulation results. The second plot is the structure of the simulation.
7.	The view can be change via the visualization tab.
8.	All the views are also available in the Results Explorer tab.
9.	The result data analysis can be downloaded from the download: mean, raw of the results. Mean is the mean and standard deviation of the squared electrical field strength. Raw is the raw integrated square electrical field.


# Structure	rms	Log res
Structure of the simulation.
Different epsilon is different shades of grey. Red line is the source.
 	The mean squared of the electrical field. 
 	The logarithmic of the rms plot.
 
View only particles	video	Eps
View with only the matric not including the surrounding environment electrical field.
 	The transient view of the electrical field propagation.
 	The epsilon value of the structure. Similar to structure.
 

Structure editor
 
The particle and source location can be dragged. Corresponding changes will be reflected in the simulation configuration.
Note: the size of the simulation does not respond to the change in the configuration change.
It can only be used in conjunction with checker, voronoi and effective medium geometry at this moment. 

# Parameter sweeping
All the parameters labelled with param, start, end, steps are sweeping parameters. This means when they are specified, their values will be converted to steps number of values, each value will be used in one particular simulation. Their results will be pooled together and returned in the form of mean and standard deviation values. 
Caution that only 2 sweeping value of non 1 step values can be specified because returning none 2 dimensional mean and standard deviation matrix is not implemented. 
When producing parameter sweeping, please turn off visualization. Because visualization requires resources which slows down the simulation process. And only the last frame will be displayed, which mean waste of resources. 
Additional operations
One the bottom right corner, there are 3 buttons for additional operation on the configuration. 
 
# Reset config
The configuration is reset to a default configuration. 
Download or save config
By specifying a name in the filename, the configuration can be saved online in the owner’s account or downloaded locally.
 
Load from local or online config
 
One of the saved configuration can be used to repopulate the configuration fields. 
 
Configuration can be uploaded
Accounts
Accounts are currently not implemented because of the limited resources came with one server. But user still have to login in order to conduct simulations. 
Configurations
Different config and their meanings.
Important config: 
Section	Name	Choice	Description
Simulation	sim types*	1.	Checker
2.	Shape
3.	Effective medium
4.	Voronoi	1.	Geometry shape in certain sequence.
2.	Made up by individual particles. Whose location can be specified.
3.	Calculate effective medium of the rock based on the composition of the rock.
4.	Generate Voronoi geometry and use it to simulate.
Geometry	Shape	1.	Sphere
2.	Triangle
3.	Hexagon
4.	Cube 	Different shapes that can be generated.
More complex geometry can be made up from these simple shapes.
			
*correspond to the change of sim types, Geometry section of the configuration will change. Only the relevant configuration field will be retained. Corresponding retain field is explained below.

Choice	Retained fields	description
Checker	Particle area or volume	The particle size of the checker
	Fill factor	The percentage of the space filled by the particles
	Shape	The shape of the particles should take on
		
Shape	Particle area or volume	The particle size of the shape
	Rotation	The rotation of the particles
	Num particles	Number of particles included
	Shape	Same as above shape
	Particle locations	The location specification for each particle
		
Effective medium		None
		
Voronoi	Num particles vor 	The number of particles for Voronoi
	Rand seed	The random integer seed for random generation.
		


Unimportant config: 
Section	Name	Description
Visualization	Frame speed	The frame speeds the electrical field is played at.
General	Gen vor	Whether to regenerate the voronoi geometry. 
If the option is not checked, the simulation will use existing voronoi geometry is one is saved automatically earlier.
If the option is checked, the server will regenerate the voronoi regardless.
Simulation	Change res	Whether the resolution of the simulation is automatically changed to adapt to the smaller particles.
	Dimension	The dimension of the simulation
	Resolution	The resolution of the simulation
	Time	The time of the simulation
	Start factor	The starting time to determine when the transient state finishes and the integration of the electrical field start. 
It factors in the source wavelength and the size of the simulation field.
	Out every	Every integration time stamp.
A value of 2 means that a snapshot of the field value is taken out every 2 simulation time units. 
The longer the time stamps are, the less frequent the simulation integration is taken. 
Setting this value consider the wavelength of the source.
	Save every	How many out every frames to integrate is taken over. 
A value of 10 means that the integration is taken over every 10 snapshots of the field values. 
Geometry	particle size t	Whether the particles size is fixed or following a gaussian distribution
	Solid center	The center of the simulation solid
	Solid size	The size
	Cell size	The size of the simulation cell
	Eps value	The epsilon values that can be assigned to the component parts.
	Component	The component eps values. 
When the sim types is checker or voronoi, the components can be increased. This means that the more component can be randomly assigned to the different particles in checker or voronoi. 
	Pm thick	The thickness of the pml layer. 
Source	Mode	The mode of the source.
1.	Normal: normal plane wave.
2.	Gaussian: wave with Gaussian strength profile. 
	Size	The size of the source.
	Center	The center location
	Fcen	The frequency of the wave, in units of GHz.
	Titl angle	If the wave is in Gaussian mode, the tilt of the source beam. 
	Sigma	The spreadness of the source beam. 
	Amp	The amplitude of the wave.
	Fwidth 	The focusness of the beam in the frequency domain. 


# Problems encountered and solved:
I encountered an interesting problem where the react script cannot access Bokehjs, which is included from an external script tag.
This is a common pattern problem because not every js library is in npm.
Firstly, I hypothesis the problem being the script is loaded after the react script. This turns out to be true. As I moved the script loading into component did mount, the console.log(window) is able to show Bokeh, however, window.Bokeh is still showing nothing. 
I found on stackoverflow the problem pattern is similar to 
 <div id="react"></div>
 <script type="text/javascript" src="/static/bundles/main-hash.js" ></script>
 <script>
   window.userData = {a: 1, b:2}
 </script>
 where console.log(window, window.userData) returns Window undefined
The accepted solution is moving the script before the react component. 
Another hypothesis arised is that the console log is a reference to window object, which is updated on view. possibly the bokeh object is just a reference in the window object for the time being. It has to go through the initializaton process first. 
So the problem becomes how do I issue a callback when the Bokeh script is actually loaded and ready to pounce. Following the lead of this answer https://stackoverflow.com/questions/7718935/load-scripts-asynchronously#7719185, I was able to successfully implement the solution. 
<script>
    function loadScript(url, callback = null) {
        let r = false;
        const script = document.createElement("script");
        script.src = url;
        script.async = false;
        script.onload = script.onreadystatechange = function () {
            if (!r) {
                r = true;
                callback && callback();
            }
        };
        document.body.appendChild(script);
    }
</script>
the important points lies in the callback function.
After putting the plotting logic within the callback function, the script is able to function approprately.

lesson learnt,
1. the window object is just a reference in console log and doesn't reflect the true state of the object at the time stamp.
2. the append child script and the actual loading and execution of the script is done asynchronously. 


after a lot of struggle with Bokeh plot, I discovered mpld3, a python library that can generate interactive web plot. Which means all the plotting facility that I have developed in Python can be used with no further modification. This is a huge plus. I would say I wasted those time on the Bokeh plot because even though it's not useful in this instance, it is still useful knowledge. 

After turning on the backend server for user authentication, interesting error arised for CORS policy. This error is strage because most of the code is from the previous implementation which worked and this error happens from time to time sparatically following no discernable pattern. 
by changing to 
<script>
    CORS_ORIGIN_WHITELIST = (
    'http://localhost:3000',
    'http://127.0.0.1:3000'
)
</script>
fixed the problem.

lessons learnt:
1. localhost != 127.0.0.1
2. encoding of string sometimes can cause unfortuantable things to happen.



it keeps saying it need a valid parsed gql document.
<script>
    client.writeQuery({ IS_LOGGED_IN_QUERY, data: { isLoggedIn: true } });
</script>
turns out, I forgot the query key for the write query dictionary.


working with cache of Apollo
https://www.apollographql.com/docs/react/caching/cache-interaction/
<script>
const { todo } = client.readQuery({
  query: gql`
    query ReadTodo($id: Int!) {
      todo(id: $id) {
        id
        text
        completed
      }
    }
  `,
  variables: {
    id: 5,
  },
});
</script>
like normal query, however, the query is not made to the server. 

<script>
const todo = client.readFragment({
  id: 'Todo:5', // The value of the to-do item's unique identifier
  fragment: gql`
    fragment MyTodo on Todo {
      id
      text
      completed
    }
  `,
});
</script>
the fragment is a reusable piece of query that defines some fields.

<script>
const query = gql`
  query MyTodoAppQuery {
    todos {
      id
      text
      completed
    }
  }
`;

// Get the current to-do list
const data = client.readQuery({ query });

// Create a new to-do item
const myNewTodo = {
  id: '6',
  text: 'Start using Apollo Client.',
  completed: false,
  __typename: 'Todo',
};

// Write back to the to-do list, appending the new item
client.writeQuery({
  query,
  data: {
    todos: [...data.todos, myNewTodo],
  },
});
</script>
unlike writeQuery and writeFragment, cache modify completely change the state of the object without merging.

<script>
cache.modify({
  id: cache.identify(myObject),
  fields: {
    name(cachedName) {
      return cachedName.toUpperCase();
    },
  },
  /* broadcast: false // Include this to prevent automatic query refresh */
});
</script>
