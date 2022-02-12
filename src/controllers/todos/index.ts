import {Response, Request} from 'express';
import {ITodo} from '../../types/todo'
import Todo from '../../models/todo'

const getTodos = async (req: Request, res: Response): Promise<void> => {
    
    try{
        const todos: ITodo[] = await Todo.find()
        console.log('check', todos);
        res.status(200).json({todos})
    } catch (error) {
        throw error
    }
}

const countTodos = async (req: Request, res: Response): Promise<void> => {
    
    try{
        const pipeline = [
            {
              '$match': {
                'list_id': req.params.id
              }
            }, {
              '$count': 'amount'
            }
        ];
        const todos: ITodo[] = await Todo.aggregate(pipeline)
        console.log('check', todos);
        res.status(200).json({todos})
    } catch (error) {
        throw error
    }
}

const addTodo = async (req: Request, res: Response): Promise<void> => {
    // console.log('request', req);
    try{
        const body = req.body as Pick<ITodo, "title" | "description" | "list_id" | "status" | "completed" |"datePicked" | "timePicked">

        console.log('request body', body);

        const todo: ITodo = new Todo({
            title: body.title,
            description: body.description,
            list_id: body.list_id,
            status: body.status,
            datePicked: body.datePicked,
            timePicked: body.timePicked,
            completed: body.completed
        })

        const newTodo: ITodo = await todo.save()
        const allTodos: ITodo[] = await Todo.find()

        res.status(201).json({message: "Todo added", todo: newTodo, todos: allTodos})
    } catch (error) {
        console.log('error adding todo', error);
        throw error
    }
}

const updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const{ params: {id}, body} = req
        
        const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
            { _id: id},
            body
        )

        const allTodos: ITodo[] = await Todo.find()
        res.status(200).json({
            message: "Todo updated",
            todo: updateTodo,
            todos: allTodos
        })
    } catch (error) {
        throw error
    }
}

const completeTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const{ params: {id}, body} = req
        
        const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
            { _id: id},
            body
        )

        const allTodos: ITodo[] = await Todo.find()
        res.status(200).json({
            message: "Todo completed",
            todo: updateTodo,
            todos: allTodos
        })
    } catch (error) {
        throw error
    }
}

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try{
        const deletedTodo: ITodo | null = await Todo.findByIdAndDelete(req.params.id)

        const allTodos: ITodo[] = await Todo.find()
        res.status(200).json({
            message: "Todo deleted",
            todo: deleteTodo,
            todos: allTodos
        }) 
    } catch (error) {
        throw error
    }
}

const getTodoInList = async (req: Request, res: Response): Promise<void> => {
    
    try{
        const pipeline = [
            {
              '$match': {
                'list_id': req.params.id
              }
            }
        ];
        const todos: ITodo[] = await Todo.aggregate(pipeline)
        console.log('check', todos);
        res.status(200).json({todos})
    } catch (error) {
        throw error
    }
}

export {getTodos, addTodo, updateTodo, deleteTodo, countTodos, getTodoInList, completeTodo}