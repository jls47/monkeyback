TO DO

Front
-Literally everything
-Mockups
-Pallette selection
-Component design



Back
-work on artist deletion when you have a chance


VISION FOR BOTH

Front
-Main page has search bar and recently added
-All pages will have the search button that expands into a bar except for song adding
-A/B test for search bar vs search button
-Adding songs needs a single login from a single login page
-Selecting genre-dropdown with "add new"?
-Are genres even needed?
-Searching artist v song-radio?  Dropdown?  What's most responsive?
-Black and white just like the rest of the website?

FRONT END COMPONENTS
Search button
Search component
Search results
Login button
Login page
Logout button
Front Page W/ most recently added
Writing form
Editing form
Delete song(s)
Delete artist(s)
SONG UPLOAD PORTION

State

WHAT WILL COMPONENTS HAVE?
SEARCH BUTTON
>Brings up the search component in a modal which is closed upon clicking "search"

SEARCH COMPONENT
>Will have the input string form, some form of input to determine by song or artist
>Includes button that closes form upon successful data return

SEARCH RESULTS
>In artists, will have clickable results that showcase songs by artist - no real need to paginate I think?
>If in edit mode make song results links to the edit form

LOGIN BUTTON
>Directs to the login page/component

LOGIN PAGE
>Username/password form.  Hardcode, include bcrypt.  Easy peasy.

LOGOUT BUTTON
>Resets state to make admin logged out.

FRONT PAGE
>Pseudo results screen with a removable message.  Add message about cookies.
>Most recently added, need timestamp.

WHAT WILL STATE HANDLE?
>logged in or out
>

Back
-Variety of API calls
-Requests as already defined
-Heroku Free tier
-Get Juan on board with some light troubleshooting?