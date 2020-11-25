export default function Footer() {
    return (
        <div className="border-top footer text-muted" style={{minHeight: '100%'}}>
        <div className="container">
            &copy; 2020 - WebApplication1 - <a asp-area="" asp-page="/Privacy">Privacy</a>
        </div>
    </div>
    );
}