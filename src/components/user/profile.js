import React from 'react'

const Profile = () => {
    // const { name, email, profilePicture } = user;
    const name = "user"
    const email = "user@gmail.com"
    const profilePicture = "";

    return (
        <div className="bg-white p-4 rounded-md shadow-md">
            {profilePicture && (
                <img
                    src={profilePicture}
                    alt="Profile"
                    className="w-16 h-16 rounded-full mx-auto mb-4"
                />
            )}
            <div className="text-center">
                <h2 className="text-lg font-semibold">{name}</h2>
                <p className="text-gray-600">{email}</p>
            </div>
        </div>
    );

}

export default Profile;
