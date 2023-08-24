export default {
    // START:: GET AUTHENTICATED USER DATA
    getAuthenticatedUserData(state) {
        return {
            id: state.userId,
            type: state.userType,
            token: state.userToken,
            name: state.userName,
            email: state.email,
            phone: state.userPhone,
            role: state.role,
        };
    },
    // END:: GET AUTHENTICATED USER DATA
};
