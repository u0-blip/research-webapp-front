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