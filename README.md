# About

"This is a frontend test project using Angular with Ionic. It was created to demonstrate skills in web development using these technologies.
The application functions as a To-Do List where tasks must be assigned to a user, who needs to be created beforehand."

## Functionalities

- Users and tasks management
- Filtering and sorting tasks by status and user
- Updating task status
- Navigation between pages

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Plinio-almd/frontend-test-selaz.git
   cd frontend-test-selaz
   ```
2. Install the dependencies:

   ```bash
   npm install
   ```
3. Run the project:

   ```bash
   npm start
   ```
3. Access via:

   ```bash
   http://localhost:4200/
   ```

## Operations

- You will land on '/users' page where um must create at least one user, filling the name and role then clicking CREATE
- A list of users will appear below. You will be able to update or delete a user by clicking on the respective buttons
- Although you can access '/tasks' page, by clicking the tasks button in the header, before having a user created, you will only be allowed to create a task if a user is found in memory
- Add a task by filling the form then click create
- A list of task will appear bellow, where you will be able to sort and filter them
- Also, each task will offer buttons to manage the tasks

## Testing
- Tests were created for the services only
- You can run the tests by typing on the terminal:

  ```bash
   npm test
  ```


Thank you for time and consideration!