import React, { useState } from "react"
import axios from "axios"
import { axiosWithAuth } from './axiosWithAuth'

const initialColor = {
  color: "",
  code: { hex: "" }
}

const ColorList = (props) => {
  const { colors, updateColors } = props
  const [editing, setEditing] = useState(false)
  const [colorToEdit, setColorToEdit] = useState(initialColor)

  const editColor = color => {
    setEditing(true)
    setColorToEdit(color)
    console.log(color)
  }

  const saveEdit = (e) => {
    e.preventDefault()
    axiosWithAuth()
      .put(`/colors${e.target.id}`)
      .then(res => console.log(res))
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  }
  const deleteColor = e => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/colors/${e.target.id}`)
      .then(res => updateColors(res.data))
      .catch(err => console.log('Error deleting: ', err))
  }



  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} id={color.id} onClick={(e) => editColor(color)}>
            <span id={color.id}>
              <span className="delete" id={color.id} onClick={e => {
                e.stopPropagation()
                deleteColor(e)
              }
              }>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  )
}

export default ColorList
