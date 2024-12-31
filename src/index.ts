import express from 'express'
import bodyParser from 'body-parser';
import { Group, Member, User } from './model'
import { Database } from './db'
import { userRouter } from './user.router';
import { groupRouter } from './group.router';
import { memberRouter } from './member.router';

const app = express()
app.use(bodyParser.json())
app.use(express.urlencoded( { extended : true }))
const port = process.env.PORT || 3000;

let testUsers: User[] = [
  {
    id: '1d0e0669-4dd6-4a3e-94fe-87d5e31f00cf',
    firstname: "John",
    lastname: "Doe",
    gender: "male",
    active: true,
    birth_date: null,
  },
  {
    id: '2ea766e1-93b6-4c6b-86a8-42f3c7b1825f',
    firstname: "Mary",
    lastname: "Jane",
    gender: "male",
    active: true,
    birth_date: null
  },
]

let testGroups: Group[] = [
  {
    id : '5efb08c5-006a-4cd0-be23-4ff788ef654a',
    name : 'Administrator',
    active : true
  },
  {
    id : '8271099c-186c-4430-a778-e1b2693cf786',
    name : 'User',
    active : true
  },
]

let testMember: Member[] = [
  {
    id : '0ba821e0-f057-4aaa-aeeb-71fbddc87c76',
    user_id : '2ea766e1-93b6-4c6b-86a8-42f3c7b1825f',
    group_id : '5efb08c5-006a-4cd0-be23-4ff788ef654a'
  },
  {
    id : '47070de7-3c72-4be5-a70c-2583cb7c062e',
    user_id : '1d0e0669-4dd6-4a3e-94fe-87d5e31f00cf',
    group_id : '8271099c-186c-4430-a778-e1b2693cf786'
  }
]

let db = new Database()
db.add('User', testUsers[0].id, testUsers[0] )
db.add('User', testUsers[1].id, testUsers[1] )
db.add('Group', testGroups[0].id, testGroups[0] )
db.add('Group', testGroups[1].id, testGroups[1] )
db.add('Member', testMember[0].id, testMember[0] );
db.add('Member', testMember[1].id, testMember[1] );


app.use("/api/v1/Users", userRouter);
app.use("/api/v1/Groups", groupRouter);
app.use("/api/v1/Members", memberRouter);

app.listen(port, function () {
  console.log('Mock-Server started at http://localhost:' + port);
});