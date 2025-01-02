import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync, } from 'fs'
import { join } from 'path'
import { BaseModel, User, Group, Member } from './model'

export interface Response {
    //data:  BaseModel[] | User[] | Group[] | null | undefined
    data: any[] | null | undefined
    result: Result
}

export enum Result {
    SUCCESS = 200,
    CREATED = 201,
    NOTFOUND = 404,
    CONFLICT = 409
}
export type ResourceType = "User" | "Group" | "Member"

export class Database {
    basePath : string = './db'

    constructor() {
        if ( ! existsSync (this.basePath) ) {
            mkdirSync(this.basePath)
        }
    }
    
    createDir(path: string) {
        if ( ! existsSync (path) ) {
            mkdirSync(path)
        }

    }

    getMetadata(type : string) : Response {
        console.log("DB RESTYPES")

        let resTypes : any[] = []
        readdirSync(this.basePath).forEach( (dir, index, array) => {
            let f : string = join(this.basePath, dir, '__'+type)
            if (existsSync(f)) {
                resTypes.push(JSON.parse(readFileSync(f, 'utf8')))
            }
        })

        return { data: resTypes, result: Result.SUCCESS }
    }

    getall(resource: ResourceType) : Response {
        console.log("DB GETALL " + resource)

        let path = join(this.basePath, resource)
        if ( ! existsSync(path) ) {
            return { data: null, result: Result.NOTFOUND }
        }
        let users : BaseModel[] = []
        readdirSync(path).filter( (file) => !file.startsWith("__")).forEach(file => { users.push(JSON.parse(readFileSync(join(path, file), 'utf8'))) })
        
        return { data: users, result: Result.SUCCESS }
    }

    get(resource: ResourceType, id: string) : Response {
        console.log("DB GET " + resource + " WITH ID " + id)

        let path = join(this.basePath, resource, id)
        if (existsSync(path)) {
            return { data: [ JSON.parse(readFileSync(path, 'utf8')) ], result: Result.SUCCESS }
        } else {
            return { data: null, result: Result.NOTFOUND }
        }
    }
    
    add(resource: ResourceType, id: string, data: User | Group | Member ) : Response {
        console.log("DB ADD " + resource + " WITH ID " + id)

        let path = join(this.basePath, resource)
        this.createDir(path)
        path = join(path, id)

        if (existsSync(path)) {
            return { data: null, result: Result.CONFLICT }

        } else {
            writeFileSync(path, JSON.stringify(data), 'utf8')
            return { data: [ data ], result: Result.CREATED }
        }
    }

    update(resource: ResourceType, id: string, data: User | Group | Member ) : Response {
        console.log("DB UPDATE " + resource + " WITH ID " + id)

        let res = this.delete(resource, id)
        if ( res.result == Result.SUCCESS ) {
            return this.add(resource, id, data)
        } else {
            return res
        }
    }

    delete(resource: ResourceType, id: string) : Response {
        console.log("DB DELETE " + resource + " WITH ID " + id)

        let path = join(this.basePath, resource, id)
        if (existsSync(path)) {
            unlinkSync(path)
            return { data: null, result: Result.SUCCESS }
        } else {
            return { data: null, result: Result.NOTFOUND }
        }
    }
}