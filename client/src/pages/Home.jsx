import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, CardContent, CardActions, Typography, TextField } from "@mui/material";
import { signoutSuccess } from "../redux/user/userSlice"; // 로그아웃 액션 가져오기

function Home() {
    const isLoggedIn = useSelector((state) => !!state.user.currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = () => {
        navigate("/sign-in"); // 로그인 페이지로 이동
    };

    const handleLogout = () => {
        dispatch(signoutSuccess()); // 로그아웃 액션 디스패치
    };

    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-gradient-to-r from-[#7928CA] to-[#FF0080] py-6 px-4 md:px-6">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="text-white">
                        <h1 className="text-3xl font-bold">KingSong World</h1>
                        <p className="text-lg">FrontEnd DEV. Blog</p>
                    </div>
                    <div className="relative w-full max-w-md">

                        <TextField
                            type="search"
                            placeholder="검색"
                            className="w-full  bg-white/20 px-10 py-2 text-white placeholder:text-gray-300 focus:outline-none"
                        />
                    </div>
                </div>
            </header>
            <nav className="bg-background py-4 px-4 md:px-6">
                <div className="container mx-auto flex items-center justify-between">
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="/" className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded">
                                홈
                            </Link>
                        </li>
                        <li>
                            <Link to="/categories" className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded">
                                목록
                            </Link>
                        </li>
                        <li>
                            <Link to="/recent-posts" className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded">
                                최근 게시물
                            </Link>
                        </li>
                        <li>
                            <Link to="/popular-topics" className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded">
                                인기 게시물
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile" className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded">
                                사용자 프로필
                            </Link>
                        </li>
                    </ul>
                    <div>
                        {isLoggedIn ? (
                            <div className="flex items-center space-x-4">
                                <UserIcon className="w-6 h-6 text-foreground" />
                                <Button variant="contained" color="secondary" onClick={handleLogout}>
                                    로그아웃
                                </Button>
                            </div>
                        ) : (
                            <Button variant="contained" color="primary" onClick={handleLogin}>
                                로그인
                            </Button>
                        )}
                    </div>
                </div>
            </nav>
            <main className="flex-1 py-8 px-4 md:px-6">
                <div className="container mx-auto grid gap-8">
                    <section>
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">오늘의 추천 포스트</h2>
                            <Link to="/all-discussions" className="text-sm font-medium text-primary hover:underline">
                                모두 보기
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        최신 면접 동향
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        기술면접의 노하우를 여기서 논의하세요.
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" variant="contained" color="primary">
                                        바로보기
                                    </Button>
                                </CardActions>
                            </Card>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        기업이 원하는 인재상
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        기업들의 인재상을 파해치다!
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" variant="contained" color="primary">
                                        바로보기
                                    </Button>
                                </CardActions>
                            </Card>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        자기계발의 노하우
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        자기계발의 끝을 논하다!
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" variant="contained" color="primary">
                                        바로보기
                                    </Button>
                                </CardActions>
                            </Card>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}


function UserIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
}

export default Home;
