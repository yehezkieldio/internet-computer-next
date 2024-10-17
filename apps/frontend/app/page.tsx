import Greeting from "#/app/_component/greeting";
import Login from "#/app/_component/login";

export default function Home() {
    return (
        <div>
            <div className="container px-4 py-8">
                <h1>Hello, world!</h1>
                <div className="pt-4">
                    <Greeting />
                    <Login />
                </div>
            </div>
        </div>
    );
}
