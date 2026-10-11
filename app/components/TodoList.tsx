"use client";

import { useState } from "react";
import Link from "next/link";
import {
  img_url,
  useAddImgMutation,
  useAddTodoMutation,
  useCompleteTodoMutation,
  useDeleteImgMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
  useGetTodoQuery,
} from "../store/todoStore";

const TodoList = () => {
  const { data } = useGetTodoQuery();

  const [deleteUser] = useDeleteTodoMutation();
  const [deleteImg] = useDeleteImgMutation();
  const [completeTodo] = useCompleteTodoMutation();
  const [addImg] = useAddImgMutation();
  const [editTodo] = useEditTodoMutation();

  const [addUser] = useAddTodoMutation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const [newImages, setNewImages] = useState<File[]>([]);
  const [todoId, setTodoId] = useState<number | null>(null);

  const [editId, setEditId] = useState<number | null>(null);

  const Submit = (e: any) => {
    e.preventDefault();

    if (editId !== null) {
      if (name.trim() === "" || description.trim() === "") return;
      editTodo({ id: editId, name, description });
      setEditId(null);
    } else {
      const fromdata = new FormData();
      fromdata.append("Name", name);
      fromdata.append("Description", description);
      images.forEach((image) => fromdata.append("Images", image));
      addUser(fromdata);
    }

    setName("");
    setDescription("");
    setImages([]);
  };

  const AddImage = (e: any, id: number) => {
    e.preventDefault();
    if (todoId !== id || newImages.length === 0) return;

    const fromdata = new FormData();
    newImages.forEach((image) => fromdata.append("Images", image));
    addImg({ id, body: fromdata });

    e.target.reset();
    setNewImages([]);
    setTodoId(null);
  };

  const Cancel = () => {
    setEditId(null);
    setName("");
    setDescription("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto">
        <form
          onSubmit={Submit}
          action=""
          className="flex flex-wrap justify-center gap-2 mb-6 bg-white p-3 rounded-xl shadow max-w-md mx-auto"
        >
          <input
            className="border rounded px-2 py-1"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name=""
            id=""
          />
          <input
            className="border rounded px-2 py-1"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name=""
            id=""
          />
          {editId === null && (
            <input
              className="w-44 text-xs"
              type="file"
              multiple
              onChange={(e) => setImages(Array.from(e.target.files ?? []))}
              name=""
              id=""
            />
          )}
          <button
            className="bg-blue-500 text-white rounded px-3 py-1 hover:bg-blue-600"
            type="submit"
          >
            {editId === null ? "Add" : "Save"}
          </button>
          {editId !== null && (
            <button
              className="bg-gray-200 rounded px-3 py-1 hover:bg-gray-300"
              type="button"
              onClick={Cancel}
            >
              Cancel
            </button>
          )}
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.data?.map((e) => {
            return (
              <div
                key={e.id}
                className="bg-white rounded-xl shadow p-4 text-center"
              >
                <div className="flex flex-wrap justify-center gap-2 mb-3">
                  {e.images.map((el) => (
                    <div key={el.id}>
                      <img
                        className="w-16 h-16 object-cover rounded-lg"
                        src={`${img_url}/${el.imageName}`}
                        alt=""
                      />
                      <button
                        className="text-xs text-red-500 hover:underline"
                        onClick={() => deleteImg(el.id)}
                      >
                        remove
                      </button>
                    </div>
                  ))}
                </div>
                <h2 className="font-bold text-lg">{e.name}</h2>
                <h3 className="text-gray-500">{e.description}</h3>
                <p
                  onClick={() => completeTodo(e.id)}
                  className={`cursor-pointer text-sm font-medium my-2 ${e.isCompleted ? "text-green-500" : "text-red-500"}`}
                >
                  {e.isCompleted ? "Active" : "Inactive"}
                </p>
                <form
                  onSubmit={(ev) => AddImage(ev, e.id)}
                  className="flex justify-center items-center gap-2 my-3"
                >
                  <input
                    className="w-40 text-xs file:mr-2 file:rounded file:border-0 file:bg-gray-100 file:px-2 file:py-1"
                    type="file"
                    multiple
                    onChange={(ev) => {
                      setNewImages(Array.from(ev.target.files ?? []));
                      setTodoId(e.id);
                    }}
                    name=""
                    id=""
                  />
                  <button
                    className="bg-gray-200 rounded px-2 py-1 text-xs hover:bg-gray-300"
                    type="submit"
                  >
                    Add
                  </button>
                </form>
                <div className="flex justify-center gap-2">
                  <button
                    className="bg-blue-500 text-white rounded px-3 py-1 hover:bg-blue-600"
                    onClick={() => {
                      setEditId(e.id);
                      setName(e.name);
                      setDescription(e.description);
                    }}
                  >
                    Edit
                  </button>
                  <Link
                    href={`/info/${e.id}`}
                    className="bg-gray-700 text-white rounded px-3 py-1 hover:bg-gray-800"
                  >
                    Info
                  </Link>
                  <button
                    className="bg-red-500 text-white rounded px-3 py-1 hover:bg-red-600"
                    onClick={() => deleteUser(e.id)}
                  >
                    Del
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
