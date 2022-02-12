import { Router } from "express";
import {getTodos, addTodo, updateTodo, deleteTodo, countTodos,  getTodoInList, completeTodo} from "../controllers/todos"
import { getLists, getAllData, addList, updateList, deleteList } from "../controllers/lists";

const router: Router = Router()

router.get("/todos", getTodos)

router.post("/add-todo", addTodo)

router.put("/edit-todo/:id", updateTodo)

router.put("/complete-todo/:id", completeTodo)

router.delete("/delete-todo/:id", deleteTodo)

router.get("/alldata", getAllData)

router.get("/lists", getLists)

router.post("/add-list", addList)

router.put("/edit-list/:id", updateList)

router.delete("/delete-list/:id", deleteList)

router.get("/list/:id", getTodoInList)

router.get("/count/:id", countTodos)

export default router