import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface IRespons{
    data:IData[],
    error:[] | boolean,
    statusCode:number
}

export interface IResponsOne{                                          // CHANGE 1
    data:IData,
    error:[] | boolean,
    statusCode:number
}

export interface IData{
    id:number,
    isCompleted:boolean,
    images:IImage[],
    name:string,
    description:string
}

export interface IImage{
    id:number,
    imageName:string
}

const api = "https://to-dos-api.softclub.tj/api/"
export const img_url = 'https://to-dos-api.softclub.tj/images/'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: api }),
  tagTypes: ['Todo'],
  endpoints: builder => ({
    getTodo: builder.query<IRespons , void>({
      query: () => 'to-dos',
      providesTags: ['Todo']
    }),
    deleteTodo: builder.mutation<IData , number>({
      query: (id) => ({
        url:"to-dos",
        method:"DELETE",
        params:{id}
      }),
      invalidatesTags: ['Todo']
    }),
    addTodo: builder.mutation<IData , FormData>({
      query: newUser => ({
        url:"to-dos",
        method:"POST",
        body:newUser
      }),
      invalidatesTags: ['Todo']
    }),
    deleteImg: builder.mutation<IImage , number>({
      query:(id) => ({
        url:`to-dos/images/${id}`,
        method:"DELETE"
      }),
      invalidatesTags: ['Todo']
    }),
    completeTodo: builder.mutation<IData , number>({
      query: (id) => ({
        url:"https://to-dos-api.softclub.tj/completed",
        method:"PUT",
        params:{id}
      }),
      invalidatesTags: ['Todo']
    }),
    addImg: builder.mutation<IData , {id:number , body:FormData}>({        
      query: ({id , body}) => ({                                          
        url:`to-dos/${id}/images`,                                        
        method:"POST",
        body:body                                                         
      }),
      invalidatesTags: ['Todo']                                           
    }),
     getTodoById: builder.query<IResponsOne , number>({                
      query: (id) => `to-dos/${id}`,                                  
      providesTags: ['Todo']                                           
    }),
    editTodo: builder.mutation<IData , {id:number , name:string , description:string}>({     
      query: (body) => ({                                                                   
        url:"to-dos",
        method:"PUT",
        body:body                                                                           
      }),
      invalidatesTags: ['Todo']                                                             
    }),
  })
})

export const { useGetTodoQuery , useDeleteTodoMutation , useAddTodoMutation , useDeleteImgMutation , useCompleteTodoMutation , useAddImgMutation , useGetTodoByIdQuery , useEditTodoMutation} = apiSlice   