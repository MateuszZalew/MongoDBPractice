const mongo = require('mongodb');

const client = new mongo.MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });

client.connect(err => {
    if (err) {
        console.log("Błąd połączenia!", err);
    } else {

        const db = client.db('test');
        const todosCollection = db.collection('todos');

        doTheToDo(todosCollection);
    }
});

function doTheToDo(todosCollection) {
    const [command, ...args] = process.argv.splice(2);

    switch (command) {
        case 'add':
            addNewTodo(todosCollection, args[0]);
            break;
        case 'delete':
            deleteTodo(todosCollection, args[0]);
            break;
        case 'update':
            markAsDone(todosCollection, args[0]);
            break;
        case 'list':
            showAll(todosCollection);
            break;
        case 'cleanup':
            deleteAllDoneTasks(todosCollection);
            break;
        default:
            console.log(`
            ### Project Todo List in MongoDB ###
            Available commands:

            add <task name> - adds a task
            list - displays all tasks (both done and still to be done)
            delete <task's ID> - deletes a task
            update <task's ID> - marks a task as 'done'
            cleanup - deletes all of the done tasks
            `);
            client.close();
            break;
    }

    client.close();
}

function addNewTodo(todosCollection, title) {

    todosCollection.insertOne({
        title,
        done: false,
    }, err => {
        if (err) {
            console.log('Błąd podczas dodawania!', err);
        } else {
            console.log(`Zadanie '${title}' pomyślnie dodane!`);
        }

        client.close();
    });
}

function deleteTodo(todosCollection, id) {

    todosCollection.find({
        _id: mongo.ObjectID(id),
    }).toArray((err, todos) => {
        if (err) {

            console.log('Nie znaleziono zadania o podanym ID!', err);

        } else if (todos.length !== 1) {

            console.log('Nie ma takiego zadania!');
            client.close();

        } else {

            todosCollection.deleteOne({
                _id: mongo.ObjectID(id),
            }, err => {
                if (err) {
                    console.log('Błąd podczas usuwania!', err);
                } else {
                    console.log(`Zadanie '${todos[0].title}' pomyślnie usunięte!`);
                }

                client.close();
            });
        }
    });
}


function showAll(todosCollection) {

    todosCollection.find({}).toArray((err, todos) => {
        if (err) {

            console.log("Błąd podczas wyświetlania wszystkich zadań!", err);

        } else {

            const todosToDo = todos.filter(todo => !todo.done);
            const todosDone = todos.filter(todo => todo.done);
            console.log(`Zadania do zrobienia: (${todosToDo.length})`);
            for (const todo of todosToDo) {
                console.log(`- ID: [${todo._id}] ${todo.title} -`);
            }
            console.log(`Zakończone zadania: (${todosDone.length})`);
            for (const todo of todosDone) {
                console.log(`- ID: [${todo._id}] ${todo.title} -`);
            }

        }

        client.close();
    });
}

function markAsDone(todosCollection, id) {

    todosCollection.find({
        _id: mongo.ObjectID(id),
    }).toArray((err, todos) => {

        if (err) {

            console.log('Błąd podczas pobierania!', err);

        } else if (todos.length !== 1) {

            console.log('Nie ma takiego zadania!');
            client.close();

        } else if (todos[0].done) {

            console.log('To zadanie jest już zakończone!');
            client.close();

        } else {

            todosCollection.updateOne({
                _id: mongo.ObjectID(id)
            }, {
                $set: { done: true },
            }, err => {
                if (err) {
                    console.log('Błąd podczas aktualizacji!', err);
                } else {
                    console.log(`Zadanie '${title}' pomyślnie zaktualizowane!`);
                }

                client.close();
            });

        }
    })
}

function deleteAllDoneTasks(todosCollection) {

    todosCollection.deleteMany({
        done: true,
    }, err => {
        if (err) {
            console.log('Błąd podczas usuwania!', err);
        } else {
            console.log(`Zakończone zadania pomyślnie usunięte!`);
        }

        client.close();
    });

}