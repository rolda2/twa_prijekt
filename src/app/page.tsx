import Navbar from "@/src/components/Navbar";
import Carousel from "@/src/components/Carousel";
import Products from "@/src/components/Products";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar currentPage="/"/>
      <main>
        <Carousel />
        <Products isAdmin={false}/>
      </main>
    </div>
  );
};

export default Home;