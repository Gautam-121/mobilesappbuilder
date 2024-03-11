import React from 'react'
import styles from './videoEdit.module.css'

export default function VideoEdit({data}) {
  return (
    <div
    style={data.isEditVisible ? {} : { display: "none" }}
    className="editPopupContainer"
    >


    </div>
  )
}
