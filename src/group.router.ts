import express from 'express'
import { v4 as uuidv4 } from 'uuid';
import { BaseModel, Empty, Group, Member, Pagination } from './model'
import { Database } from './db'

export const groupRouter = express.Router();

let db = new Database()

// app.get<Params,ResBody,ReqBody,ReqQuery,Locals

// GET /api/v1/Groups
groupRouter.get<
    Empty,
    Group[] | null,
    Empty, 
    Pagination>
    ('/', (req, res) => {
  
  console.log("---------------------------------------------")
  console.log("GET GROUPS")
  let dbResponse = db.getall("Group")
  console.log("RESULT " + dbResponse.result + " with " + JSON.stringify(<Group[]>dbResponse.data))
  res.status(dbResponse.result).json(<Group[]>dbResponse?.data).end()
})


// GET /api/v1/Groups/:id
groupRouter.get<
    BaseModel, 
    Group | null, 
    Empty, 
    Empty>
    ('/:id', (req, res) => {
  
  console.log("---------------------------------------------")
  console.log("GET GROUP " + req.params.id)
  let dbResponse = db.get("Group", req.params.id)
  console.log("RESULT " + dbResponse.result + " with " + JSON.stringify(dbResponse.data))
  res.status(dbResponse.result).json(<Group>dbResponse?.data?.at(0)).end()
})

// POST /api/v1/Groups
groupRouter.post<
    Empty, 
    Group, 
    Group,
    Empty>
    ('/', (req, res) => {
  
  req.body.id = uuidv4()
  console.log("---------------------------------------------")
  console.log("CREATE GROUP " + req.body.id + " with " + JSON.stringify(req.body))
  let dbResponse = db.add("Group", req.body.id, req.body)
  console.log("RESULT " + dbResponse.result + " with " + JSON.stringify(dbResponse.data))
  res.status(dbResponse.result).json(<Group>dbResponse?.data?.at(0)).end()
})

// PUT /api/v1/Groups/:id
groupRouter.put<
    BaseModel, 
    Group, 
    Group, 
    Empty>
    ('/:id', (req, res) => {

  req.body.id = req.params.id
  console.log("---------------------------------------------")
  console.log("UPDATE GROUP " + req.params.id + " with " + JSON.stringify(req.body))
  let dbResponse = db.update("Group", req.params.id, req.body)
  console.log("RESULT " + dbResponse.result + " with " + JSON.stringify(dbResponse.data))
  res.status(dbResponse.result).json(<Group>dbResponse?.data?.at(0)).end()
})

// DELETE /api/v1/Groups/:id
groupRouter.delete<
    BaseModel, 
    Empty, 
    Empty, 
    Empty>
    ('/:id', (req, res) => {

  console.log("---------------------------------------------")
  console.log("DELETE GROUP " + req.params.id)
  
  let dbResponse = db.getall("Member")
  let members : Member[] = <Member[]>dbResponse.data
  console.log("FOUND " + members.length + " MEMBERS")
  members.filter( (x) => x.group_id === req.params.id).forEach( x => { db.delete("Member", x.id )})

  dbResponse = db.delete("Group", req.params.id)
  console.log("RESULT " + dbResponse.result)
  res.status(dbResponse.result).end()
})