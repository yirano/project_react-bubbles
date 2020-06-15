import React, { useState } from "react"
import { axiosWithAuth } from './axiosWithAuth'

const initialColor = {
  color: "",
  code: { hex: "" }
}

const ColorList = (props) => {
  const { colors, updateColors } = props
  const [newColor, setNewColor] = useState(initialColor)
  const [editing, setEditing] = useState(false)
  const [colorToEdit, setColorToEdit] = useState(initialColor)

  const editColor = color => {
    setEditing(true)
    setColorToEdit(color)
  }

  const saveEdit = (e) => {
    e.preventDefault()
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => updateColors(res.data))
      .catch(err => console.log('Error with updating: ', err))
  }
  const deleteColor = e => {
    axiosWithAuth()
      .delete(`/colors/${e.target.id}`)
      .then(res => updateColors(res.data))
      .catch(err => console.log('Error deleting: ', err))
  }

  const addNew = e => {
    e.preventDefault()
    axiosWithAuth()
      .post(`/colors`, newColor)
      .then(res => updateColors(res.data))
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} id={color.id} onClick={() => editColor(color)}>
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
        <form onSubmit={e => saveEdit(e)}>
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
      <form style={{ alignItems: 'center' }} onSubmit={e => addNew(e)}>
        <input type="text" value={newColor.color} onChange={e => setNewColor({ ...newColor, color: e.target.value })} placeholder="New Color Name" />


        <input type="text" value={newColor.code.hex} onChange={e => setNewColor({ ...newColor, code: { hex: e.target.value } })} placeholder="Hex" />


        <input type="submit" value="Add!" />
      </form>
    </div>
  )
}

export default ColorList
