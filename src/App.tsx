// import { useState } from "react";
import "./App.css";
// import { Button } from "@/shadcn/ui/button";
// import { Alert, AlertDescription, AlertTitle } from "@/shadcn/ui/alert";

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/shadcn/ui/alert-dialog";
import Component from "./test";
import NotionKanban from "./NotionKanban";

function App() {
  return (
    <div className="flex flex-row">
      <NotionKanban />
      <div className="min-w-1/3 bg-emerald-500">
      </div>
       <div className=" bg-slate-900 text-3xl text-white font-bold underline ">
         {/* <Component /> */}
         {/* <div className="flex w-60 bg-solid bg-slate-200 rounded-xl p-4 m-4">
           <div className="flex-grow"
           the is the first container
           </div>
         </div>
         <div className=" w-60 bg-solid bg-slate-200 rounded-xl p-4 m-4">
           the is the first container
         </div>
         asdf */}
       </div>
     </div>
  );
}

export default App;
