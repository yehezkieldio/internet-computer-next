import Greeting from "#/app/_component/greeting";

export default function Home() {
    return (
        <div>
            <div className="container px-4 py-8">
                <h1>Hello, world!</h1>
                <div className="pt-4">
                    <Greeting />
                </div>
            </div>
        </div>
    );
}
