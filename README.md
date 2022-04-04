
# GITHUB SEARCH 

A React app that utilizes Github's public REST API for searching users on github platform along with pagination feature.




## Demo

https://github-search-e7c45.web.app/
## API Reference

https://docs.github.com/en/rest/reference/search


## Description

App contains following features:

1) Uses ant Design as a UI library for styling and reusable components such as Table, Buttons, Tooltips and Notifications etc.
2) Supports pagination where user can navigate through next and previous buttons and also change results limit (30, 50, 75 items / page).
3) Display user's github username which when clicked routes to user's github actual profile.
4) Show proper notifications with messages incase of api throttle (i.e. api rate limit exceed, api timeout etc).
5) Display user's profile picture with magnification capability on hovering.
6) Display user's complete information in a modal such as followers, following, location, organization, bio, blogs, public repos, email and twitter username etc.

## Implementation Changes

I have tried to write the code in most neat, clean and short way. One significant change about my implementation is that I have implemented a useEffect dependency which gets called everytime a filter(i.e. pageSize, pageNumber) or SEARCH button is clicked. This useEffect invokes a function that calls github's REST API and returns data with respect to applied filters.

In this way, we don't need to call api function again and again on any filter change hence making code look more clean and short. It will also be helpful for future implementations when I need to further add sort or order filters on api call. (In this case I only need to add dependencies in my useEffect method).
## Future Improvements

I will be adding following features/improvements to my project:

1) Replace Github's REST API with Github's GraphQL API in project for better app performance because of caching mechanism using Apollo GraphQL.
2) Add custom error handling for api throttling with messages indicating exact error information.
3) Introduce sort and order features for search results.
4) Add advanced search options/identifiers (i.e. search users by username, location, email etc).
