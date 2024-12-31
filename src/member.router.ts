import express from 'express'
import { v4 as uuidv4 } from 'uuid';
import { BaseModel, Empty, Member, Pagination } from './model'
import { Database } from './db'

export const memberRouter = express.Router();

let db = new Database()

// app.get<Params,ResBody,ReqBody,ReqQuery,Locals

// GET 
memberRouter.get<
    Empty,
    Member[] | null,
    Empty, 
    Pagination>
    ('/', (req, res) => {
  
  console.log("---------------------------------------------")
  console.log("GET MEMBERS")
  let dbResponse = db.getall("Member")
  console.log("RESULT " + dbResponse.result + " with " + JSON.stringify(<Member[]>dbResponse.data))
  res.status(dbResponse.result).json(<Member[]>dbResponse?.data).end()
})

// GET /:id
memberRouter.get<
    BaseModel, 
    Member | null, 
    Empty, 
    Empty>
    ('/:id', (req, res) => {
  
  
  console.log("---------------------------------------------")
  console.log("GET MEMBERS " + req.params.id)
  let dbResponse = db.get("Member", req.params.id)
  console.log("RESULT " + dbResponse.result + " with " + JSON.stringify(dbResponse.data))
  res.status(dbResponse.result).json(<Member>dbResponse?.data?.at(0)).end()
})

// POST 
memberRouter.post<
    Empty, 
    Member, 
    Member,
    Empty>
    ('/', (req, res) => {
  
  req.body.id = uuidv4()
  console.log("---------------------------------------------")
  console.log("CREATE MEMBER " + req.body.id + " with " + JSON.stringify(req.body))
  let dbResponse = db.add("Member", req.body.id, req.body)
  console.log("RESULT " + dbResponse.result + " with " + JSON.stringify(dbResponse.data))
  res.status(dbResponse.result).json(<Member>dbResponse?.data?.at(0)).end()
})

// DELETE /:id
memberRouter.delete<
    BaseModel, 
    Empty, 
    Empty, 
    Empty>
    ('/:id', (req, res) => {

  console.log("---------------------------------------------")
  console.log("DELETE MEMBER " + req.params.id)
  let dbResponse = db.delete("Member", req.params.id)
  console.log("RESULT " + dbResponse.result)
  res.status(dbResponse.result).end()
})
