import React, { useState } from "react"
import Dropzone from "react-dropzone"

const ProfilePhoto = (props) => {
  const [newPhotoUrl, setNewPhotoUrl] = useState({ image: {} })

  const addPhoto = async () => {
    const newPhotoBody = new FormData()
    newPhotoBody.append("image", newPhotoUrl.image)
    try {
      const response = await fetch("/api/v1/users/imageUrl", {
        method: "POST",
        headers: {
          Accept: "image/jpeg",
        },
        body: newPhotoBody,
      })
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      setNewPhotoUrl({ image: {} })
      location.href = "/profile"
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

  return (
    <>
      <img src={props.user.imageUrl} />
      <form>
        <Dropzone onDrop={handleImageUpload}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>
                  <span className="button-styling">Select New Photo</span>
                </p>
              </div>
            </section>
          )}
        </Dropzone>
      </form>
    </>
  )
}

export default ProfilePhoto
