import Card from "../components/card";
import Footer from "../components/footer";
import MainBanner from "../components/mainBanner";
import Navbar from "../components/navbar";
import featuringProducts from "../lib/data/dummyData";

const MainPage = () => {
  return (
    <>
      <MainBanner />
      <div className="flex">
        {featuringProducts.map((product, index) => (
          <Card key={index} productData={product} />
        ))}
      </div>
    </>
  );
};

export default MainPage;
