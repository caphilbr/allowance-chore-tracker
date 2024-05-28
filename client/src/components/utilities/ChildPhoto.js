import React, { useState } from "react"
import Dropzone from "react-dropzone"
import postPhoto from "./../../services/fetch/postPhoto"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ChildPhoto = (props) => {
  const [newPhotoUrl, setNewPhotoUrl] = useState({ image: {} })

  const addPhoto = async () => {
    const newPhotoBody = new FormData()
    newPhotoBody.append("image", newPhotoUrl.image)
    try {
      const apiUrl = `/api/v1/users/imageUrl/${props.child.id}`
      const response = await postPhoto(apiUrl, newPhotoBody)
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      setNewPhotoUrl({ image: {} })
      location.href = "/dashboard"
    } catch (error) {
      console.error(`Error in addPhoto Fetch: ${error.message}`)
    }
  }

  const handleImageUpload = (acceptedImage) => {
    setNewPhotoUrl({
      ...newPhotoUrl,
      image: acceptedImage[0],
    })
  }

  if (Object.keys(newPhotoUrl.image).length !== 0) {
    addPhoto()
  }

  let photo = <FontAwesomeIcon icon="fas fa-user" className="fa-6x icon-photo"/>
  if (props.child.imageUrl != null && props.child.imageUrl != "") {
    photo = <img src={props.child.imageUrl} />
  }

  return (
    <div className="child-pic">
      {photo}
      <form>
        <Dropzone onDrop={handleImageUpload}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p className="center-contents">
                  <span className="button-styling-child-pic">
                    New Photo
                  </span>
                </p>
              </div>
            </section>
          )}
        </Dropzone>
      </form>
    </div>
  )
}

export default ChildPhoto
