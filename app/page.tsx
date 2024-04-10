import MainPage from "./mainPage";
import getToken from "@/app/utils/getToken"

const Home = async () => {

  const token = await getToken();
  return (
    <MainPage />
  );
}

export default Home;