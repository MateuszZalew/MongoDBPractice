# Todo-List-MongoDB

Project done with Node.js and MongoDB. 

## How to use it
1. Download the zip package from git
2. Open terminal in Visual Studio Code
3. Type <code>node index **option**</code> where option is one of the following:

* add <task name> - adds a task
e.g. <code>node index add 'make dinner'</code>

* list - displays all tasks (both done and still to be done)
<code>node index list</code>

* delete <task's title> - deletes a task
e.g. <code>node index delete 'clean a room'</code>

* done <task's title> - marks a task as 'done'
e.g. <code>node index done 'do the laundry'</code>

* cleanup - deletes all of the done tasks
<code>node index cleanup</code>
