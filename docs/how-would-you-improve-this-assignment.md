# How would you improve this assignment for a production ready solution

There is quite a long checklist of my *ideal* improvements before going to production.

First though I would want to dig into the requirements some more, given that there is now
a prototype to facilitate discussion. Some questions I would want to dig into would be:

* What is the use case for this proxy: is it an internal tool that is only going to be used every 2nd Tuesday of the month or a consumer facing product with an SLA to match?
* How many requests are we expecting to receive through this proxy?
* How many admin users are going to need access and do each need a separate user?
* What is our intended uptime - and how are measuring it (i.e. proportion of authenticated proxied requests returned without error)? 99%/99.9%/99.99%?
* What other KPIs do we care about for this service?
* What is the purpose of the logging requirement: is it transactionally vital data that we can never lose, or is it for gathering metrics - and what are those metrics. In other words can we get it out of the database and into a search server like elasticsearch, or perhaps reduce the requirement down metrics gathering rather than paying the price of bullet-proof db storage for every log line?
* What browsers are we going to support for the web ui and are we supporting mobile?
* How important is the UI look and feel and UX to the success of the service?

The answers to those questions will inform how 'intense' I would be about suggestions for moving into production.

Generically I would want to:

* Quickly check that there is not an existing plugin for something like nginx that could do this for us
* Establish a release process and change control - it can be as simple as deploy to heroku on 'green on main', or as complicated as PR review, followed by QA testing and signoff, and then manual documented deploy process. A baseline should be established.
* Replace hardcoded urls and constants with environment variables that can be set during deployment.
* Setup ssl certificates to secure the api requests and the static front end website.
* Add logging to a centralised logging service (something like papertrail or kibana) across both the webserver admin endpoints and the proxy endpoints.
* Add Application Performance monitoring (Datadog or Azure Insights) based on the metrics we identified as important - and to track the unexpected exceptions
* Establish an approach to postgres database schema migrations for deployment (and testing of the deployment)
* Add better styling to the web ui - a bit of material ui would lift it quickly above my programmer fugly - functional but ugly
* Make login more robust (I would consider using a third party service for this if it is appropriate) by adding checks on the number of wrong passwords, offering password reset, providing a means to logout.
* Do a round security checking for sql injections.
* Improve unit testing of the server and maybe include integration tests against postgres
* Potentially add end to end testing (i.e. cypress) against a known test postgres db, leaning on it more heavily if a large matrix of browsers/device sizes is required to be supported.

If the system is expected to see the load of thousands or tens of thousands of users requests, I would want to do a round of load testing to see how quickly we break.

If it is established that node.js logging to postgres is not enough to meet our performance requirements, based on load identified in the requirements, I would suggest the following:

* Split the administration and proxying into separate apps
* Assuming a bottleneck is found my first guess would be the postgres check for a disabled api key (and load testing could be used to confirm this). My instinct is that the list of banned api keys should be read from redis by the proxy, with the administration app responsible for keeping redis and the postgres database in sync.
* With the proxy only touching Redis when serving a request, it can be scaled horizontally and a reverse proxy put in front of the proxy servers.
* The IPFS daemon can be clustered as well, see ipfs-cluster.
* The logging requirement should be reconsidered and reshaped down if possible. If the contents of every request must be kept, then I would look to storing them in an elasticsearch cluster to avoid paying the cost of the fsync guarantee postgres imposes.
* If the node.js proxy is still not meeting requirements at this point I would consider looking at finding or developing a plugin for nginx, or writing a small proxy server in a systems language (this is not my area of expertise, but more than happy to be paid to do rust/go; C++ and you are on your own)

