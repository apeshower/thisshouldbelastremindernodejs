import {Response, Request} from 'express';
import {IList} from '../../types/todo'
import List from '../../models/list'

const getLists = async (req: Request, res: Response): Promise<void> => {
    console.log('check');
    try{
        const lists: IList[] = await List.find()
        console.log('check', lists);
        res.status(200).json({lists})
    } catch (error) {
        throw error
    }
}

const getAllData = async (req: Request, res: Response): Promise<void> => {
    
    try{
        const pipeline = [
            {
              '$addFields': {
                'id': {
                  '$toString': '$_id'
                }
              }
            }, {
              '$lookup': {
                'from': 'todos', 
                'localField': 'id', 
                'foreignField': 'list_id', 
                'as': 'todos'
              }
            }, {
              '$addFields': {
                'totalTodosCount': {
                  '$size': '$todos'
                }
              }
            }
          ];
        const lists: IList[] = await List.aggregate(pipeline)
        console.log('check', lists);
        res.status(200).json({lists})
    } catch (error) {
        throw error
    }
}

const addList = async (req: Request, res: Response): Promise<void> => {
    // console.log('request', req);
    try{
        const body = req.body as Pick<IList, "title" | "color" | "status">

        console.log('request body', body);

        const list: IList = new List({
            title: body.title,
            color: body.color,
            status: body.status
        })

        const newList: IList = await list.save()
        const allLists: IList[] = await List.find()

        res.status(201).json({message: "List added", list: newList, lists: allLists})
    } catch (error) {
        console.log('error adding list', error);
        throw error
    }
}


const updateList = async (req: Request, res: Response): Promise<void> => {
    try {
        const{ params: {id}, body} = req
        
        const updateList: IList | null = await List.findByIdAndUpdate(
            { _id: id},
            body
        )

        const allLists: IList[] = await List.find()
        res.status(200).json({
            message: "List updated",
            list: updateList,
            lists: allLists
        })
    } catch (error) {
        throw error
    }
}

const deleteList = async (req: Request, res: Response): Promise<void> => {
    try{
        const deletedList: IList | null = await List.findByIdAndDelete(req.params.id)

        const allLists: IList[] = await List.find()
        res.status(200).json({
            message: "List deleted",
            list: deleteList,
            lists: allLists
        }) 
    } catch (error) {
        throw error
    }
}

export {getLists, addList, updateList, deleteList, getAllData}