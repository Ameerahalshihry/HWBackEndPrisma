import { Request, Response } from "express"
import { prisma } from "../config/db";
import { Role } from "@prisma/client";

export const  findUsers = async (req:Request, res:Response)=>{
    try{
        const users = await prisma.user.findMany()
        res.json(users)
    }catch(error){
        console.log(error);
    }
}

export const  findUserByID = async (req:Request, res:Response)=>{
    try{
        const user = await prisma.user.findFirst({
            where:{
                id: req.params.id
            },
            select:{
                id: true,
                username: true,
                email: true,
                role: true,
                joiningYear: true,
                age: true
            }
        })
        res.json(user)
    }catch(error){
        console.log(error);
    }
}

export const  findUserByEmail = async (req:Request, res:Response)=>{
    try{
        const user = await prisma.user.findFirst({
            where:{
                email: req.params.email
            },
            select:{
                username: true,
                email: true,
                role: true,
                joiningYear: true,
                age: true
            }
        })
        res.json(user)
    }catch(error){
        console.log(error);
    }
}
//findOlderUsers
export const  findOlderUsers = async (req:Request, res:Response)=>{
    try{
        const user = await prisma.user.findMany({
            where:{
                age:{
                    gt: parseInt(req.params.age)
                }
            },
            select:{
                username: true,
                email: true,
                role: true,
                joiningYear: true,
                age: true
            }
        })
        res.json(user)
    }catch(error){
        console.log(error);
    }
}

//countRole
export const countRole = async (req:Request, res:Response)=>{
    try{
        const {role} = req.params
        const users = await prisma.user.findMany({
            where:{
                role: role as Role
            },
            select:{
                username: true,
                email: true,
                role: true,
                joiningYear: true,
                age: true
            }
        })
        res.json({
            "users": users,
            "number of this role": users.length
        })
    }catch(err){
        console.log(err);
    }
}


export const  createUser = async (req:Request, res:Response)=>{
    try{
        const user = await prisma.user.create({
            data: req.body
        })
        res.json({"msg":"user created", "user": user})
    }catch(error){
        console.log(error);
    }
}

export const  updateUser = async (req:Request, res:Response)=>{
    try{
        const user = await prisma.user.update({
            where:{
                id: req.params.id
            },
            data: req.body
        })
        res.json({"msg":"user updated", "user": user})
    }catch(error){
        console.log(error);
    }
}

export const  deleteUser = async (req:Request, res:Response)=>{
    try{
        const user = await prisma.user.delete({
            where:{
                id:req.params.id
            }
        })
        res.json({"msg":"user deleted", "user": user})
    }catch(error){
        console.log(error);
    }
}

// Create endpoint that takes username and password and check if it's correct or not
export const login = async(req: Request, res: Response)=> {
    const {username, password} = req.body;
    const user = await prisma.user.findFirst({
        where: {
            username,
            password
        }
    })
    try {
        if(user)
        res.json({"message": `Welcome  ${username}!`, "user": user})
        else 
        res.json({"message": "Wrong username or password !"})

    } catch (error) {
        res.json(error)
    }
}

// Create endpoint that takes newPassword and userid , update the olduser password with the new Password

export const changePassword = async(req: Request, res: Response)=> {
    const newPassword = req.body.password;
    const user = await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            password: newPassword
        }
    })
    try {
        res.json({"user": user})
    } catch (error) {
        res.json(error)
    }
}

// Create endpoint that takes joiningYear and userid , and return if this user joined with the date that being sent or not

export const getJoinYear = async(req: Request, res: Response)=> {
    const { id } = req.params;
    const { joiningYear } = req.body;

    const user = await prisma.user.findFirst({
        where: {
            id,
            joiningYear
        },
    })
    try {
        if(user){
            res.json({"message": `${user.username} join in this year ${joiningYear}` ,"user": user})
        }else{
            res.json({"message": `user not join in this year ${joiningYear}`})
        }
    } catch (error) {
        res.json(error)
    }
}

// Create endpoint that takes joiningYear and return all the users who joined in this date or after
//getJoinYearAndAfter
export const getJoinYearAndAfter = async(req: Request, res: Response)=> {
    const users = await prisma.user.findMany({
        where: {
            joiningYear:{
                gt: req.params.joiningYear
            } 
        },
    })
    try {
        res.json({"users": users})
    } catch (error) {
        res.json(error)
    }
}