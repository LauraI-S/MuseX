. Delete user

1. create a router in userRoutes
   router.delete (specify uurl, deleteUser)
   /deleteUser/:userId

2. userController
   create a function deleteUser(req, res)
   --go to my user model
   --find user by Id
   -- take id from params
   function that finds my user by id and delete

Test the route on postman with DELETE (not GET), with ID in params + click send to the req on postman
If user is deleted in mongodb, function works and can be tested on frontend by copy pasting the code in postman

In front end use the fetch function in your deleteUser function deleteUser(userID) and pass the userID as an argumanet to be used as a dynamic value in your fetch /deleteUser/${userID}
