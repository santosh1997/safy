# Safy
#### It's an application to store and share your files safely


Use the following commands to the run the application:
- docker-compose build
- docker-compose up 

It might ~5 minutes to setup the datastore for the first time. All the request to datastore before that will be failing


### Overview:
1. User will be able to login on the platform using email address and password.
1. Logged-in user will be able to see a list of all the files that have been uploaded before. This list is private and will be not visible to other users on the platform or external parties.
1. Logged-in user will be able to delete an already uploaded file.
1. Logged-in user will be able to upload a new file. Once uploaded, the platform will figure out the file type, it encrypts and stores the file.
1. Logged-in user will be able to share one of my files publicly using a tiny URL obtained from the system.
