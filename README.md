# P-8-comments sytem
_course project_

## What is the main objective of this project?

Create the client side for a comments module of a blog.

## What is the app's functionality?

With this app, user can:

1. Add comments. Obviously. Since the project does not involve creating the server side, data is saved in the localStorage.
2. Reply to existing comments.
3. Set a maximum length for comments of 1.000 characters. On crossing this limit, the user is not allowed to post a comment i.e. the comment submission button becomes inactive.
4. Increment or decrement a comment rating by one. Each user can only change the rating once. Rating data is also stored in the localStorage.
5. Add comments to favorites. Once the comment is added to favorites, the button icon and text will change. If the user clicks the button again, the status changes and the comment is no longer marked as a favorite.
6. Sort all comments by various parameters such as _favorites_, _date of publication_, _number of ratings_, _number of replies_. By default, all comments are sorted by date.

## What skills did I improve through completing this project?
* TypeScript
* ES6 classes
* Handling ES6 modules
