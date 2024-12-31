import { UUIDTypes, v4 as uuidv4 } from 'uuid';

export interface BaseModel {
    id: string,
    other?: typeof uuidv4 | null
}

export interface User extends BaseModel {
    firstname: string
    lastname: string
    gender: Gender | null
    birth_date: Date | null
    active: boolean
}

export interface Group extends BaseModel {
    name: string
    active: boolean
}

export interface Member extends BaseModel {
    user_id: string
    group_id: string
}

export interface APIResponse<Data> {
    data: Data
    message: string
}

export interface Pagination {
    page: number
    limit: number
    gender: Gender
}

export interface Empty {

}

type Gender = 'male' | 'female' | 'unspecified'
