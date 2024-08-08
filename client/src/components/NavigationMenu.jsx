
import { Link } from "react-router-dom";

function NavigationMenu() {
    return (
        <nav className="bg-background py-4 px-4 md:px-6">
            <div className="container mx-auto flex items-center justify-between">
                <ul className="flex space-x-4">
                    <li>
                        <Link
                            to="/"
                            className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/categories"
                            className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded"
                        >
                            Categories
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/recent-posts"
                            className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded"
                        >
                            Recent Posts
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/popular-topics"
                            className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded"
                        >
                            Popular Topics
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/profile"
                            className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded"
                        >
                            User Profile
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavigationMenu;
