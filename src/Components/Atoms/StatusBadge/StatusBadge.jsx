import React from 'react'

export default function StatusBadge({status}) {
    let statusStyle = "bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded";
    if(status === "paid"){
        statusStyle = "bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded";
      }
      if(status === "unpaid"){
        statusStyle = "bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded";
      }
      if(status === "overdue"){
        statusStyle = "bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded";
      }
      if(status === "draft"){
        statusStyle = "bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded";
      }
      if(status === "sent"){
        statusStyle = "bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded";
      }
      if(status === "cancelled"){
        statusStyle = "bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded";   
      }
      if(status === "pending"){
        statusStyle = "bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded";
      }
  return (
    <>
<span className={`${statusStyle} flex justify-center items-center`}>{status}</span>
    </>
  )
}
