export default function auth({ next, router }) {
    if (!localStorage.getItem("akry_dashboard_user_token")) {
        return router.push("/");
    }
    return next();
}
