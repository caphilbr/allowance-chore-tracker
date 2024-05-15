import React, { useState } from "react"
import Dropzone from "react-dropzone"

const ChildPhoto = (props) => {
  const [newPhotoUrl, setNewPhotoUrl] = useState({ image: {} })
  
  const addPhoto = async (event) => {
    event.preventDefault()
    const newPhotoBody = new FormData()
    newPhotoBody.append("image", newPhotoUrl.image)
  
    try {
      const apiUrl = `/api/v1/users/imageUrl/${props.child.id}`
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Accept": "image/jpeg"
        },
        body: newPhotoBody
      })
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      location.href = "/dashboard"
    } catch (error) {
      console.error(`Error in addPhoto Fetch: ${error.message}`)
    }
  }

  const handleImageUpload = (acceptedImage) => {
    setNewPhotoUrl({
      ...newPhotoUrl,
      image: acceptedImage[0]
    })
  }

  let confirmationButton = null
  let selectNewPhotoButton = (
    <>
      <p><span className="button-styling">Select New Photo</span></p>
    </>
  )
  let imageElement = <img src={props.child.imageUrl}/>

  if (Object.keys(newPhotoUrl.image).length !== 0) {
    confirmationButton = (
      <>
        {/* <p><span className="">Preview</span></p>
        <img src={previewUrl} /> */}
        <input type="submit" className="button-styling" value="Click to Display New Photo"/>
      </>
    )
    selectNewPhotoButton = null
    imageElement = null
  }
  

  return(
    <>
      {imageElement}
      <p>{props.child.name}</p>
      <form onSubmit={addPhoto}>
        <Dropzone onDrop={handleImageUpload}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {selectNewPhotoButton}
              </div>
            </section>
          )}
        </Dropzone>
        {confirmationButton}
      </form>
    </>

  )
}

export default ChildPhoto