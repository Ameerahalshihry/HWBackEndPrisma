import { Request, Response } from "express"
import { prisma } from "../config/db";
import { Genre } from "@prisma/client";

export const  findMovies = async (req:Request, res:Response)=>{
    try{
        const movies = await prisma.movie.findMany()
        res.json(movies)
    }catch(error){
        console.log(error);
    }
}

export const  createMovie = async (req:Request, res:Response)=>{
    try{
        const movie = await prisma.movie.create({
            data: req.body
        })
        res.json({"msg":"movie created", "movie": movie})
    }catch(error){
        console.log(error);
    }
}

export const  updateMovie = async (req:Request, res:Response)=>{
    try{
        const movie = await prisma.movie.update({
            where:{
                id: req.params.id
            },
            data: req.body
        })
        res.json({"msg":"movie updated", "movie": movie})
    }catch(error){
        console.log(error);
    }
}

export const  deleteMovie = async (req:Request, res:Response)=>{
    try{
        const movie = await prisma.movie.delete({
            where:{
                id:req.params.id
            }
        })
        res.json({"msg":"movie deleted", "movie": movie})
    }catch(error){
        console.log(error);
    }
}

export const findMovieByName = async (req:Request, res:Response)=>{
    try{
        let movie = await prisma.movie.findFirst({
            where: {
                name: req.params.name
            }
        })
        console.log(movie);
        res.json(movie)
    }catch(error){
        console.log(error);
    }
}

export const findMovieByGenre = async (req:Request, res:Response)=>{
    try{

        const {genre} = req.params
        let movies = await prisma.movie.findMany({
            where: {
                genre: genre as Genre
        }
        })
        console.log(movies);
        res.json(movies)
    }catch(error){
        console.log(error);
    }
}
export const findMovieByRating = async (req:Request, res:Response)=>{
    try{
        let movie = await prisma.movie.findMany({
            where: {
                rating: {
                    gte: parseInt(req.params.rating)
                }
            }
        })
        console.log(movie);
        res.json(movie)
    }catch(error){
        console.log(error);
    }
}