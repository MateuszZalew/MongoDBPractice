# Todo-List-MongoDB

Project done with Node.js and MongoDB. 

## How to use it
1. Download the zip package from git
2. Open terminal in Visual Studio Code
3. Type 'node index **option** where option is one of the following:

* add <task name> - adds a task
e.g. node index add 'make dinner'

* list - displays all tasks (both done and still to be done)
node index list

* delete <task's title> - deletes a task
e.g. node index delete 'clean a room'

* done <task's title> - marks a task as 'done'
e.g. node index done 'do the laundry'

* cleanup - deletes all of the done tasks
node index cleanup
