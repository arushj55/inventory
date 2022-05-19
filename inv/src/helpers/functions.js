export const getLoggedInUser = () => {
    let user = JSON.parse(localStorage.getItem('reactuser_user'));
    if(user) {
        return user;
    } else {
        return null;
    }
}