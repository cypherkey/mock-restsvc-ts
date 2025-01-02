import express from 'express'
import { v4 as uuidv4 } from 'uuid';
import { BaseModel, Empty, Member, Pagination, User } from './model'
import { Database } from './db'

export const userRouter = express.Router();

let db = new Database()

// app.get<Params,ResBody,ReqBody,ReqQuery,Locals

// GET /api/v1/Users
userRouter.get<
    Empty,
    BaseModel[] | null,
    Empty, 
    Pagination>
    ('/', (req, res) => {
  
  console.log("---------------------------------------------")
  console.log("GET USERS")
  let dbResponse = db.getall("User")
  console.log("RESULT " + dbResponse.result + " with " + JSON.stringify(<User[]>dbResponse.data))
  res.status(dbResponse.result).json(<User[]>dbResponse?.data).end()
})

// GET /api/v1/Users/:id
userRouter.get<
    BaseModel, 
    User | null, 
    Empty,
    Empty>
    ('/:id', (req, res) => {
  
  console.log("---------------------------------------------")
  console.log("REST GET USER " + req.params.id)
  let dbResponse = db.get("User", req.params.id)
  console.log("RESULT " + dbResponse.result + " with " + JSON.stringify(dbResponse.data))
  res.status(dbResponse.result).json(<User>dbResponse?.data?.at(0)).end()
})

// POST /api/v1/Users
userRouter.post<
    Empty, 
    User, 
    User,
    Empty>
    ('/', (req, res) => {
  
  req.body.id = uuidv4()
  console.log("---------------------------------------------")
  console.log("REST CREATE USER " + req.body.id + " with " + JSON.stringify(req.body))
  let dbResponse = db.add("User", req.body.id, req.body)
  console.log("RESULT " + dbResponse.result + " with " + JSON.stringify(dbResponse.data))
  res.status(dbResponse.result).json(<User>dbResponse?.data?.at(0)).end()
})

// PUT /api/v1/Users/:id
userRouter.put<
    BaseModel, 
    User, 
    User, 
    Empty>
    ('/:id', (req, res) => {

  req.body.id = req.params.id
  console.log("---------------------------------------------")
  console.log("REST UPDATE USER " + req.params.id + " with " + JSON.stringify(req.body))
  let dbResponse = db.update("User", req.params.id, req.body)
  console.log("RESULT " + dbResponse.result + " with " + JSON.stringify(dbResponse.data))
  res.status(dbResponse.result).json(<User>dbResponse?.data?.at(0)).end()
})

// DELETE /api/v1/Users/:id
userRouter.delete<
    BaseModel, 
    Empty, 
    Empty, 
    Empty>
    ('/:id', (req, res) => {

  console.log("---------------------------------------------")
  console.log("REST DELETE USER " + req.params.id)
  
  let dbResponse = db.getall("Member")
  let members : Member[] = <Member[]>dbResponse.data
  console.log("FOUND " + members.length + " MEMBERS")
  members.filter( (x) => x.user_id === req.params.id).forEach( x => { db.delete("Member", x.id )})
  
  dbResponse = db.delete("User", req.params.id)
  console.log("RESULT " + dbResponse.result)
  res.status(dbResponse.result).end()
})