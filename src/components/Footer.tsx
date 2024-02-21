import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="sticky bottom-0 bg-white border-y rounded-b-lg shadow-2xl w-full mb-4 pt-4 px-6 ">
            <div className="flex justify-between font-semibold text-sm text-gray-500">
                <span className="font-semibold text-sm text-gray-500 sm:text-center">
                    © 2023{" "}
                    <Link
                        to="https://github.com/TasinTahmid/"
                        className="hover:underline hover:underline-offset-2"
                        target="_blank"
                        rel="noreferrer"
                    >
                        tasintahmid
                    </Link>{" "}
                    . All Rights Reserved.
                </span>

                <Link
                    to="https://github.com/TasinTahmid/blog-client"
                    className="hover:underline hover:underline-offset-2"
                    target="_blank"
                    rel="noreferrer"
                >
                    Github
                </Link>
            </div>
            <hr className="my-4 border-gray-200 " />
        </footer>
    );
}
