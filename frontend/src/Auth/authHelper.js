const authenticate = (jwt, cb) => {
    if (typeof window !== "undefined") {
        sessionStorage.setItem("jwt", JSON.stringify(jwt));
        cb()
    }
}
const authenticateFacebook = (jwt, cb) => {
    if (typeof window !== "undefined") {
        sessionStorage.setItem("facebook", JSON.stringify(jwt));
        cb()
    }
}

const isAuthentcated = () => {
    if (typeof window == "undefined") return false;
    if (sessionStorage.getItem("jwt")) {
        return JSON.parse(sessionStorage.getItem("jwt"))
    }
    return false;
}

const isAuthentcatedFacebook = () => {
    if (typeof window == "undefined") return false;
    if (sessionStorage.getItem("facebook")) {
        return JSON.parse(sessionStorage.getItem("facebook"))
    }
    return false;
}


const signOut = () => {
    if (typeof window !== "undefined") {
        sessionStorage.removeItem("jwt")
        sessionStorage.removeItem("facebook")
        sessionStorage.removeItem("sessionMeditationTime")
    }
}

export default { authenticate, isAuthentcated, signOut, authenticateFacebook, isAuthentcatedFacebook }