export default class User {
    id: number
    email: string
    password: string
    firstName: string
    lastName: string
    profilePic: string
    username: string
    professionalURL: string
    location: string
    namePronunciation: string

    constructor (id: number, email: string, password: string, firstName: string, lastName: string, profilePic: string, username: string, professionalURL: string, location: string, namePronunciation: string) {
        this.id = id,
        this.email = email,
        this.password = password,
        this.firstName = firstName,
        this.lastName = lastName,
        this.profilePic = profilePic,
        this.username = username,
        this.professionalURL = professionalURL,
        this.location = location,
        this.namePronunciation = namePronunciation 
    }
}