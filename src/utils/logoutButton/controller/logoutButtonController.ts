// logoutController.js
import axios from "axios";

export const logout = async () => {
    try {
        await axios.get('/api/users/logout');
        return { 
            success: true,
             message: 'Logout successful' 
        };
    } catch (error) {
        console.log(error);
        return { success: false, message: error };
    }
};
