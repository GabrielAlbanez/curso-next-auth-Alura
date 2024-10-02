"use client"
import Image from "next/image"
import { Button } from "../Button"
import { useState } from "react"
import avatarDefault from './avatarDefault.webp'
import styles from "./profile-avatar.module.css"

export const ProfileImageUploader = ({ user }) => {

    const [image, setImageSrc] = useState(user.avatar ?? user.image ?? avatarDefault)
    const [newAvatar, setNewAvatar] = useState(null)
    const handleFileChange = (event) => {

        const file = event.target.files[0]

        if (file) {
            setNewAvatar(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setImageSrc(reader.result)
            }
            reader.readAsDataURL(file)
        }



    }

    function uploadAvatar(event){
        event.preventDefault()
        fetch('/api/profile', {
            method : "POST",
            body : newAvatar
        })

    }


    if (!user) {
        return null
    }


    return (<>
        <ul>
            <li style={{ color: "white" }}>
                {user.name}
            </li>
            <li>
                <Image
                    src={image}
                    width={150}
                    height={150}
                    className={styles.imageAvatar}
                    alt={`avatar do user${user.name}`}

                />
            </li>
        </ul>

        <form onSubmit={uploadAvatar}>

            <input type="file"
                required
                onChange={handleFileChange()} //valor do input for atterado chama a função que vc passar no onChange
                
            />
            <Button >Upload Img</Button>

        </form>

    </>)
}